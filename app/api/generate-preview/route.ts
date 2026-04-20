import { NextResponse } from 'next/server';

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

  const previewUrl = body.screenshotUrl ?? body.currentPreviewUrl ?? `/api/previews/${body.slug.trim()}?generated=${Date.now()}`;

  return NextResponse.json({
    previewUrl,
    generatedAt: new Date().toISOString(),
  });
}
