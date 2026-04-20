import { promises as fs } from 'node:fs';
import path from 'node:path';

export type ProjectPreviewMetadata = {
  publicId: string;
  capturedAt: string;
  sourceUrl: string;
  correlationId: string;
};

type ProjectPreviewRecord = {
  imageUrl: string;
  metadata: ProjectPreviewMetadata;
  updatedAt: string;
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

async function readRegistry(): Promise<ProjectRegistry> {
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

async function writeRegistry(registry: ProjectRegistry) {
  await fs.mkdir(path.dirname(registryPath), { recursive: true });
  await fs.writeFile(registryPath, JSON.stringify(registry, null, 2), 'utf8');
}

async function readReconciliationQueue(): Promise<ReconciliationQueue> {
  try {
    const contents = await fs.readFile(reconciliationQueuePath, 'utf8');
    const parsed = JSON.parse(contents) as Partial<ReconciliationQueue>;

    return {
      tasks: parsed.tasks ?? [],
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return { tasks: [] };
    }

    throw error;
  }
}

async function writeReconciliationQueue(queue: ReconciliationQueue) {
  await fs.mkdir(path.dirname(reconciliationQueuePath), { recursive: true });
  await fs.writeFile(reconciliationQueuePath, JSON.stringify(queue, null, 2), 'utf8');
}

export async function updateProjectPreview(projectId: string, imageUrl: string, metadata: ProjectPreviewMetadata) {
  const registry = await readRegistry();

  registry.projects[projectId] = {
    imageUrl,
    metadata,
    updatedAt: new Date().toISOString(),
  };

  await writeRegistry(registry);
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
