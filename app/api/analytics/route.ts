import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { name?: string; timestamp?: string; path?: string };
    console.info('[analytics]', payload.name ?? 'unknown_event', payload.path ?? '', payload.timestamp ?? '');
  } catch {
    console.warn('[analytics] failed to parse payload');
  }

  return NextResponse.json({ ok: true });
}
