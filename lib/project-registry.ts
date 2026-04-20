import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';

export type ProjectPreviewMetadata = {
  publicId: string;
  capturedAt: string;
  sourceUrl: string;
  correlationId: string;
  assetHash: string;
  assetVersion: string;
};

type ProjectPreviewVersionRecord = {
  imageUrl: string;
  metadata: ProjectPreviewMetadata;
  publishedAt: string;
};

type ProjectPreviewRecord = {
  currentHash: string;
  aliasUrl: string;
  versions: Record<string, ProjectPreviewVersionRecord>;
  updatedAt: string;
  health?: {
    statusCode: number | null;
    checkedAt: string;
    latencyMs: number;
    errorClass: string | null;
    consecutiveFailures: number;
    lastSuccessAt: string | null;
  };
};

type ProjectRegistry = {
  projects: Record<string, ProjectPreviewRecord>;
};

export type UploadAttemptEvent = {
  correlationId: string;
  projectId: string;
  attempt: number;
  startedAt: string;
  finishedAt: string;
  category: 'retryable' | 'permanent' | 'auth' | 'rate_limited' | 'success';
  terminalReason: string;
  statusCode?: number;
  retryScheduledMs?: number;
};

export type ReconciliationTask = {
  taskId: string;
  projectId: string;
  imageUrl: string;
  metadata: ProjectPreviewMetadata;
  reason: string;
  createdAt: string;
  status: 'pending';
};

type ReconciliationQueue = {
  tasks: ReconciliationTask[];
};

const dataDirectoryPath = path.join(process.cwd(), 'data');
const registryPath = path.join(dataDirectoryPath, 'project-registry.json');
const uploadAttemptsPath = path.join(dataDirectoryPath, 'upload-attempts.jsonl');
const reconciliationQueuePath = path.join(dataDirectoryPath, 'preview-reconciliation-queue.json');

function buildAliasUrl(projectId: string): string {
  return `/api/previews/${projectId}.png`;
}

export function buildImmutablePreviewUrl(projectId: string, assetHash: string): string {
  return `/api/previews/${projectId}/${assetHash}.png`;
}

export function createPreviewAssetHash(input: { projectId: string; sourceUrl: string; capturedAt: string; correlationId: string }): string {
  const fingerprint = `${input.projectId}|${input.sourceUrl}|${input.capturedAt}|${input.correlationId}`;
  return createHash('sha256').update(fingerprint).digest('hex').slice(0, 20);
}

async function atomicWriteRegistry(registry: ProjectRegistry) {
  await fs.mkdir(path.dirname(registryPath), { recursive: true });

  const tempPath = path.join(
    path.dirname(registryPath),
    `${path.basename(registryPath)}.${process.pid}.${Date.now()}.${Math.random().toString(36).slice(2)}.tmp`,
  );

  await fs.writeFile(tempPath, JSON.stringify(registry, null, 2), 'utf8');
  await fs.rename(tempPath, registryPath);
}

export async function readRegistry(): Promise<ProjectRegistry> {
  try {
    const contents = await fs.readFile(registryPath, 'utf8');
    const parsed = JSON.parse(contents) as Partial<ProjectRegistry>;

    return {
      projects: parsed.projects ?? {},
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return { projects: {} };
    }

    throw error;
  }
}

export async function publishProjectPreview(input: {
  projectId: string;
  imageUrl: string;
  sourceUrl: string;
  capturedAt: string;
  correlationId: string;
  publicId?: string;
}): Promise<{ aliasUrl: string; immutableUrl: string; assetHash: string; assetVersion: string; publishedAt: string }> {
  const registry = await readRegistry();
  const existingRecord = registry.projects[input.projectId];
  const assetHash = createPreviewAssetHash({
    projectId: input.projectId,
    sourceUrl: input.sourceUrl,
    capturedAt: input.capturedAt,
    correlationId: input.correlationId,
  });

  const nextVersion = ((existingRecord?.versions ? Object.keys(existingRecord.versions).length : 0) + 1).toString();
  const publishedAt = new Date().toISOString();

  // Step 1: Write the new immutable asset record.
  const nextVersions = {
    ...(existingRecord?.versions ?? {}),
    [assetHash]: {
      imageUrl: input.imageUrl,
      metadata: {
        publicId: input.publicId ?? `preview-${assetHash}`,
        capturedAt: input.capturedAt,
        sourceUrl: input.sourceUrl,
        correlationId: input.correlationId,
        assetHash,
        assetVersion: nextVersion,
      },
      publishedAt,
    },
  };

  // Step 2: Atomically move the mutable pointer to the new immutable asset.
  registry.projects[input.projectId] = {
    currentHash: assetHash,
    aliasUrl: buildAliasUrl(input.projectId),
    versions: nextVersions,
    updatedAt: publishedAt,
  };

  await atomicWriteRegistry(registry);

  return {
    aliasUrl: buildAliasUrl(input.projectId),
    immutableUrl: buildImmutablePreviewUrl(input.projectId, assetHash),
    assetHash,
    assetVersion: nextVersion,
    publishedAt,
  };
}

export async function resolveProjectPreview(projectId: string): Promise<{
  aliasUrl: string;
  currentHash: string;
  immutableUrl: string;
  imageUrl: string;
  metadata: ProjectPreviewMetadata;
} | null> {
  const registry = await readRegistry();
  const record = registry.projects[projectId];

  if (!record) {
    return null;
  }

  const version = record.versions[record.currentHash];
  if (!version) {
    return null;
  }

  return {
    aliasUrl: record.aliasUrl,
    currentHash: record.currentHash,
    immutableUrl: buildImmutablePreviewUrl(projectId, record.currentHash),
    imageUrl: version.imageUrl,
    metadata: version.metadata,
  };
}

export async function resolveProjectPreviewVersion(projectId: string, assetHash: string): Promise<ProjectPreviewVersionRecord | null> {
  const registry = await readRegistry();
  const record = registry.projects[projectId];
  if (!record) {
    return null;
  }

  return record.versions[assetHash] ?? null;
}

export async function purgePreviewAlias(input: { projectId: string; aliasUrl: string }): Promise<void> {
  const purgeEndpoint = process.env.PREVIEW_CDN_PURGE_URL;
  if (!purgeEndpoint) {
    return;
  }

  const response = await fetch(purgeEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      projectId: input.projectId,
      paths: [input.aliasUrl],
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`CDN purge failed for alias ${input.aliasUrl}: ${response.status} ${details}`);
  }
}


async function readReconciliationQueue(): Promise<ReconciliationQueue> {
  try {
    const contents = await fs.readFile(reconciliationQueuePath, 'utf8');
    const parsed = JSON.parse(contents) as Partial<ReconciliationQueue>;
    return {
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : [],
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return { tasks: [] };
    }

    throw error;
  }
}

async function writeReconciliationQueue(queue: ReconciliationQueue): Promise<void> {
  await fs.mkdir(path.dirname(reconciliationQueuePath), { recursive: true });
  await fs.writeFile(reconciliationQueuePath, JSON.stringify(queue, null, 2), 'utf8');
}
export async function appendUploadAttempt(event: UploadAttemptEvent) {
  await fs.mkdir(dataDirectoryPath, { recursive: true });
  await fs.appendFile(uploadAttemptsPath, `${JSON.stringify(event)}\n`, 'utf8');
}

export async function enqueuePreviewReconciliationTask(input: {
  projectId: string;
  imageUrl: string;
  metadata: ProjectPreviewMetadata;
  reason: string;
}) {
  const queue = await readReconciliationQueue();
  const task: ReconciliationTask = {
    taskId: `${input.projectId}:${input.metadata.correlationId}:${Date.now()}`,
    projectId: input.projectId,
    imageUrl: input.imageUrl,
    metadata: input.metadata,
    reason: input.reason,
    createdAt: new Date().toISOString(),
    status: 'pending',
  };

  queue.tasks.unshift(task);
  await writeReconciliationQueue(queue);

  return task;
}


export async function updateProjectPreview(
  projectId: string,
  imageUrl: string,
  metadata: {
    publicId: string;
    capturedAt: string;
    sourceUrl: string;
    correlationId: string;
  },
): Promise<{ aliasUrl: string; immutableUrl: string; assetHash: string; assetVersion: string; publishedAt: string }> {
  return publishProjectPreview({
    projectId,
    imageUrl,
    sourceUrl: metadata.sourceUrl,
    capturedAt: metadata.capturedAt,
    correlationId: metadata.correlationId,
    publicId: metadata.publicId,
  });
}
