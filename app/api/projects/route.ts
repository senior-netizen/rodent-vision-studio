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

const inFlightOrchestrations = new Map<string, { requestHash: string; promise: Promise<ResponsePayload> }>();

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

function isAuthorized(request: Request): boolean {
  const adminToken = process.env.PROJECTS_ADMIN_TOKEN;
  if (!adminToken) {
    return true;
  }

  const requestToken = request.headers.get('x-admin-token')?.trim();
  return requestToken === adminToken;
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
    return NextResponse.json(cached.response);
  }

  const inFlight = inFlightOrchestrations.get(idempotencyKey);
  if (inFlight && inFlight.requestHash !== requestHash) {
    return NextResponse.json(
      { error: 'Idempotency key is currently processing a different payload.' },
      { status: 409 },
    );
  }

  if (inFlight) {
    const inFlightResult = await inFlight.promise;
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
      previewMetadata?: {
        assetHash?: string;
        assetVersion?: string;
        aliasUrl?: string;
      };
    };

    if (!previewResult.previewUrl || !previewResult.generatedAt) {
      throw new Error('Preview generation returned an invalid response.');
    }

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
    return {
      ok: true,
      idempotencyKey,
      project: saved,
    };
  })();

  inFlightOrchestrations.set(idempotencyKey, { requestHash, promise: orchestration });

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
