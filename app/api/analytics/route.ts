import { NextResponse } from 'next/server';
import { z } from 'zod';

import { getServerEnv } from '@/lib/env';

const analyticsPayloadSchema = z.object({
  name: z.string().trim().min(1).max(128),
  timestamp: z.string().datetime().optional(),
  path: z.string().trim().min(1).max(1024).optional(),
});

export async function POST(request: Request) {
  const env = getServerEnv();

  if (!env.features.analytics) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const json = await request.json().catch(() => null);
  const parsedPayload = analyticsPayloadSchema.safeParse(json);

  if (!parsedPayload.success) {
    return NextResponse.json({ error: 'Invalid analytics payload' }, { status: 400 });
  }

  const payload = parsedPayload.data;
  console.info('[analytics]', payload.name, payload.path ?? '', payload.timestamp ?? '');

  return NextResponse.json({ ok: true });
}
