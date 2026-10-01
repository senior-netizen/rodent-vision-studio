import { NextResponse } from 'next/server'
import { ZodError, ZodSchema } from 'zod'
import { ApiError, errorResponse, requestId } from './errors'

export async function parseJson<T>(request: Request, schema: ZodSchema<T>, maxBytes = 16_384): Promise<T> {
  const length = Number(request.headers.get('content-length') || 0)
  if (length > maxBytes) throw new ApiError('VALIDATION_ERROR', 400, 'Body too large')
  const text = await request.text()
  if (new TextEncoder().encode(text).length > maxBytes) throw new ApiError('VALIDATION_ERROR', 400, 'Body too large')
  try { return schema.parse(JSON.parse(text)) } catch (error) {
    if (error instanceof ZodError || error instanceof SyntaxError) throw new ApiError('VALIDATION_ERROR', 400, 'Invalid body')
    throw error
  }
}

export async function handle(request: Request, fn: (id: string) => Promise<NextResponse>) {
  const id = requestId(request); const started = Date.now()
  try {
    const response = await fn(id); response.headers.set('X-Request-ID', id)
    console.info(JSON.stringify({ level: 'info', requestId: id, route: new URL(request.url).pathname, method: request.method, status: response.status, durationMs: Date.now() - started }))
    return response
  } catch (error) { return errorResponse(error, id) }
}

export const ok = (data: unknown, meta: Record<string, unknown> = {}) => NextResponse.json({ data, meta })
