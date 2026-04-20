import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import {
  composeProjectConfig,
  validateUpsertPayload,
  type UpsertProjectPayload,
} from '@/lib/projects/contracts';
import {
  getIdempotentRecord,
  getProjectBySlug,
  setIdempotentResponse,
  upsertProject,
} from '@/lib/projects/store';

const inFlightOrchestrations = new Map<string, Promise<ResponsePayload>>();

type ResponsePayload = {
  ok: true;
  idempotencyKey: string;
  project: Awaited<ReturnType<typeof upsertProject>>;
};

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
  const cached = getIdempotentRecord(idempotencyKey);

  if (cached && cached.requestHash !== requestHash) {
    return NextResponse.json(
      { error: 'Idempotency key already used with a different payload.' },
      { status: 409 },
    );
  }

  if (cached) {
    return NextResponse.json(cached.response);
  }

  if (inFlightOrchestrations.has(idempotencyKey)) {
    const inFlightResult = await inFlightOrchestrations.get(idempotencyKey);
    return NextResponse.json(inFlightResult);
  }

  const orchestration = (async (): Promise<ResponsePayload> => {
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
      throw new Error(`Preview generation failed: ${errorText}`);
    }

    const previewResult = (await previewResponse.json()) as {
      previewUrl?: string;
      generatedAt?: string;
    };

    if (!previewResult.previewUrl || !previewResult.generatedAt) {
      throw new Error('Preview generation returned an invalid response.');
    }

    const project = composeProjectConfig({
      current,
      payload,
      previewUrl: previewResult.previewUrl,
      previewGeneratedAt: previewResult.generatedAt,
    });

    const saved = upsertProject(project);
    return {
      ok: true,
      idempotencyKey,
      project: saved,
    };
  })();

  inFlightOrchestrations.set(idempotencyKey, orchestration);

  try {
    const response = await orchestration;
    setIdempotentResponse(idempotencyKey, requestHash, response);
    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Project orchestration failed.';
    return NextResponse.json({ error: message }, { status: 502 });
  } finally {
    inFlightOrchestrations.delete(idempotencyKey);
  }
}
