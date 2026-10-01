import { NextResponse } from 'next/server'
import { handle } from '@/lib/http'
export const dynamic = 'force-dynamic'
export function GET(request: Request) { return handle(request, async () => NextResponse.json({ status: 'ok' }, { headers: { 'Cache-Control': 'no-store' } })) }
