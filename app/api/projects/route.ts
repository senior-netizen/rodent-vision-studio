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

  const mutation = (async (): Promise<ResponsePayload> => {
    const current = getProjectBySlug(payload.project.slug);
    const previewState = buildPendingPreviewState(current?.previewState);
    const correlationId = deriveCorrelationId(request);

    const project = composeProjectConfig({
      current,
      payload,
      previewState,
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
