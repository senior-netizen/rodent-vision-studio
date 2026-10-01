import { NextResponse } from 'next/server'
import { collections, getContent, type Collection } from '@/lib/cms'
import { ApiError } from '@/lib/errors'
import { handle } from '@/lib/http'
import { slugSchema } from '@/lib/schemas'
export async function GET(request: Request, { params }: { params: Promise<{ collection: string; slug: string }> }) { return handle(request, async () => {
  const { collection, slug } = await params; if (!collections.slice(0, 3).includes(collection as Collection)) throw new ApiError('NOT_FOUND', 404, 'Route not found')
  const parsed = slugSchema.safeParse(slug); if (!parsed.success) throw new ApiError('VALIDATION_ERROR', 400, 'Invalid slug')
  return NextResponse.json({ data: await getContent(collection as Collection, parsed.data), meta: {} }, { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } })
}) }
