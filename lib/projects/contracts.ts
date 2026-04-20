import type { DeploymentStatus, LinkHealth, ProjectConfig, ProjectDeployment } from '@/data/projects';

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
    linkHealth?: {
      lastCheckedAt?: string;
      lastSuccessfulCheckAt?: string;
      recentChecks?: Array<{
        checkedAt: string;
        ok: boolean;
        statusCode?: number;
      }>;
    };
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

function parseLinkHealth(value: unknown): LinkHealth | null {
  if (!value) {
    return null;
  }

  if (!isObject(value)) {
    return null;
  }

  const recentChecksRaw = Array.isArray(value.recentChecks) ? value.recentChecks : [];
  const recentChecks: NonNullable<LinkHealth['recentChecks']> = [];
  for (const entry of recentChecksRaw) {
    if (!isObject(entry) || !hasNonEmptyText(entry.checkedAt) || typeof entry.ok !== 'boolean') {
      continue;
    }

    const checkedAt = toIsoDate(entry.checkedAt);
    if (!checkedAt) {
      continue;
    }

    recentChecks.push({
      checkedAt,
      ok: entry.ok,
      statusCode: typeof entry.statusCode === 'number' ? entry.statusCode : undefined,
    });
  }

  return {
    lastCheckedAt: toIsoDate(value.lastCheckedAt) ?? undefined,
    lastSuccessfulCheckAt: toIsoDate(value.lastSuccessfulCheckAt) ?? undefined,
    recentChecks,
  };
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
        linkHealth: parseLinkHealth(project.linkHealth) ?? undefined,
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

export function composeProjectConfig(input: {
  current: ProjectConfig | undefined;
  payload: UpsertProjectPayload;
  previewUrl: string;
  previewGeneratedAt: string;
}): ProjectConfig {
  const { current, payload, previewUrl, previewGeneratedAt } = input;

  const deploymentRecord: ProjectDeployment = payload.deployment
    ? {
      version: payload.deployment.version,
      url: payload.deployment.url,
      createdAt: payload.deployment.createdAt ?? previewGeneratedAt,
      status: payload.deployment.status ?? payload.status,
    }
    : {
      version: current?.deployments?.[0]?.version ?? '1.0.0',
      url: current?.deployments?.[0]?.url ?? payload.project.links.live ?? previewUrl,
      createdAt: previewGeneratedAt,
      status: payload.status,
    };

  const existingDeployments = current?.deployments ?? [];
  const dedupedDeployments = [deploymentRecord, ...existingDeployments.filter((entry) => entry.version !== deploymentRecord.version)];

  return {
    id: current?.id ?? payload.project.slug,
    ...payload.project,
    url: payload.project.links.live ?? current?.url ?? previewUrl,
    preview: previewUrl,
    visuals: {
      ...payload.project.visuals,
      preview: previewUrl,
    },
    previewGeneratedAt,
    status: payload.status,
    deployments: dedupedDeployments,
    linkHealth: payload.project.linkHealth ?? current?.linkHealth,
  };
}
