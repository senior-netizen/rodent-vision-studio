import { promises as fs } from 'node:fs';
import path from 'node:path';
import { projectConfigs } from '../../data/projects';

const REGISTRY_PATH = path.join(process.cwd(), 'data', 'project-registry.json');
const REQUEST_TIMEOUT_MS = 10000;
const DEFAULT_STALE_AFTER_FAILURES = 3;
const DEFAULT_STALE_AFTER_SUCCESS_DAYS = 7;

export type ProjectHealthErrorClass =
  | 'http_error'
  | 'dns_error'
  | 'timeout'
  | 'tls_error'
  | 'network_error'
  | 'invalid_url'
  | 'unknown_error';

export type ProjectHealthSnapshot = {
  statusCode: number | null;
  checkedAt: string;
  latencyMs: number;
  errorClass: ProjectHealthErrorClass | null;
  consecutiveFailures: number;
  lastSuccessAt: string | null;
};

export type ProjectHealthState = ProjectHealthSnapshot & {
  isStale: boolean;
  staleReason: 'consecutive_failures' | 'no_recent_success' | null;
};

type ProjectPreviewMetadata = {
  publicId: string;
  capturedAt: string;
  sourceUrl: string;
  correlationId: string;
};

type ProjectRegistryRecord = {
  imageUrl?: string;
  metadata?: ProjectPreviewMetadata;
  updatedAt?: string;
  health?: ProjectHealthSnapshot;
};

type ProjectRegistry = {
  projects: Record<string, ProjectRegistryRecord>;
};

export type HealthPolicy = {
  staleAfterConsecutiveFailures: number;
  staleAfterNoSuccessDays: number;
};

export type RegistryAlertEvent =
  | {
      type: 'repeated_failures';
      projectId: string;
      failures: number;
      latestErrorClass: ProjectHealthErrorClass | null;
      statusCode: number | null;
      checkedAt: string;
    }
  | {
      type: 'registry_drift';
      missingInRegistry: string[];
      unknownInRegistry: string[];
      checkedAt: string;
    };

export type AlertHook = (event: RegistryAlertEvent) => Promise<void>;

export type ProjectValidationError = {
  projectId: string;
  reason: string;
};

export type ValidationResult = {
  checkedAt: string;
  errors: ProjectValidationError[];
  drift: {
    missingInRegistry: string[];
    unknownInRegistry: string[];
  };
};

function parsePolicy(): HealthPolicy {
  const staleAfterConsecutiveFailures = Number(process.env.PROJECT_HEALTH_STALE_FAILURES ?? DEFAULT_STALE_AFTER_FAILURES);
  const staleAfterNoSuccessDays = Number(process.env.PROJECT_HEALTH_STALE_DAYS ?? DEFAULT_STALE_AFTER_SUCCESS_DAYS);

  return {
    staleAfterConsecutiveFailures:
      Number.isFinite(staleAfterConsecutiveFailures) && staleAfterConsecutiveFailures > 0
        ? staleAfterConsecutiveFailures
        : DEFAULT_STALE_AFTER_FAILURES,
    staleAfterNoSuccessDays:
      Number.isFinite(staleAfterNoSuccessDays) && staleAfterNoSuccessDays > 0
        ? staleAfterNoSuccessDays
        : DEFAULT_STALE_AFTER_SUCCESS_DAYS,
  };
}

function isExternalAbsoluteUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return (parsed.protocol === 'http:' || parsed.protocol === 'https:') && parsed.hostname.length > 0;
  } catch {
    return false;
  }
}

function classifyError(error: unknown): ProjectHealthErrorClass {
  if (!(error instanceof Error)) {
    return 'unknown_error';
  }

  if (error.name === 'AbortError') return 'timeout';

  const message = error.message.toLowerCase();
  if (message.includes('timed out')) return 'timeout';
  if (message.includes('dns') || message.includes('enotfound')) return 'dns_error';
  if (message.includes('tls') || message.includes('certificate')) return 'tls_error';

  return 'network_error';
}

async function fetchWithTimeout(url: string, method: 'HEAD' | 'GET') {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, {
      method,
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'user-agent': 'project-registry-validator/2.0',
      },
      cache: 'no-store',
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function readRegistry(): Promise<ProjectRegistry> {
  try {
    const contents = await fs.readFile(REGISTRY_PATH, 'utf8');
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
  await fs.mkdir(path.dirname(REGISTRY_PATH), { recursive: true });
  await fs.writeFile(REGISTRY_PATH, JSON.stringify(registry, null, 2), 'utf8');
}

function evaluateStaleState(snapshot: ProjectHealthSnapshot | undefined, policy: HealthPolicy): ProjectHealthState | null {
  if (!snapshot) return null;

  const now = Date.now();
  const lastSuccessAtMs = snapshot.lastSuccessAt ? new Date(snapshot.lastSuccessAt).valueOf() : null;
  const staleAfterNoSuccessMs = policy.staleAfterNoSuccessDays * 24 * 60 * 60 * 1000;

  const staleByFailures = snapshot.consecutiveFailures >= policy.staleAfterConsecutiveFailures;
  const staleByNoSuccess = lastSuccessAtMs === null || now - lastSuccessAtMs >= staleAfterNoSuccessMs;

  const staleReason = staleByFailures
    ? 'consecutive_failures'
    : staleByNoSuccess
      ? 'no_recent_success'
      : null;

  return {
    ...snapshot,
    isStale: Boolean(staleReason),
    staleReason,
  };
}

async function checkProject(projectId: string, url: string | undefined, previous: ProjectHealthSnapshot | undefined): Promise<{ error: ProjectValidationError | null; snapshot: ProjectHealthSnapshot }> {
  const checkedAt = new Date().toISOString();

  if (!url) {
    const failureCount = (previous?.consecutiveFailures ?? 0) + 1;
    return {
      error: { projectId, reason: 'Missing required live URL.' },
      snapshot: {
        statusCode: null,
        checkedAt,
        latencyMs: 0,
        errorClass: 'invalid_url',
        consecutiveFailures: failureCount,
        lastSuccessAt: previous?.lastSuccessAt ?? null,
      },
    };
  }

  if (!isExternalAbsoluteUrl(url)) {
    const failureCount = (previous?.consecutiveFailures ?? 0) + 1;
    return {
      error: { projectId, reason: `Invalid external absolute URL: ${url}` },
      snapshot: {
        statusCode: null,
        checkedAt,
        latencyMs: 0,
        errorClass: 'invalid_url',
        consecutiveFailures: failureCount,
        lastSuccessAt: previous?.lastSuccessAt ?? null,
      },
    };
  }

  const startedAt = Date.now();

  try {
    let response = await fetchWithTimeout(url, 'HEAD');
    if (response.status === 405 || response.status === 501) {
      response = await fetchWithTimeout(url, 'GET');
    }

    const latencyMs = Date.now() - startedAt;
    if (response.status >= 400) {
      return {
        error: { projectId, reason: `Live URL returned HTTP ${response.status}: ${url}` },
        snapshot: {
          statusCode: response.status,
          checkedAt,
          latencyMs,
          errorClass: 'http_error',
          consecutiveFailures: (previous?.consecutiveFailures ?? 0) + 1,
          lastSuccessAt: previous?.lastSuccessAt ?? null,
        },
      };
    }

    return {
      error: null,
      snapshot: {
        statusCode: response.status,
        checkedAt,
        latencyMs,
        errorClass: null,
        consecutiveFailures: 0,
        lastSuccessAt: checkedAt,
      },
    };
  } catch (error) {
    return {
      error: {
        projectId,
        reason: `Live URL check failed (${error instanceof Error ? error.message : String(error)}): ${url}`,
      },
      snapshot: {
        statusCode: null,
        checkedAt,
        latencyMs: Date.now() - startedAt,
        errorClass: classifyError(error),
        consecutiveFailures: (previous?.consecutiveFailures ?? 0) + 1,
        lastSuccessAt: previous?.lastSuccessAt ?? null,
      },
    };
  }
}

function getRegistryDrift(registry: ProjectRegistry): ValidationResult['drift'] {
  const configuredIds = new Set<string>(projectConfigs.map((project) => String(project.id)));
  const registryIds = new Set(Object.keys(registry.projects));

  const missingInRegistry = [...configuredIds].filter((id) => !registryIds.has(id));
  const unknownInRegistry = [...registryIds].filter((id) => !configuredIds.has(id));

  return { missingInRegistry, unknownInRegistry };
}

export async function runProjectRegistryValidation(options?: { alertHook?: AlertHook }): Promise<ValidationResult> {
  const policy = parsePolicy();
  const registry = await readRegistry();
  const errors: ProjectValidationError[] = [];
  const checkedAt = new Date().toISOString();

  for (const project of projectConfigs) {
    const previous = registry.projects[project.id]?.health;
    const { error, snapshot } = await checkProject(project.id, project.url, previous);

    registry.projects[project.id] = {
      ...registry.projects[project.id],
      health: snapshot,
      updatedAt: checkedAt,
    };

    if (error) {
      errors.push(error);
      if (snapshot.consecutiveFailures >= policy.staleAfterConsecutiveFailures) {
        await options?.alertHook?.({
          type: 'repeated_failures',
          projectId: project.id,
          failures: snapshot.consecutiveFailures,
          latestErrorClass: snapshot.errorClass,
          statusCode: snapshot.statusCode,
          checkedAt,
        });
      }
    }
  }

  const drift = getRegistryDrift(registry);
  if (drift.missingInRegistry.length > 0 || drift.unknownInRegistry.length > 0) {
    await options?.alertHook?.({
      type: 'registry_drift',
      missingInRegistry: drift.missingInRegistry,
      unknownInRegistry: drift.unknownInRegistry,
      checkedAt,
    });
  }

  await writeRegistry(registry);

  return { checkedAt, errors, drift };
}

export async function getProjectHealthById(): Promise<Record<string, ProjectHealthState>> {
  const registry = await readRegistry();
  const policy = parsePolicy();
  const result: Record<string, ProjectHealthState> = {};

  for (const project of projectConfigs) {
    const evaluated = evaluateStaleState(registry.projects[project.id]?.health, policy);
    if (evaluated) {
      result[project.id] = evaluated;
    }
  }

  return result;
}

export function createWebhookAlertHook(webhookUrl: string): AlertHook {
  return async (event) => {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        console.error(`Project registry alert webhook failed with status ${response.status}`);
      }
    } catch (error) {
      console.error('Project registry alert webhook failed.', error);
    }
  };
}
