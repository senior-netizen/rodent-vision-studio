import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Signed admin auth contract for POST /api/projects
 *
 * Authorization: Bearer <JWT>
 * - header.alg: HS256
 * - claims.iss: PROJECTS_ADMIN_AUTH_ISSUER (default: rodent-vision-studio-admin)
 * - claims.aud: PROJECTS_ADMIN_AUTH_AUDIENCE (default: rodent-vision-studio/projects-api)
 * - claims.exp: unix timestamp (required)
 * - claims.nonce or claims.jti: required for replay protection
 * - claims.scope/scopes/permissions must include projects:write
 *
 * Optional local fallback (development + localhost only):
 * - x-admin-token header matching PROJECTS_ADMIN_TOKEN
 */

type AdminAuthSuccess = {
  ok: true;
  subject: string | null;
  scope: string[];
  authMode: 'bearer' | 'legacy-dev-token';
};

type AdminAuthFailure = {
  ok: false;
  status: 401 | 403 | 500;
  error: string;
};

type AdminAuthResult = AdminAuthSuccess | AdminAuthFailure;

type JwtHeader = {
  alg?: string;
  typ?: string;
};

type JwtClaims = {
  iss?: string;
  aud?: string | string[];
  sub?: string;
  exp?: number;
  nbf?: number;
  iat?: number;
  scope?: string;
  scopes?: string[];
  permissions?: string[];
  nonce?: string;
  jti?: string;
};

type ReplayRecord = {
  expiresAtMs: number;
};

const REQUIRED_SCOPE = 'projects:write';
const DEFAULT_ISSUER = 'rodent-vision-studio-admin';
const DEFAULT_AUDIENCE = 'rodent-vision-studio/projects-api';
const DEFAULT_NONCE_TTL_SECONDS = 300;
const DEFAULT_CLOCK_SKEW_SECONDS = 30;

const replayCache = new Map<string, ReplayRecord>();

function getNowMs(): number {
  return Date.now();
}

function parsePositiveInt(value: string | undefined, fallback: number): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return parsed;
}

function getAuthConfig() {
  return {
    issuer: process.env.PROJECTS_ADMIN_AUTH_ISSUER?.trim() || DEFAULT_ISSUER,
    audience: process.env.PROJECTS_ADMIN_AUTH_AUDIENCE?.trim() || DEFAULT_AUDIENCE,
    secret: process.env.PROJECTS_ADMIN_AUTH_SECRET?.trim(),
    nonceTtlSeconds: parsePositiveInt(process.env.PROJECTS_ADMIN_NONCE_TTL_SECONDS, DEFAULT_NONCE_TTL_SECONDS),
    clockSkewSeconds: parsePositiveInt(process.env.PROJECTS_ADMIN_CLOCK_SKEW_SECONDS, DEFAULT_CLOCK_SKEW_SECONDS),
    legacyToken: process.env.PROJECTS_ADMIN_TOKEN?.trim(),
    nodeEnv: process.env.NODE_ENV,
  };
}

function base64UrlDecode(value: string): Buffer {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const paddingLength = (4 - (normalized.length % 4)) % 4;
  return Buffer.from(`${normalized}${'='.repeat(paddingLength)}`, 'base64');
}

function base64UrlEncode(value: Buffer): string {
  return value.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function parseBearerToken(headerValue: string | null): string | null {
  if (!headerValue) {
    return null;
  }

  const [scheme, token] = headerValue.trim().split(/\s+/, 2);
  if (!scheme || !token || scheme.toLowerCase() !== 'bearer') {
    return null;
  }

  return token;
}

function safeJsonParse<T>(value: Buffer): T | null {
  try {
    return JSON.parse(value.toString('utf8')) as T;
  } catch {
    return null;
  }
}

function getScopes(claims: JwtClaims): string[] {
  const fromScope = claims.scope
    ? claims.scope
      .split(/\s+/)
      .map((scope) => scope.trim())
      .filter(Boolean)
    : [];

  const fromScopes = Array.isArray(claims.scopes) ? claims.scopes.filter((value): value is string => typeof value === 'string' && value.trim().length > 0) : [];
  const fromPermissions = Array.isArray(claims.permissions)
    ? claims.permissions.filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
    : [];

  return [...new Set([...fromScope, ...fromScopes, ...fromPermissions])];
}

function isAudienceValid(claimAud: JwtClaims['aud'], expected: string): boolean {
  if (!claimAud) {
    return false;
  }

  if (typeof claimAud === 'string') {
    return claimAud === expected;
  }

  return claimAud.includes(expected);
}

function validateTemporalClaims(claims: JwtClaims, nowSeconds: number, clockSkewSeconds: number): string | null {
  if (typeof claims.exp !== 'number' || Number.isNaN(claims.exp)) {
    return 'Missing exp claim.';
  }

  if (claims.exp <= nowSeconds - clockSkewSeconds) {
    return 'Token has expired.';
  }

  if (typeof claims.nbf === 'number' && claims.nbf > nowSeconds + clockSkewSeconds) {
    return 'Token not active yet (nbf in the future).';
  }

  if (typeof claims.iat === 'number' && claims.iat > nowSeconds + clockSkewSeconds) {
    return 'Token issued in the future.';
  }

  return null;
}

function cleanupReplayCache(nowMs: number): void {
  for (const [nonce, record] of replayCache.entries()) {
    if (record.expiresAtMs <= nowMs) {
      replayCache.delete(nonce);
    }
  }
}

function markNonceUsedOrReject(nonce: string, ttlSeconds: number, nowMs: number): AdminAuthFailure | null {
  cleanupReplayCache(nowMs);

  const existing = replayCache.get(nonce);
  if (existing && existing.expiresAtMs > nowMs) {
    return {
      ok: false,
      status: 401,
      error: 'Replay detected for token nonce/jti.',
    };
  }

  replayCache.set(nonce, {
    expiresAtMs: nowMs + (ttlSeconds * 1000),
  });

  return null;
}

function verifyHs256Token(token: string, secret: string): { header: JwtHeader; claims: JwtClaims } | AdminAuthFailure {
  const [encodedHeader, encodedClaims, encodedSignature] = token.split('.');
  if (!encodedHeader || !encodedClaims || !encodedSignature) {
    return {
      ok: false,
      status: 401,
      error: 'Malformed bearer token.',
    };
  }

  const header = safeJsonParse<JwtHeader>(base64UrlDecode(encodedHeader));
  const claims = safeJsonParse<JwtClaims>(base64UrlDecode(encodedClaims));

  if (!header || !claims) {
    return {
      ok: false,
      status: 401,
      error: 'Invalid token payload encoding.',
    };
  }

  if (header.alg !== 'HS256') {
    return {
      ok: false,
      status: 401,
      error: 'Unsupported token algorithm.',
    };
  }

  const signingInput = `${encodedHeader}.${encodedClaims}`;
  const expectedSignature = base64UrlEncode(createHmac('sha256', secret).update(signingInput).digest());

  const providedSignatureBuffer = Buffer.from(encodedSignature);
  const expectedSignatureBuffer = Buffer.from(expectedSignature);

  if (providedSignatureBuffer.length !== expectedSignatureBuffer.length) {
    return {
      ok: false,
      status: 401,
      error: 'Invalid token signature.',
    };
  }

  if (!timingSafeEqual(providedSignatureBuffer, expectedSignatureBuffer)) {
    return {
      ok: false,
      status: 401,
      error: 'Invalid token signature.',
    };
  }

  return {
    header,
    claims,
  };
}

function isLocalDevelopmentRequest(request: Request, nodeEnv: string | undefined): boolean {
  if (nodeEnv !== 'development') {
    return false;
  }

  try {
    const { hostname } = new URL(request.url);
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
  } catch {
    return false;
  }
}

function authorizeWithLegacyDevelopmentToken(request: Request, configuredToken: string): AdminAuthResult {
  const providedToken = request.headers.get('x-admin-token')?.trim();

  if (!providedToken || providedToken !== configuredToken) {
    return {
      ok: false,
      status: 401,
      error: 'Invalid local development admin token.',
    };
  }

  return {
    ok: true,
    subject: 'legacy-local-admin',
    scope: [REQUIRED_SCOPE],
    authMode: 'legacy-dev-token',
  };
}

export function authorizeProjectsWrite(request: Request): AdminAuthResult {
  const config = getAuthConfig();
  const bearerToken = parseBearerToken(request.headers.get('authorization'));

  if (!bearerToken) {
    if (config.legacyToken && isLocalDevelopmentRequest(request, config.nodeEnv)) {
      return authorizeWithLegacyDevelopmentToken(request, config.legacyToken);
    }

    return {
      ok: false,
      status: 401,
      error: 'Missing Authorization: Bearer token.',
    };
  }

  if (!config.secret) {
    return {
      ok: false,
      status: 500,
      error: 'Server auth secret not configured.',
    };
  }

  const verified = verifyHs256Token(bearerToken, config.secret);
  if ('ok' in verified) {
    return verified;
  }

  const { claims } = verified;

  if (claims.iss !== config.issuer) {
    return {
      ok: false,
      status: 401,
      error: 'Invalid issuer claim.',
    };
  }

  if (!isAudienceValid(claims.aud, config.audience)) {
    return {
      ok: false,
      status: 401,
      error: 'Invalid audience claim.',
    };
  }

  const nowSeconds = Math.floor(getNowMs() / 1000);
  const temporalClaimError = validateTemporalClaims(claims, nowSeconds, config.clockSkewSeconds);
  if (temporalClaimError) {
    return {
      ok: false,
      status: 401,
      error: temporalClaimError,
    };
  }

  const nonce = typeof claims.nonce === 'string' && claims.nonce.trim().length > 0
    ? claims.nonce.trim()
    : typeof claims.jti === 'string' && claims.jti.trim().length > 0
      ? claims.jti.trim()
      : null;

  if (!nonce) {
    return {
      ok: false,
      status: 401,
      error: 'Missing nonce/jti claim.',
    };
  }

  const replayCheck = markNonceUsedOrReject(nonce, config.nonceTtlSeconds, getNowMs());
  if (replayCheck) {
    return replayCheck;
  }

  const scope = getScopes(claims);
  if (!scope.includes(REQUIRED_SCOPE)) {
    return {
      ok: false,
      status: 403,
      error: `Missing required scope: ${REQUIRED_SCOPE}.`,
    };
  }

  return {
    ok: true,
    subject: typeof claims.sub === 'string' ? claims.sub : null,
    scope,
    authMode: 'bearer',
  };
}
