import type { DeploymentStatus, PreviewState, ProjectConfig, ProjectDeployment } from '@/data/projects';

export type UpsertProjectPayload = {
  project: {
    slug: string;
    name: string;
    category: string;
    role: string;
    links: {
      live?: string;
      repo?: string;
    };
    problem: string;
    architecture: string[];
    stack: string[];
    dataFlow: string[];
    decisions: string[];
    visuals: {
      screenshot: string;
      diagram: string;
      preview?: string;
    };
    outcome: string;
    summary: {
      scope: string;
      timeline: string;
      primaryKpi: string;
    };
  };
  status: DeploymentStatus;
  deployment?: {
    version: string;
    url: string;
    status?: DeploymentStatus;
    createdAt?: string;
  };
};

const DEPLOYMENT_STATUSES: DeploymentStatus[] = ['live', 'staging', 'failed'];

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function hasNonEmptyText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(hasNonEmptyText);
}

function isDeploymentStatus(value: unknown): value is DeploymentStatus {
  return typeof value === 'string' && DEPLOYMENT_STATUSES.includes(value as DeploymentStatus);
}

function toIsoDate(value: unknown): string | null {
  if (!hasNonEmptyText(value)) {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) {
    return null;
  }

  return date.toISOString();
}

function buildDeployment(
  input: UpsertProjectPayload['deployment'],
  fallbackStatus: DeploymentStatus,
): ProjectDeployment | null {
  if (!input) {
    return null;
  }

  if (!hasNonEmptyText(input.version) || !hasNonEmptyText(input.url)) {
    return null;
  }

  const createdAt = toIsoDate(input.createdAt) ?? new Date().toISOString();

  return {
    version: input.version.trim(),
    url: input.url.trim(),
    createdAt,
    status: input.status ?? fallbackStatus,
  };
}

export function validateUpsertPayload(payload: unknown): { value: UpsertProjectPayload } | { error: string } {
  if (!isObject(payload) || !isObject(payload.project)) {
    return { error: 'Invalid payload: expected a project object.' };
  }

  const { project, status, deployment } = payload;

  if (!isDeploymentStatus(status)) {
    return { error: 'Invalid status: expected one of live, staging, failed.' };
  }

  if (
    !hasNonEmptyText(project.slug)
    || !hasNonEmptyText(project.name)
    || !hasNonEmptyText(project.category)
    || !hasNonEmptyText(project.role)
    || !hasNonEmptyText(project.problem)
    || !hasNonEmptyText(project.outcome)
    || !isStringArray(project.architecture)
    || !isStringArray(project.stack)
    || !isStringArray(project.dataFlow)
    || !isStringArray(project.decisions)
  ) {
    return { error: 'Invalid payload: missing one or more required project fields.' };
  }

  if (!isObject(project.links) || !isObject(project.visuals) || !isObject(project.summary)) {
    return { error: 'Invalid payload: links, visuals, and summary are required objects.' };
  }

  if (
    !hasNonEmptyText(project.visuals.screenshot)
    || !hasNonEmptyText(project.visuals.diagram)
    || !hasNonEmptyText(project.summary.scope)
    || !hasNonEmptyText(project.summary.timeline)
    || !hasNonEmptyText(project.summary.primaryKpi)
  ) {
    return { error: 'Invalid payload: visuals and summary fields are required.' };
  }

  const normalizedDeployment = buildDeployment(deployment as UpsertProjectPayload['deployment'], status);
  if (deployment && !normalizedDeployment) {
    return { error: 'Invalid deployment payload: version and url are required.' };
  }

  return {
    value: {
      project: {
        slug: project.slug.trim(),
        name: project.name.trim(),
        category: project.category.trim(),
        role: project.role.trim(),
        links: {
          live: hasNonEmptyText(project.links.live) ? project.links.live.trim() : undefined,
          repo: hasNonEmptyText(project.links.repo) ? project.links.repo.trim() : undefined,
        },
        problem: project.problem.trim(),
        architecture: project.architecture.map((item) => item.trim()),
        stack: project.stack.map((item) => item.trim()),
        dataFlow: project.dataFlow.map((item) => item.trim()),
        decisions: project.decisions.map((item) => item.trim()),
        visuals: {
          screenshot: project.visuals.screenshot.trim(),
          diagram: project.visuals.diagram.trim(),
          preview: hasNonEmptyText(project.visuals.preview) ? project.visuals.preview.trim() : undefined,
        },
        outcome: project.outcome.trim(),
        summary: {
          scope: project.summary.scope.trim(),
          timeline: project.summary.timeline.trim(),
          primaryKpi: project.summary.primaryKpi.trim(),
        },
      },
      status,
      deployment: normalizedDeployment ?? undefined,
    },
  };
}

export function buildPendingPreviewState(current?: PreviewState): PreviewState {
  const now = new Date().toISOString();
  return {
    status: 'pending',
    attemptCount: (current?.attemptCount ?? 0) + 1,
    lastError: current?.lastError,
    requestedAt: now,
    generatedAt: current?.generatedAt,
    failedAt: current?.failedAt,
    updatedAt: now,
  };
}

export function composeProjectConfig(input: {
  current: ProjectConfig | undefined;
  payload: UpsertProjectPayload;
  previewState: PreviewState;
}): ProjectConfig {
  const { current, payload, previewState } = input;

  const fallbackCreatedAt = new Date().toISOString();
  const deploymentRecord: ProjectDeployment = payload.deployment
    ? {
      version: payload.deployment.version,
      url: payload.deployment.url,
      createdAt: payload.deployment.createdAt ?? fallbackCreatedAt,
      status: payload.deployment.status ?? payload.status,
    }
    : {
      version: current?.deployments?.[0]?.version ?? '1.0.0',
      url: current?.deployments?.[0]?.url ?? payload.project.links.live ?? payload.project.visuals.preview ?? payload.project.visuals.screenshot,
      createdAt: fallbackCreatedAt,
      status: payload.status,
    };

  const existingDeployments = current?.deployments ?? [];
  const dedupedDeployments = [deploymentRecord, ...existingDeployments.filter((entry) => entry.version !== deploymentRecord.version)];

  return {
    ...payload.project,
    visuals: {
      ...payload.project.visuals,
      preview: current?.visuals.preview ?? payload.project.visuals.preview ?? payload.project.visuals.screenshot,
    },
    previewGeneratedAt: current?.previewGeneratedAt,
    previewState,
    status: payload.status,
    deployments: dedupedDeployments,
  };
}
