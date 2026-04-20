import type {
  DeploymentStatus,
  LinkHealth,
  PreviewState,
  ProjectConfig,
  ProjectDeployment,
} from '@/data/projects';

export const APPROVED_DEPLOYMENT_SCHEMES = new Set(['https:', 'http:']);
export const APPROVED_DEPLOYMENT_DOMAINS = [
  'vercel.app',
  'onrender.com',
  'github.com',
  'netlify.app',
] as const;

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
  return Number.isNaN(date.valueOf()) ? null : date.toISOString();
}

function parseLinkHealth(value: unknown): LinkHealth | undefined {
  if (!isObject(value)) {
    return undefined;
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

function buildDeployment(
  input: UpsertProjectPayload['deployment'],
  fallbackStatus: DeploymentStatus,
): ProjectDeployment | undefined {
  if (!input || !hasNonEmptyText(input.version) || !hasNonEmptyText(input.url)) {
    return undefined;
  }

  const normalizedUrl = normalizeDeploymentUrl(input.url);
  if (!normalizedUrl) {
    return undefined;
  }

  return {
    version: input.version.trim(),
    url: normalizedUrl,
    createdAt: toIsoDate(input.createdAt) ?? new Date().toISOString(),
    status: input.status ?? fallbackStatus,
  };
}

function toDeploymentIdentity(version: string, url: string): string {
  return `${version.trim()}::${normalizeDeploymentUrl(url) ?? url.trim()}`;
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
        linkHealth: parseLinkHealth(project.linkHealth),
        summary: {
          scope: project.summary.scope.trim(),
          timeline: project.summary.timeline.trim(),
          primaryKpi: project.summary.primaryKpi.trim(),
        },
      },
      status,
      deployment: normalizedDeployment,
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
  previewUrl?: string;
  previewGeneratedAt?: string;
  previewAsset?: ProjectConfig['previewAsset'];
}): ProjectConfig {
  const { current, payload, previewUrl, previewGeneratedAt, previewAsset } = input;
  const resolvedPreviewUrl = previewUrl ?? payload.project.visuals.preview ?? current?.visuals.preview ?? payload.project.visuals.screenshot;

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
      url: current?.deployments?.[0]?.url ?? payload.project.links.live ?? resolvedPreviewUrl,
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
    id: payload.project.id,
    slug: payload.project.slug,
    name: payload.project.name,
    category: payload.project.category,
    role: payload.project.role,
    url: payload.project.links.live ?? current?.url ?? resolvedPreviewUrl,
    links: payload.project.links,
    problem: payload.project.problem,
    architecture: payload.project.architecture,
    preview: resolvedPreviewUrl,
    stack: payload.project.stack,
    dataFlow: payload.project.dataFlow,
    decisions: payload.project.decisions,
    visuals: {
      ...payload.project.visuals,
      preview: resolvedPreviewUrl,
    },
    previewGeneratedAt: previewGeneratedAt ?? current?.previewGeneratedAt,
    previewAsset: previewAsset ?? current?.previewAsset,
    status: payload.status,
    deployments: dedupedDeployments,
    linkHealth: payload.project.linkHealth ?? current?.linkHealth,
    outcome: payload.project.outcome,
    summary: payload.project.summary,
  };
}
