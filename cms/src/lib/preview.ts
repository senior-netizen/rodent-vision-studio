import { createHmac, timingSafeEqual } from 'node:crypto'

export type PreviewClaims = { collection: 'insights' | 'services' | 'projects'; slug: string; exp: number }
export function signPreview(claims: PreviewClaims, secret = process.env.PREVIEW_SECRET): string {
  if (!secret) throw new Error('PREVIEW_SECRET is required to issue preview tokens.')
  const body = Buffer.from(JSON.stringify(claims)).toString('base64url')
  const signature = createHmac('sha256', secret).update(body).digest('base64url')
  return `${body}.${signature}`
}
export function verifyPreview(token: string, secret = process.env.PREVIEW_SECRET): PreviewClaims | null {
  if (!secret) return null
  const [body, supplied] = token.split('.')
  if (!body || !supplied) return null
  const expected = createHmac('sha256', secret).update(body).digest()
  const actual = Buffer.from(supplied, 'base64url')
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null
  try {
    const claims = JSON.parse(Buffer.from(body, 'base64url').toString()) as PreviewClaims
    return claims.exp > Math.floor(Date.now() / 1000) ? claims : null
  } catch { return null }
}
