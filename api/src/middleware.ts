import { NextRequest, NextResponse } from 'next/server'
const defaults = ['https://www.rodent-lab.com', 'https://rodent-lab.com', 'https://cms.rodent-lab.com']
function allowedOrigins() { return new Set((process.env.ALLOWED_ORIGINS || defaults.join(',')).split(',').map(v => v.trim()).filter(Boolean)) }
export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin'); const idHeader = request.headers.get('x-request-id'); const id = idHeader && /^[A-Za-z0-9._-]{1,100}$/.test(idHeader) ? idHeader : crypto.randomUUID()
  if (origin && !allowedOrigins().has(origin)) return NextResponse.json({ error: { code: 'FORBIDDEN', message: 'This origin is not allowed.' } }, { status: 403, headers: { 'X-Request-ID': id } })
  if (request.method === 'OPTIONS') {
    if (!origin) return new NextResponse(null, { status: 400 })
    return new NextResponse(null, { status: 204, headers: { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Authorization, Content-Type, X-Request-ID, X-Webhook-Signature', Vary: 'Origin', 'X-Request-ID': id } })
  }
  const headers = new Headers(request.headers); headers.set('x-request-id', id); const response = NextResponse.next({ request: { headers } }); response.headers.set('X-Request-ID', id)
  if (origin) { response.headers.set('Access-Control-Allow-Origin', origin); response.headers.set('Vary', 'Origin') }
  return response
}
export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] }
