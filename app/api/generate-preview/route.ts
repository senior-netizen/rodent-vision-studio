import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { CloudinaryUploadError, uploadPreviewBuffer } from '@/lib/cloudinary';
import {
  appendUploadAttempt,
  enqueuePreviewReconciliationTask,
  updateProjectPreview,
} from '@/lib/project-registry';

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

  if (!body.screenshotUrl?.trim()) {
    const fallbackPreviewUrl = body.currentPreviewUrl ?? `/api/previews/${slug}?generated=${Date.now()}`;
    return NextResponse.json({
      previewUrl: fallbackPreviewUrl,
      generatedAt: new Date().toISOString(),
      correlationId: randomUUID(),
    } as GeneratePreviewSuccess);
  }

  const correlationId = randomUUID();
  const capturedAt = new Date().toISOString();

  try {
    const screenshotBuffer = await fetchScreenshotBuffer(body.screenshotUrl);
    const uploaded = await uploadPreviewBuffer({
      projectId: slug,
      buffer: screenshotBuffer,
      correlationId,
      capturedAt,
      recordAttempt: appendUploadAttempt,
    });

    const metadata = {
      publicId: uploaded.publicId,
      capturedAt,
      sourceUrl: body.screenshotUrl,
      correlationId,
    };

    try {
      await updateProjectPreview(slug, uploaded.imageUrl, metadata);

      return NextResponse.json({
        previewUrl: uploaded.imageUrl,
        generatedAt: capturedAt,
        correlationId,
      } satisfies GeneratePreviewSuccess);
    } catch (registryError) {
      await enqueuePreviewReconciliationTask({
        projectId: slug,
        imageUrl: uploaded.imageUrl,
        metadata,
        reason: registryError instanceof Error ? registryError.message : 'registry update failed after upload success',
      });

      return NextResponse.json({
        previewUrl: uploaded.imageUrl,
        generatedAt: capturedAt,
        correlationId,
        reconciledAsync: true,
      } satisfies GeneratePreviewSuccess);
    }
  } catch (error) {
    const status = classifyPreviewErrorStatus(error);
    const message = error instanceof Error ? error.message : 'Preview generation failed.';
    const category = error instanceof CloudinaryUploadError ? error.category : 'permanent';

    return NextResponse.json({
      error: message,
      category,
      correlationId,
    }, { status });
  }
}
