import { NextResponse } from 'next/server';
import { resolveProjectPreview } from '@/lib/project-registry';

const MUTABLE_CACHE_CONTROL = 'public, max-age=60, s-maxage=300, stale-while-revalidate=60';

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const preview = await resolveProjectPreview(slug);

  if (!preview) {
    return new NextResponse('Preview not found', {
      status: 404,
      headers: {
        'Cache-Control': MUTABLE_CACHE_CONTROL,
      },
    });
  }

  return NextResponse.redirect(new URL(preview.immutableUrl, request.url), {
    status: 302,
    headers: {
      'Cache-Control': MUTABLE_CACHE_CONTROL,
      'x-preview-hash': preview.currentHash,
    },
  });
}
