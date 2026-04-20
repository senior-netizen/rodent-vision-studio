import { projectConfigs, type ProjectConfig } from '@/data/projects';

export type DeploymentStatus = ProjectConfig['status'];
export type ProjectDeployment = ProjectConfig['deployments'][number];

const projects = new Map<string, ProjectConfig>(
  projectConfigs.map((project) => [project.slug, structuredClone(project)]),
);

type IdempotentRecord = { requestHash: string; response: unknown };

const idempotentResponses = new Map<string, IdempotentRecord>();

export function listProjects(): ProjectConfig[] {
  return [...projects.values()].map((project) => structuredClone(project));
}

export function getProjectBySlug(slug: string): ProjectConfig | undefined {
  const project = projects.get(slug);
  return project ? structuredClone(project) : undefined;
}

export function upsertProject(project: ProjectConfig): ProjectConfig {
  const normalized: ProjectConfig = {
    ...project,
    deployments: [...project.deployments].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
  };

  projects.set(project.slug, normalized);
  return structuredClone(normalized);
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

export function getKnownProjectSlugs(): string[] {
  return [...projects.keys()];
}
