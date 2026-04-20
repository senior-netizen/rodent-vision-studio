import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { publishProjectPreview, purgePreviewAlias } from '@/lib/project-registry';

type GeneratePreviewPayload = {
  slug?: string;
  screenshotUrl?: string;
  currentPreviewUrl?: string;
};

type GeneratePreviewSuccess = {
  previewUrl: string;
  generatedAt: string;
  correlationId: string;
  reconciledAsync?: boolean;
};

const SOURCE_FETCH_TIMEOUT_MS = 12_000;

async function fetchScreenshotBuffer(url: string): Promise<Buffer> {
  const abortController = new AbortController();
  const timeout = setTimeout(() => abortController.abort(), SOURCE_FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: abortController.signal,
      headers: {
        'user-agent': 'rodent-preview-orchestrator/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`Screenshot fetch failed with status ${response.status}`);
    }

    const bytes = await response.arrayBuffer();
    if (bytes.byteLength === 0) {
      throw new Error('Screenshot fetch returned an empty body.');
    }

    return Buffer.from(bytes);
  } finally {
    clearTimeout(timeout);
  }
}

function classifyPreviewErrorStatus(error: unknown): number {
  if (error instanceof CloudinaryUploadError) {
    if (error.category === 'auth') {
      return 401;
    }

    if (error.category === 'rate_limited') {
      return 429;
    }

    if (error.category === 'retryable') {
      return 503;
    }

    return 502;
  }

  return 502;
}

export async function POST(request: Request) {
  const body = (await request.json()) as GeneratePreviewPayload;
  const slug = body.slug?.trim();

  if (!slug) {
    return NextResponse.json({ error: 'slug is required.' }, { status: 400 });
  }

  const slug = body.slug.trim();
  const sourceUrl = body.screenshotUrl?.trim() || body.currentPreviewUrl?.trim();

  if (!sourceUrl) {
    return NextResponse.json({ error: 'screenshotUrl or currentPreviewUrl is required.' }, { status: 400 });
  }

  const capturedAt = new Date().toISOString();
  const correlationId = randomUUID();

  // Rollback-safe publish flow: publish immutable record, atomically move alias pointer, then purge alias.
  const published = await publishProjectPreview({
    projectId: slug,
    imageUrl: sourceUrl,
    sourceUrl,
    capturedAt,
    correlationId,
  });

  await purgePreviewAlias({
    projectId: slug,
    aliasUrl: published.aliasUrl,
  });

  return NextResponse.json({
    previewUrl: published.immutableUrl,
    generatedAt: published.publishedAt,
    previewMetadata: {
      aliasUrl: published.aliasUrl,
      assetHash: published.assetHash,
      assetVersion: published.assetVersion,
    },
  });
}
