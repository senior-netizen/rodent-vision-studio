import type { DeploymentStatus, PreviewState, ProjectConfig, ProjectDeployment } from '@/data/projects';

const APPROVED_DEPLOYMENT_SCHEMES = new Set(['https:']);
const APPROVED_DEPLOYMENT_DOMAINS = ['vercel.app', 'onrender.com', 'github.com'];

export type UpsertProjectPayload = {
  project: {
    id: string;
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

  const normalizedUrl = normalizeDeploymentUrl(input.url);
  if (!normalizedUrl) {
    return null;
  }

  const createdAt = toIsoDate(input.createdAt) ?? new Date().toISOString();

  return {
    version: input.version.trim(),
    url: normalizedUrl,
    createdAt,
    status: input.status ?? fallbackStatus,
  };
}

function isPrivateIpv4Address(hostname: string): boolean {
  const parts = hostname.split('.').map((segment) => Number(segment));
  if (parts.length !== 4 || parts.some((part) => Number.isNaN(part) || part < 0 || part > 255)) {
    return false;
  }

  return (
    parts[0] === 10
    || parts[0] === 127
    || (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31)
    || (parts[0] === 192 && parts[1] === 168)
    || (parts[0] === 169 && parts[1] === 254)
  );
}

function isLocalOrInternalHost(hostname: string): boolean {
  const lowered = hostname.toLowerCase();
  return (
    lowered === 'localhost'
    || lowered === '::1'
    || lowered.endsWith('.local')
    || lowered.endsWith('.internal')
    || isPrivateIpv4Address(lowered)
  );
}

function hasApprovedDomain(hostname: string): boolean {
  const lowered = hostname.toLowerCase();
  return APPROVED_DEPLOYMENT_DOMAINS.some((domain) => lowered === domain || lowered.endsWith(`.${domain}`));
}

export function normalizeDeploymentUrl(url: string): string | null {
  if (!hasNonEmptyText(url)) {
    return null;
  }

  let parsed: URL;
  try {
    parsed = new URL(url.trim());
  } catch {
    return null;
  }

  if (!APPROVED_DEPLOYMENT_SCHEMES.has(parsed.protocol)) {
    return null;
  }

  if (isLocalOrInternalHost(parsed.hostname) || !hasApprovedDomain(parsed.hostname)) {
    return null;
  }

  parsed.hash = '';

  if ((parsed.protocol === 'https:' && parsed.port === '443') || (parsed.protocol === 'http:' && parsed.port === '80')) {
    parsed.port = '';
  }

  const trimmedPath = parsed.pathname.replace(/\/+$/, '');
  parsed.pathname = trimmedPath || '/';

  return parsed.toString();
}

function toDeploymentIdentity(version: string, url: string): string {
  const normalizedUrl = normalizeDeploymentUrl(url) ?? url.trim();
  return `${version.trim()}::${normalizedUrl}`;
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
    !hasNonEmptyText(project.id)
    || !hasNonEmptyText(project.slug)
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
    return { error: 'Invalid deployment payload: deployment URL is malformed, local/internal, or not approved.' };
  }

  return {
    value: {
      project: {
        id: project.id.trim(),
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
  const deploymentIdentity = toDeploymentIdentity(deploymentRecord.version, deploymentRecord.url);
  const dedupedDeployments = [
    deploymentRecord,
    ...existingDeployments.filter((entry) => toDeploymentIdentity(entry.version, entry.url) !== deploymentIdentity),
  ];

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
