import { projectConfigs, type ProjectConfig } from '@/data/projects';
import { applyProjectFreshness, hydrateProjectsWithFreshness } from '@/lib/projects/scheduler';

const projects = new Map<string, ProjectConfig>(
  projectConfigs.map((project) => [project.slug, structuredClone(project)]),
);
const slugByProjectId = new Map<string, string>(
  projectConfigs.map((project) => [project.id, project.slug]),
);

type IdempotentRecord = { requestHash: string; response: unknown };

export type PreviewJobRequest = {
  dedupeKey: string;
  projectSlug: string;
  sourceUrl: string;
  correlationId: string;
  enqueuedAt: string;
};

const idempotentResponses = new Map<string, IdempotentRecord>();
const previewOutbox = new Map<string, PreviewJobRequest>();

export function listProjects(): ProjectConfig[] {
  return hydrateProjectsWithFreshness(
    [...projects.values()].map((project) => structuredClone(project)),
  );
}

export function getProjectBySlug(slug: string): ProjectConfig | undefined {
  const project = projects.get(slug);
  return project ? applyProjectFreshness(structuredClone(project)) : undefined;
}

export function upsertProject(project: ProjectConfig): ProjectConfig {
  const slugCollision = slugByProjectId.get(project.id);
  if (slugCollision && slugCollision !== project.slug) {
    throw new Error(`Project id "${project.id}" is already assigned to slug "${slugCollision}".`);
  }

  const currentBySlug = projects.get(project.slug);
  if (currentBySlug && currentBySlug.id !== project.id) {
    throw new Error(`Project slug "${project.slug}" is already assigned to id "${currentBySlug.id}".`);
  }

  const normalized: ProjectConfig = {
    ...project,
    deployments: [...(project.deployments ?? [])].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
  };

  const previousSlug = slugByProjectId.get(project.id);
  if (previousSlug && previousSlug !== project.slug) {
    projects.delete(previousSlug);
  }

  projects.set(project.slug, normalized);
  return applyProjectFreshness(structuredClone(normalized));
}

export function getIdempotentRecord(key: string): IdempotentRecord | null {
  const record = idempotentResponses.get(key);
  return record ? structuredClone(record) : null;
}

export function setIdempotentResponse(key: string, requestHash: string, response: unknown) {
  idempotentResponses.set(key, {
    requestHash,
    response: structuredClone(response),
  });
}

export function enqueuePreviewJob(request: {
  dedupeKey: string;
  projectSlug: string;
  sourceUrl: string;
  correlationId: string;
}): PreviewJobRequest {
  const existing = previewOutbox.get(request.dedupeKey);
  if (existing) {
    return structuredClone(existing);
  }

  const next: PreviewJobRequest = {
    ...request,
    enqueuedAt: new Date().toISOString(),
  };

  previewOutbox.set(request.dedupeKey, next);
  return structuredClone(next);
}

export function getPreviewJobByDedupeKey(dedupeKey: string): PreviewJobRequest | null {
  const job = previewOutbox.get(dedupeKey);
  return job ? structuredClone(job) : null;
}

export function getKnownProjectSlugs(): string[] {
  return [...projects.keys()];
}

export function getProjectSlugById(id: string): string | undefined {
  return slugByProjectId.get(id);
}
