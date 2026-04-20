import { createHash, randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import {
  buildPendingPreviewState,
  composeProjectConfig,
  validateUpsertPayload,
  type UpsertProjectPayload,
} from '@/lib/projects/contracts';
import {
  enqueuePreviewJob,
  getIdempotentRecord,
  getProjectBySlug,
  getProjectSlugById,
  setIdempotentResponse,
  upsertProject,
} from '@/lib/projects/store';

const inFlightMutations = new Map<string, { requestHash: string; promise: Promise<ResponsePayload> }>();

type ResponsePayload = {
  ok: true;
  idempotencyKey: string;
  preview: {
    status: 'pending';
    correlationId: string;
  };
  project: Awaited<ReturnType<typeof upsertProject>>;
};

function buildIdempotencyKey(request: Request, payload: UpsertProjectPayload): string {
  return request.headers.get('idempotency-key')?.trim() || `${payload.project.slug}:${payload.deployment?.version ?? 'base'}`;
}

function hashPayload(payload: unknown): string {
  return createHash('sha256').update(JSON.stringify(payload)).digest('hex');
}


function isAuthorized(request: Request): boolean {
  const adminToken = process.env.PROJECTS_ADMIN_TOKEN;
  if (!adminToken) {
    return true;
  }

  const requestToken = request.headers.get('x-admin-token')?.trim();
  return requestToken === adminToken;
}

function deriveCorrelationId(request: Request): string {
  return request.headers.get('x-correlation-id')?.trim() || randomUUID();
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized project write operation.' }, { status: 401 });
  }

  const body = await request.json();
  const validation = validateUpsertPayload(body);

  if ('error' in validation) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const payload = validation.value;
  const existingSlugForId = getProjectSlugById(payload.project.id);
  if (existingSlugForId && existingSlugForId !== payload.project.slug) {
    return NextResponse.json(
      { error: `Project id "${payload.project.id}" is already bound to slug "${existingSlugForId}".` },
      { status: 409 },
    );
  }

  const existingProjectForSlug = getProjectBySlug(payload.project.slug);
  if (existingProjectForSlug && existingProjectForSlug.id !== payload.project.id) {
    return NextResponse.json(
      { error: `Project slug "${payload.project.slug}" is already bound to id "${existingProjectForSlug.id}".` },
      { status: 409 },
    );
  }

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
    return NextResponse.json(cached.response, { status: 202 });
  }

  const inFlight = inFlightMutations.get(idempotencyKey);
  if (inFlight && inFlight.requestHash !== requestHash) {
    return NextResponse.json(
      { error: 'Idempotency key is currently processing a different payload.' },
      { status: 409 },
    );
  }

  if (inFlight) {
    const inFlightResult = await inFlight.promise;
    return NextResponse.json(inFlightResult, { status: 202 });
  }

  const orchestration = (async (): Promise<ResponsePayload> => {
    const current = existingProjectForSlug;
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

    const previewBody = await previewResponse.json() as {
      previewUrl?: string;
      generatedAt?: string;
      error?: string;
      category?: string;
      correlationId?: string;
    };

    const fallbackPreviewUrl = current?.visuals.preview;
    const fallbackGeneratedAt = current?.previewGeneratedAt ?? new Date().toISOString();

    if (!previewResponse.ok) {
      if (fallbackPreviewUrl) {
        console.warn('Preview generation failed, using last known preview.', {
          slug: payload.project.slug,
          correlationId: previewBody.correlationId,
          category: previewBody.category,
          reason: previewBody.error,
        });
      } else {
        const details = previewBody.error ?? 'Unknown preview generation error.';
        throw new Error(`Preview generation failed: ${details}`);
      }
    }

    const previewUrl = previewBody.previewUrl ?? fallbackPreviewUrl;
    const previewGeneratedAt = previewBody.generatedAt ?? fallbackGeneratedAt;

    if (!previewUrl) {
      throw new Error('Preview generation returned an invalid response.');
    }

    const project = composeProjectConfig({
      current,
      payload,
      previewUrl,
      previewGeneratedAt,
    });

    const saved = upsertProject(project);

    enqueuePreviewJob({
      dedupeKey: idempotencyKey,
      projectSlug: payload.project.slug,
      sourceUrl: payload.project.visuals.screenshot,
      correlationId,
    });

    return {
      ok: true,
      idempotencyKey,
      preview: {
        status: 'pending',
        correlationId,
      },
      project: saved,
    };
  })();

  inFlightMutations.set(idempotencyKey, { requestHash, promise: mutation });

  try {
    const response = await mutation;
    setIdempotentResponse(idempotencyKey, requestHash, response);
    return NextResponse.json(response, { status: 202 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Project mutation failed.';
    return NextResponse.json({ error: message }, { status: 502 });
  } finally {
    inFlightMutations.delete(idempotencyKey);
  }
}
