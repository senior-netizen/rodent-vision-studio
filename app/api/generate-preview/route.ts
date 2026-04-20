import { randomUUID } from 'node:crypto';
import { lookup } from 'node:dns/promises';
import net from 'node:net';
import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

import { uploadPreviewBuffer } from '@/lib/cloudinary';
import { updateProjectPreview } from '@/lib/project-registry';

export const runtime = 'nodejs';

type GeneratePreviewInput = {
  projectId: string;
  url: string;
};

type GeneratePreviewOutput = {
  imageUrl: string;
  publicId: string;
  capturedAt: string;
};

const NAVIGATION_TIMEOUT_MS = 20_000;
const VALIDATION_TIMEOUT_MS = 6_000;
const MAX_REDIRECTS = 3;
const RATE_LIMIT_MAX_REQUESTS = 8;
const RATE_LIMIT_WINDOW_MS = 60_000;

const rateLimitBucket = new Map<string, number[]>();

function isPrivateIPv4(address: string) {
  const octets = address.split('.').map((segment) => Number(segment));
  const firstOctet = octets[0] ?? 0;
  const secondOctet = octets[1] ?? 0;

  if (firstOctet === 10 || firstOctet === 127 || firstOctet === 0) {
    return true;
  }

  if (firstOctet === 172 && secondOctet >= 16 && secondOctet <= 31) {
    return true;
  }

  if (firstOctet === 192 && secondOctet === 168) {
    return true;
  }

  if (firstOctet === 169 && secondOctet === 254) {
    return true;
  }

  return false;
}

function isPrivateIPv6(address: string) {
  const normalized = address.toLowerCase();

  return (
    normalized === '::1' ||
    normalized.startsWith('fc') ||
    normalized.startsWith('fd') ||
    normalized.startsWith('fe80:') ||
    normalized.startsWith('::ffff:127.')
  );
}

async function ensurePublicHostname(hostname: string) {
  if (hostname === 'localhost' || hostname.endsWith('.localhost')) {
    throw new Error('localhost is not allowed');
  }

  if (net.isIP(hostname) === 4 && isPrivateIPv4(hostname)) {
    throw new Error('private network targets are not allowed');
  }

  if (net.isIP(hostname) === 6 && isPrivateIPv6(hostname)) {
    throw new Error('private network targets are not allowed');
  }

  const addresses = await lookup(hostname, { all: true });
  if (addresses.length === 0) {
    throw new Error('host did not resolve to an IP address');
  }

  for (const resolved of addresses) {
    if ((resolved.family === 4 && isPrivateIPv4(resolved.address)) || (resolved.family === 6 && isPrivateIPv6(resolved.address))) {
      throw new Error('private network targets are not allowed');
    }
  }
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, message: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timeoutRef = setTimeout(() => reject(new Error(message)), timeoutMs);

    promise
      .then((result) => {
        clearTimeout(timeoutRef);
        resolve(result);
      })
      .catch((error) => {
        clearTimeout(timeoutRef);
        reject(error);
      });
  });
}

async function validateUrlSafety(rawUrl: string) {
  let currentUrl: URL;

  try {
    currentUrl = new URL(rawUrl);
  } catch {
    throw new Error('URL is invalid');
  }

  if (!['http:', 'https:'].includes(currentUrl.protocol)) {
    throw new Error('Only http/https URLs are allowed');
  }

  for (let redirectCount = 0; redirectCount <= MAX_REDIRECTS; redirectCount += 1) {
    await ensurePublicHostname(currentUrl.hostname);

    const response = await withTimeout(
      fetch(currentUrl.toString(), {
        method: 'HEAD',
        redirect: 'manual',
      }),
      VALIDATION_TIMEOUT_MS,
      'URL validation timed out',
    );

    const statusCode = response.status;
    if (statusCode >= 300 && statusCode < 400) {
      const location = response.headers.get('location');
      if (!location) {
        throw new Error('Redirect response missing location header');
      }

      if (redirectCount === MAX_REDIRECTS) {
        throw new Error('Too many redirects');
      }

      currentUrl = new URL(location, currentUrl);

      if (!['http:', 'https:'].includes(currentUrl.protocol)) {
        throw new Error('Redirected URL must use http/https');
      }

      continue;
    }

    return currentUrl.toString();
  }

  throw new Error('URL could not be validated');
}

function getClientIdentifier(request: Request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown-client';
}

function isRateLimited(key: string) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const currentRequests = (rateLimitBucket.get(key) ?? []).filter((timestamp) => timestamp > windowStart);

  if (currentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitBucket.set(key, currentRequests);
    return true;
  }

  currentRequests.push(now);
  rateLimitBucket.set(key, currentRequests);
  return false;
}

export async function POST(request: Request) {
  const startedAt = Date.now();
  const correlationId = request.headers.get('x-correlation-id') || randomUUID();

  const logContext = {
    correlationId,
    route: '/api/generate-preview',
  };

  try {
    if (isRateLimited(getClientIdentifier(request))) {
      console.warn({ ...logContext, status: 429, durationMs: Date.now() - startedAt }, 'generate-preview rate limited');
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429, headers: { 'x-correlation-id': correlationId } });
    }

    const payload = (await request.json()) as Partial<GeneratePreviewInput>;

    if (!payload.projectId?.trim() || !payload.url?.trim()) {
      console.warn({ ...logContext, projectId: payload.projectId, status: 400 }, 'generate-preview invalid payload');
      return NextResponse.json({ error: 'Payload must include projectId and url.' }, { status: 400, headers: { 'x-correlation-id': correlationId } });
    }

    let safeUrl: string;
    try {
      safeUrl = await validateUrlSafety(payload.url);
    } catch (error) {
      console.warn(
        { ...logContext, projectId: payload.projectId, status: 400, error: (error as Error).message },
        'generate-preview invalid url',
      );

      return NextResponse.json({ error: (error as Error).message }, { status: 400, headers: { 'x-correlation-id': correlationId } });
    }

    const capturedAt = new Date().toISOString();
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
    });

    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.goto(safeUrl, { waitUntil: 'networkidle2', timeout: NAVIGATION_TIMEOUT_MS });

      const screenshot = await page.screenshot({
        type: 'png',
        fullPage: false,
      });

      const screenshotBuffer = Buffer.isBuffer(screenshot) ? screenshot : Buffer.from(screenshot);
      const uploadResult = await uploadPreviewBuffer({
        projectId: payload.projectId,
        buffer: screenshotBuffer,
        correlationId,
        capturedAt,
      });

      await updateProjectPreview(payload.projectId, uploadResult.imageUrl, {
        publicId: uploadResult.publicId,
        capturedAt,
        sourceUrl: safeUrl,
        correlationId,
      });

      const responseBody: GeneratePreviewOutput = {
        imageUrl: uploadResult.imageUrl,
        publicId: uploadResult.publicId,
        capturedAt,
      };

      console.info(
        { ...logContext, projectId: payload.projectId, status: 200, durationMs: Date.now() - startedAt },
        'generate-preview success',
      );

      return NextResponse.json(responseBody, { status: 200, headers: { 'x-correlation-id': correlationId } });
    } finally {
      await browser.close();
    }
  } catch (error) {
    console.error(
      {
        ...logContext,
        status: 502,
        durationMs: Date.now() - startedAt,
        error: (error as Error).message,
      },
      'generate-preview capture/upload failure',
    );

    return NextResponse.json(
      { error: 'Preview generation failed. Please retry later.' },
      { status: 502, headers: { 'x-correlation-id': correlationId } },
    );
  }
}
