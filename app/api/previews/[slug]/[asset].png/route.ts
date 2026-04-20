export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { resolveProjectPreviewVersion } from '@/lib/project-registry';

const IMMUTABLE_CACHE_CONTROL = 'public, max-age=31536000, s-maxage=31536000, immutable';

function normalizeAssetHash(assetParam: string): string {
  return assetParam.endsWith('.png') ? assetParam.slice(0, -4) : assetParam;
}

export async function GET(_: Request, context: { params?: { slug?: string; asset?: string } }) {
  const slug = context.params?.slug;
  const asset = context.params?.asset;

  if (!slug || !asset) {
    return new NextResponse('Preview slug/asset are required', { status: 400 });
  }
  const assetHash = normalizeAssetHash(asset);

  const version = await resolveProjectPreviewVersion(slug, assetHash);

  if (!version) {
    return new NextResponse('Preview not found', {
      status: 404,
      headers: {
        'Cache-Control': 'public, max-age=60, s-maxage=60',
      },
    });
  }

  return NextResponse.redirect(version.imageUrl, {
    status: 302,
    headers: {
      'Cache-Control': IMMUTABLE_CACHE_CONTROL,
      'x-preview-hash': assetHash,
      'x-preview-version': version.metadata.assetVersion,
    },
  });
}
