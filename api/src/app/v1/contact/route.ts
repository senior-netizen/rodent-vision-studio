import { handle, ok, parseJson } from '@/lib/http'
import { contactSchema } from '@/lib/schemas'
import { rateLimit } from '@/lib/rate-limit'
import { deliverContact, verifyTurnstile } from '@/lib/contact'
export const dynamic = 'force-dynamic'
export function POST(request: Request) { return handle(request, async () => {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'; await rateLimit(`contact:${ip}`, 5, 3600)
  const input = await parseJson(request, contactSchema); await verifyTurnstile(input.turnstileToken, ip); await deliverContact(input)
  return ok({ accepted: true })
}) }
