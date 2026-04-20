import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { publishProjectPreview, purgePreviewAlias } from '@/lib/project-registry';

type GeneratePreviewPayload = {
  slug?: string;
  screenshotUrl?: string;
  currentPreviewUrl?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as GeneratePreviewPayload;

  if (!body.slug?.trim()) {
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
