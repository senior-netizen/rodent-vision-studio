import { isIP } from 'node:net';

const DEFAULT_METADATA_IPS = new Set(['169.254.169.254', '100.100.100.200']);
const DNS_REBINDING_HOST_PATTERNS = [/\.(nip|xip|sslip)\.io$/i, /(^|\.)localhost$/i, /\.(local|internal|home|lan)$/i];

export const INVALID_PREVIEW_SOURCE_URL = 'INVALID_PREVIEW_SOURCE_URL' as const;

type ValidationErrorCode = typeof INVALID_PREVIEW_SOURCE_URL;

export type UrlPolicyConfig = {
  environment: 'development' | 'test' | 'production';
  hostnameAllowlist: string[];
  allowedIpLiterals: string[];
  allowedPorts: number[];
  allowHttpInNonProduction: boolean;
};

export type UrlValidationResult =
  | { ok: true; normalizedUrl: string }
  | { ok: false; code: ValidationErrorCode; reason: string };

function normalizeHostname(hostname: string): string {
  return hostname.trim().toLowerCase().replace(/\.$/, '');
}

function parseCsv(envValue: string | undefined): string[] {
  if (!envValue) return [];
  return envValue
    .split(',')
    .map((entry) => normalizeHostname(entry))
    .filter(Boolean);
}

function parseAllowedPorts(envValue: string | undefined): number[] {
  if (!envValue) return [];

  return envValue
    .split(',')
    .map((entry) => Number.parseInt(entry.trim(), 10))
    .filter((port) => Number.isInteger(port) && port > 0 && port <= 65_535);
}

export function getPreviewUrlPolicyConfig(env: NodeJS.ProcessEnv = process.env): UrlPolicyConfig {
  const runtimeEnv = env.NODE_ENV;
  const environment: UrlPolicyConfig['environment'] =
    runtimeEnv === 'production' || runtimeEnv === 'test' ? runtimeEnv : 'development';

  return {
    environment,
    hostnameAllowlist: parseCsv(env.PREVIEW_SOURCE_HOST_ALLOWLIST),
    allowedIpLiterals: parseCsv(env.PREVIEW_SOURCE_ALLOWED_IPS),
    allowedPorts: parseAllowedPorts(env.PREVIEW_SOURCE_ALLOWED_PORTS),
    allowHttpInNonProduction: env.PREVIEW_SOURCE_ALLOW_HTTP_NON_PRODUCTION !== 'false',
  };
}

function canonicalize(input: string): URL | null {
  try {
    const url = new URL(input);
    url.hash = '';
    url.hostname = normalizeHostname(url.hostname);
    return url;
  } catch {
    return null;
  }
}

function isPrivateIPv4(hostname: string): boolean {
  const [a, b] = hostname.split('.').map((part) => Number.parseInt(part, 10));
  return (
    a === 10 ||
    a === 127 ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 169 && b === 254) ||
    a === 0
  );
}

function isBlockedIPv6(hostname: string): boolean {
  const normalized = hostname.toLowerCase();
  return (
    normalized === '::1' ||
    normalized === '::' ||
    normalized.startsWith('fe80:') ||
    normalized.startsWith('fc') ||
    normalized.startsWith('fd')
  );
}

function hasDnsRebindingPattern(hostname: string): boolean {
  return DNS_REBINDING_HOST_PATTERNS.some((pattern) => pattern.test(hostname));
}

function isPortAllowed(url: URL, allowedPorts: number[]): boolean {
  if (!url.port) return true;

  const parsedPort = Number.parseInt(url.port, 10);
  if (!Number.isInteger(parsedPort)) return false;
  if (parsedPort === 443 && url.protocol === 'https:') return true;
  if (parsedPort === 80 && url.protocol === 'http:') return true;

  return allowedPorts.includes(parsedPort);
}

export function validatePreviewSourceUrl(input: string, config = getPreviewUrlPolicyConfig()): UrlValidationResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, code: INVALID_PREVIEW_SOURCE_URL, reason: 'URL is empty.' };
  }

  const url = canonicalize(trimmed);
  if (!url) {
    return { ok: false, code: INVALID_PREVIEW_SOURCE_URL, reason: 'URL could not be parsed.' };
  }

  if (url.username || url.password) {
    return { ok: false, code: INVALID_PREVIEW_SOURCE_URL, reason: 'Credentials in URL are not allowed.' };
  }

  if (url.protocol !== 'https:') {
    const allowHttp = config.environment !== 'production' && config.allowHttpInNonProduction;
    if (!(allowHttp && url.protocol === 'http:')) {
      return { ok: false, code: INVALID_PREVIEW_SOURCE_URL, reason: 'Only HTTPS URLs are allowed.' };
    }
  }

  const hostname = normalizeHostname(url.hostname);

  if (!hostname) {
    return { ok: false, code: INVALID_PREVIEW_SOURCE_URL, reason: 'Hostname is required.' };
  }

  if (config.environment === 'production' && config.hostnameAllowlist.length === 0) {
    return {
      ok: false,
      code: INVALID_PREVIEW_SOURCE_URL,
      reason: 'Host allowlist must be configured in production.',
    };
  }

  const ipType = isIP(hostname);
  if (ipType > 0) {
    if (!config.allowedIpLiterals.includes(hostname)) {
      if (ipType === 4 && (isPrivateIPv4(hostname) || DEFAULT_METADATA_IPS.has(hostname))) {
        return { ok: false, code: INVALID_PREVIEW_SOURCE_URL, reason: 'Private or metadata IPs are forbidden.' };
      }

      if (ipType === 6 && isBlockedIPv6(hostname)) {
        return { ok: false, code: INVALID_PREVIEW_SOURCE_URL, reason: 'Private IPv6 literals are forbidden.' };
      }

      return { ok: false, code: INVALID_PREVIEW_SOURCE_URL, reason: 'IP literals are forbidden unless allowlisted.' };
    }
  }

  if (hasDnsRebindingPattern(hostname)) {
    return { ok: false, code: INVALID_PREVIEW_SOURCE_URL, reason: 'Hostname pattern is not allowed.' };
  }

  if (DEFAULT_METADATA_IPS.has(hostname)) {
    return { ok: false, code: INVALID_PREVIEW_SOURCE_URL, reason: 'Metadata endpoints are forbidden.' };
  }

  if (hostname === 'localhost' || hostname.endsWith('.localhost')) {
    return { ok: false, code: INVALID_PREVIEW_SOURCE_URL, reason: 'Localhost addresses are forbidden.' };
  }

  if (config.hostnameAllowlist.length > 0 && !config.hostnameAllowlist.includes(hostname)) {
    return { ok: false, code: INVALID_PREVIEW_SOURCE_URL, reason: 'Hostname is not in the allowlist.' };
  }

  if (!isPortAllowed(url, config.allowedPorts)) {
    return { ok: false, code: INVALID_PREVIEW_SOURCE_URL, reason: 'Port is not allowed.' };
  }

  return { ok: true, normalizedUrl: url.toString() };
}
