import { createHmac, timingSafeEqual } from 'node:crypto'
export function validSignature(body: string, signature: string | null, secret: string | undefined) {
  if (!secret || !signature) return false
  const supplied = signature.replace(/^sha256=/, '')
  const expected = createHmac('sha256', secret).update(body).digest('hex')
  return supplied.length === expected.length && timingSafeEqual(Buffer.from(supplied), Buffer.from(expected))
}
