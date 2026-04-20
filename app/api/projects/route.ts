import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import {
  composeProjectConfig,
  validateUpsertPayload,
  type UpsertProjectPayload,
} from '@/lib/projects/contracts';
import {
  getIdempotentResponse,
  getProjectBySlug,
  setIdempotentResponse,
  upsertProject,
} from '@/lib/projects/store';

function buildIdempotencyKey(request: Request, payload: UpsertProjectPayload): string {
  return request.headers.get('idempotency-key')?.trim() || `${payload.project.slug}:${payload.deployment?.version ?? 'base'}`;
}

function hashPayload(payload: unknown): string {
  return createHash('sha256').update(JSON.stringify(payload)).digest('hex');
}

export async function POST(request: Request) {
  const body = await request.json();
  const validation = validateUpsertPayload(body);

  if ('error' in validation) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const payload = validation.value;
  const requestHash = hashPayload(payload);
  const idempotencyKey = buildIdempotencyKey(request, payload);
  const cached = getIdempotentResponse(idempotencyKey, requestHash);

  if (cached) {
    return NextResponse.json(cached);
  }

  const current = getProjectBySlug(payload.project.slug);
  const previewResponse = await fetch(new URL('/api/generate-preview', request.url), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      slug: payload.project.slug,
      screenshotUrl: payload.project.visuals.screenshot,
      currentPreviewUrl: current?.visuals.preview,
    }),
  });

  if (!previewResponse.ok) {
    const errorText = await previewResponse.text();
    return NextResponse.json({ error: `Preview generation failed: ${errorText}` }, { status: 502 });
  }

  const previewResult = (await previewResponse.json()) as {
    previewUrl?: string;
    generatedAt?: string;
  };

  if (!previewResult.previewUrl || !previewResult.generatedAt) {
    return NextResponse.json({ error: 'Preview generation returned an invalid response.' }, { status: 502 });
  }

  const project = composeProjectConfig({
    current,
    payload,
    previewUrl: previewResult.previewUrl,
    previewGeneratedAt: previewResult.generatedAt,
  });

  const saved = upsertProject(project);
  const response = {
    ok: true,
    idempotencyKey,
    project: saved,
  };

  setIdempotentResponse(idempotencyKey, requestHash, response);

  return NextResponse.json(response);
}
