import { NextResponse } from 'next/server';

import {
  INVALID_PREVIEW_SOURCE_URL,
  validatePreviewSourceUrl,
} from '@/lib/security/url-policy';

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

  const screenshotUrl = body.screenshotUrl?.trim();
  if (screenshotUrl) {
    const validation = validatePreviewSourceUrl(screenshotUrl);
    if (!validation.ok) {
      return NextResponse.json(
        {
          error: 'Invalid preview source URL.',
          code: INVALID_PREVIEW_SOURCE_URL,
          reason: validation.reason,
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      previewUrl: validation.normalizedUrl,
      generatedAt: new Date().toISOString(),
    });
  }

  const previewUrl =
    body.currentPreviewUrl ?? `/api/previews/${body.slug.trim()}?generated=${Date.now()}`;

  return NextResponse.json({
    previewUrl,
    generatedAt: new Date().toISOString(),
  });
}
