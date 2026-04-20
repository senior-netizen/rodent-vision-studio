import { createHash, randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { authorizeProjectsWrite } from '@/lib/projects/admin-auth';
import {
  enqueuePreviewJob,
  getIdempotentRecord,
  getProjectBySlug,
  listProjects,
  setIdempotentResponse,
  upsertProject,
} from '@/lib/projects/store';

const inFlightMutations = new Map<string, { requestHash: string; promise: Promise<ResponsePayload> }>();

type ResponsePayload = {
  ok: true;
  idempotencyKey: string;
  correlationId: string;
  project: Awaited<ReturnType<typeof upsertProject>>;
  previewJobId: string;
};

function buildIdempotencyKey(request: Request, payload: UpsertProjectPayload): string {
  return request.headers.get('idempotency-key')?.trim() || `${payload.project.slug}:${payload.deployment?.version ?? 'base'}`;
}

function buildCorrelationId(request: Request): string {
  return request.headers.get('x-correlation-id')?.trim() || randomUUID();
}

function hashPayload(payload: unknown): string {
  return createHash('sha256').update(JSON.stringify(payload)).digest('hex');
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug')?.trim();

  if (slug) {
    const project = getProjectBySlug(slug);
    if (!project) {
      return NextResponse.json({ error: `Project not found for slug: ${slug}` }, { status: 404 });
    }

    return NextResponse.json({ ok: true, project });
  }

  return NextResponse.json({
    ok: true,
    projects: listProjects(),
  });
}

export async function POST(request: Request) {
  const authorization = authorizeProjectsWrite(request);
  if (!authorization.ok) {
    return NextResponse.json({ error: authorization.error }, { status: authorization.status });
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
    const current = getProjectBySlug(payload.project.slug);
    const initialPreviewUrl = payload.project.visuals.preview ?? current?.visuals.preview ?? payload.project.visuals.screenshot;
    const generatedAt = new Date().toISOString();

    const project = composeProjectConfig({
      current,
      payload,
      previewUrl: previewResult.previewUrl,
      previewGeneratedAt: previewResult.generatedAt,
      previewAsset: previewResult.previewMetadata?.assetHash
        && previewResult.previewMetadata.assetVersion
        && previewResult.previewMetadata.aliasUrl
        ? {
          hash: previewResult.previewMetadata.assetHash,
          version: previewResult.previewMetadata.assetVersion,
          aliasUrl: previewResult.previewMetadata.aliasUrl,
        }
        : current?.previewAsset,
    });

    const saved = upsertProject(project);
    const previewSourceUrl = getPreviewSourceUrl(payload, current?.visuals.preview);

    const previewJobId = await enqueuePreviewJob({
      projectSlug: payload.project.slug,
      sourceUrl: previewSourceUrl,
      idempotencyKey,
      correlationId,
      payload,
    });

    logStructured({
      event: 'projects.preview.enqueued',
      message: 'Preview generation job enqueued.',
      correlationId,
      idempotencyKey,
      projectSlug: payload.project.slug,
      previewJobId,
    });

    return {
      ok: true,
      idempotencyKey,
      correlationId,
      project: saved,
      previewJobId,
    };
  })();

  inFlightMutations.set(idempotencyKey, { requestHash, promise: mutation });

  try {
    const response = await mutation;
    setIdempotentResponse(idempotencyKey, requestHash, response);
    return NextResponse.json(response, { status: 202 });
  } catch (error) {
    logStructuredError({
      event: 'projects.preview.enqueue.failed',
      message: 'Project persistence succeeded but queue enqueue failed.',
      correlationId,
      idempotencyKey,
      projectSlug: payload.project.slug,
      error,
    });

    const message = error instanceof Error ? error.message : 'Project orchestration failed.';
    return NextResponse.json({ error: message, correlationId }, { status: 502 });
  } finally {
    inFlightMutations.delete(idempotencyKey);
  }
}
