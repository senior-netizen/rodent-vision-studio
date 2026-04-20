import type { LinkHealth, ProjectConfig } from '@/data/projects';

const DEFAULT_STALE_AFTER_HOURS = 72;

function toIsoOrUndefined(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.valueOf())) {
    return undefined;
  }

  return parsed.toISOString();
}

function sortChecksDescending(checks: NonNullable<LinkHealth['recentChecks']>) {
  return [...checks].sort((a, b) => b.checkedAt.localeCompare(a.checkedAt));
}

function normalizeLinkHealth(linkHealth: LinkHealth | undefined): LinkHealth | undefined {
  if (!linkHealth) {
    return undefined;
  }

  const normalizedChecks = (linkHealth.recentChecks ?? [])
    .map((entry) => ({
      ...entry,
      checkedAt: toIsoOrUndefined(entry.checkedAt),
    }))
    .filter((entry): entry is { checkedAt: string; ok: boolean; statusCode?: number } => Boolean(entry.checkedAt))
    .map((entry) => ({
      checkedAt: entry.checkedAt,
      ok: entry.ok,
      statusCode: entry.statusCode,
    }));

  const sortedChecks = sortChecksDescending(normalizedChecks);
  const latestSuccessfulCheck = sortedChecks.find((entry) => entry.ok)?.checkedAt;
  const lastCheckedAt = toIsoOrUndefined(linkHealth.lastCheckedAt) ?? sortedChecks[0]?.checkedAt;

  return {
    lastCheckedAt,
    lastSuccessfulCheckAt: toIsoOrUndefined(linkHealth.lastSuccessfulCheckAt) ?? latestSuccessfulCheck,
    recentChecks: sortedChecks.slice(0, 20),
  };
}

function fallbackLinkHealthFromDeployments(project: ProjectConfig): LinkHealth | undefined {
  const latestDeployment = project.deployments?.[0];
  if (!latestDeployment?.createdAt) {
    return undefined;
  }

  const normalizedCreatedAt = toIsoOrUndefined(latestDeployment.createdAt);
  if (!normalizedCreatedAt) {
    return undefined;
  }

  const wasSuccessful = latestDeployment.status !== 'failed';
  return {
    lastCheckedAt: normalizedCreatedAt,
    lastSuccessfulCheckAt: wasSuccessful ? normalizedCreatedAt : undefined,
    recentChecks: [
      {
        checkedAt: normalizedCreatedAt,
        ok: wasSuccessful,
      },
    ],
  };
}

function computeStale(linkHealth: LinkHealth | undefined, now: Date, staleAfterHours: number): boolean {
  const lastSuccessfulCheckAt = linkHealth?.lastSuccessfulCheckAt;
  if (!lastSuccessfulCheckAt) {
    return true;
  }

  const successfulTimestamp = new Date(lastSuccessfulCheckAt).valueOf();
  if (Number.isNaN(successfulTimestamp)) {
    return true;
  }

  const staleThresholdMs = staleAfterHours * 60 * 60 * 1000;
  return now.valueOf() - successfulTimestamp > staleThresholdMs;
}

export function applyProjectFreshness(
  project: ProjectConfig,
  options?: {
    now?: Date;
    staleAfterHours?: number;
  },
): ProjectConfig {
  const now = options?.now ?? new Date();
  const staleAfterHours = options?.staleAfterHours ?? DEFAULT_STALE_AFTER_HOURS;
  const linkHealth = normalizeLinkHealth(project.linkHealth) ?? fallbackLinkHealthFromDeployments(project);
  const stale = computeStale(linkHealth, now, staleAfterHours);

  return {
    ...project,
    linkHealth,
    stale,
  };
}

export function hydrateProjectsWithFreshness(projects: ProjectConfig[], now = new Date()): ProjectConfig[] {
  return projects.map((project) => applyProjectFreshness(project, { now }));
}
