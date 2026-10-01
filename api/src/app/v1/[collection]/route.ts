import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { collections, listContent, type Collection } from '@/lib/cms'
import { ApiError } from '@/lib/errors'
import { handle } from '@/lib/http'
import { querySchema } from '@/lib/schemas'
export async function GET(request: Request, { params }: { params: Promise<{ collection: string }> }) { return handle(request, async () => {
  const { collection } = await params; if (!collections.includes(collection as Collection)) throw new ApiError('NOT_FOUND', 404, 'Route not found')
  let query; try { query = querySchema.parse(Object.fromEntries(new URL(request.url).searchParams)) } catch (error) { if (error instanceof ZodError) throw new ApiError('VALIDATION_ERROR', 400, 'Invalid query'); throw error }
  const result = await listContent(collection as Collection, query); return NextResponse.json(result, { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } })
}) }
