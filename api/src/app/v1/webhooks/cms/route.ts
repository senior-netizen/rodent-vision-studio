import { revalidateTag } from 'next/cache'
import { ApiError } from '@/lib/errors'
import { handle, ok } from '@/lib/http'
import { webhookSchema } from '@/lib/schemas'
import { rateLimit } from '@/lib/rate-limit'
import { validSignature } from '@/lib/webhook'
export const dynamic = 'force-dynamic'
export function POST(request: Request) { return handle(request, async () => {
  const body = await request.text(); if (new TextEncoder().encode(body).length > 32_768) throw new ApiError('VALIDATION_ERROR', 400, 'Body too large')
  if (!validSignature(body, request.headers.get('x-webhook-signature'), process.env.CMS_WEBHOOK_SECRET)) throw new ApiError('UNAUTHORIZED', 401, 'Invalid signature')
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'; await rateLimit(`webhook:${ip}`, 60, 60)
  let event; try { event = webhookSchema.parse(JSON.parse(body)) } catch { throw new ApiError('VALIDATION_ERROR', 400, 'Invalid event') }
  const collection = event.collection || event.event.split('.')[0] + 's'; revalidateTag(`content:${collection}`); if (event.slug) revalidateTag(`content:${collection}:${event.slug}`)
  return ok({ accepted: true, eventId: event.id })
}) }
