import { projects } from '../data/projects';

const REQUEST_TIMEOUT_MS = 10000;

type ValidationError = {
  projectId: string;
  reason: string;
};

const isExternalAbsoluteUrl = (value: string): boolean => {
  try {
    const parsed = new URL(value);
    return (parsed.protocol === 'http:' || parsed.protocol === 'https:') && Boolean(parsed.hostname);
  } catch {
    return false;
  }
};

const fetchWithTimeout = async (url: string, method: 'HEAD' | 'GET') => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, {
      method,
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'user-agent': 'project-registry-validator/1.0',
      },
    });
  } finally {
    clearTimeout(timeout);
  }
};

const validateLiveUrl = async (projectId: string, url: string): Promise<ValidationError | null> => {
  if (!isExternalAbsoluteUrl(url)) {
    return { projectId, reason: `Invalid external absolute URL: ${url}` };
  }

  try {
    let response = await fetchWithTimeout(url, 'HEAD');
    if (response.status === 405 || response.status === 501) {
      response = await fetchWithTimeout(url, 'GET');
    }

    if (response.status >= 400) {
      return { projectId, reason: `Live URL returned HTTP ${response.status}: ${url}` };
    }

    return null;
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    return { projectId, reason: `Live URL check failed (${reason}): ${url}` };
  }
};

const run = async () => {
  const errors: ValidationError[] = [];

  for (const project of projects) {
    if (!project.url) {
      errors.push({ projectId: project.id, reason: 'Missing required live URL.' });
      continue;
    }

    const error = await validateLiveUrl(project.id, project.url);
    if (error) errors.push(error);
  }

  if (errors.length > 0) {
    console.error('Project registry validation failed:');
    for (const error of errors) {
      console.error(`- [${error.projectId}] ${error.reason}`);
    }

    process.exit(1);
  }

  console.log(`Project registry validation passed for ${projects.length} projects.`);
};

void run();
