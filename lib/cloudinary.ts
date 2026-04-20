import crypto from 'node:crypto';

export type CloudinaryUploadResult = {
  imageUrl: string;
  publicId: string;
};

export type CloudinaryErrorCategory = 'retryable' | 'permanent' | 'auth' | 'rate_limited';

export type CloudinaryUploadAttemptMetadata = {
  correlationId: string;
  projectId: string;
  attempt: number;
  startedAt: string;
  finishedAt: string;
  category: CloudinaryErrorCategory | 'success';
  terminalReason: string;
  statusCode?: number;
  retryScheduledMs?: number;
};

type CloudinarySuccessResponse = {
  secure_url: string;
  public_id: string;
};

type UploadRetryConfig = {
  maxAttempts: number;
  baseDelayMs: number;
  maxDelayMs: number;
  jitterMs: number;
  attemptTimeoutMs: number;
  totalDeadlineMs: number;
};

export class CloudinaryUploadError extends Error {
  readonly category: CloudinaryErrorCategory;
  readonly statusCode?: number;
  readonly correlationId: string;

  constructor(input: {
    message: string;
    category: CloudinaryErrorCategory;
    correlationId: string;
    statusCode?: number;
  }) {
    super(input.message);
    this.name = 'CloudinaryUploadError';
    this.category = input.category;
    this.statusCode = input.statusCode;
    this.correlationId = input.correlationId;
  }
}

function getCloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new CloudinaryUploadError({
      message: 'Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.',
      category: 'permanent',
      correlationId: 'missing-correlation-id',
    });
  }

  return { cloudName, apiKey, apiSecret };
}

function signUploadParams(params: Record<string, string>, apiSecret: string) {
  const serializedParams = Object.entries(params)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return crypto.createHash('sha1').update(`${serializedParams}${apiSecret}`).digest('hex');
}

function getRetryConfig(): UploadRetryConfig {
  return {
    maxAttempts: 4,
    baseDelayMs: 250,
    maxDelayMs: 4_000,
    jitterMs: 250,
    attemptTimeoutMs: 10_000,
    totalDeadlineMs: 30_000,
  };
}

function isRetryableError(error: unknown): boolean {
  if (error instanceof DOMException && error.name === 'AbortError') {
    return true;
  }

  return error instanceof TypeError;
}

function classifyStatus(statusCode: number): CloudinaryErrorCategory {
  if (statusCode === 401 || statusCode === 403) {
    return 'auth';
  }

  if (statusCode === 429) {
    return 'rate_limited';
  }

  if (statusCode >= 500) {
    return 'retryable';
  }

  return 'permanent';
}

function toTerminalReason(value: unknown): string {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim();
  }

  if (value instanceof Error && value.message.trim().length > 0) {
    return value.message;
  }

  return 'unknown_error';
}

function computeBackoffMs(attempt: number, config: UploadRetryConfig): number {
  const expDelay = Math.min(config.maxDelayMs, config.baseDelayMs * (2 ** (attempt - 1)));
  const jitter = Math.floor(Math.random() * config.jitterMs);
  return expDelay + jitter;
}

async function delay(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

function toUploadError(input: {
  category: CloudinaryErrorCategory;
  statusCode?: number;
  correlationId: string;
  reason: string;
}): CloudinaryUploadError {
  return new CloudinaryUploadError({
    message: `Cloudinary upload failed [${input.category}]: ${input.reason}`,
    category: input.category,
    statusCode: input.statusCode,
    correlationId: input.correlationId,
  });
}

export async function uploadPreviewBuffer(input: {
  projectId: string;
  buffer: Buffer;
  correlationId: string;
  capturedAt: string;
  recordAttempt?: (metadata: CloudinaryUploadAttemptMetadata) => Promise<void> | void;
}): Promise<CloudinaryUploadResult> {
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  const retryConfig = getRetryConfig();
  const deadlineAt = Date.now() + retryConfig.totalDeadlineMs;
  const safeProjectId = input.projectId.replace(/[^a-zA-Z0-9_-]/g, '-');
  const publicId = `portfolio-previews/${safeProjectId}/${Date.now()}`;

  let lastError: CloudinaryUploadError | null = null;

  for (let attempt = 1; attempt <= retryConfig.maxAttempts; attempt += 1) {
    const now = Date.now();
    const remainingMs = deadlineAt - now;

    if (remainingMs <= 0) {
      const error = toUploadError({
        category: 'retryable',
        correlationId: input.correlationId,
        reason: 'global deadline exceeded before next attempt',
      });

      await input.recordAttempt?.({
        correlationId: input.correlationId,
        projectId: input.projectId,
        attempt,
        startedAt: new Date(now).toISOString(),
        finishedAt: new Date().toISOString(),
        category: error.category,
        terminalReason: error.message,
      });

      throw error;
    }

    const timestamp = Math.floor(Date.now() / 1_000);
    const signedParams = {
      folder: `portfolio-previews/${safeProjectId}`,
      public_id: publicId,
      timestamp: String(timestamp),
      context: `correlation_id=${input.correlationId}|captured_at=${input.capturedAt}`,
      overwrite: 'true',
      resource_type: 'image',
    };

    const signature = signUploadParams(signedParams, apiSecret);
    const form = new FormData();
    form.append('file', new Blob([new Uint8Array(input.buffer)], { type: 'image/png' }), `${safeProjectId}.png`);
    form.append('api_key', apiKey);
    form.append('timestamp', String(timestamp));
    form.append('signature', signature);
    form.append('folder', signedParams.folder);
    form.append('public_id', signedParams.public_id);
    form.append('context', signedParams.context);
    form.append('overwrite', signedParams.overwrite);
    form.append('resource_type', signedParams.resource_type);

    const attemptTimeoutMs = Math.min(retryConfig.attemptTimeoutMs, remainingMs);
    const attemptStart = new Date().toISOString();
    const abortController = new AbortController();
    const timeout = setTimeout(() => abortController.abort(), attemptTimeoutMs);

    try {
      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: form,
        signal: abortController.signal,
      });

      if (!response.ok) {
        const statusCategory = classifyStatus(response.status);
        const errorText = await response.text();
        const retryable = statusCategory === 'retryable' || statusCategory === 'rate_limited';

        const error = toUploadError({
          category: statusCategory,
          statusCode: response.status,
          correlationId: input.correlationId,
          reason: `${response.status} ${toTerminalReason(errorText)}`,
        });

        if (retryable && attempt < retryConfig.maxAttempts) {
          const retryDelayMs = computeBackoffMs(attempt, retryConfig);
          await input.recordAttempt?.({
            correlationId: input.correlationId,
            projectId: input.projectId,
            attempt,
            startedAt: attemptStart,
            finishedAt: new Date().toISOString(),
            category: error.category,
            statusCode: response.status,
            terminalReason: error.message,
            retryScheduledMs: retryDelayMs,
          });

          await delay(retryDelayMs);
          lastError = error;
          continue;
        }

        await input.recordAttempt?.({
          correlationId: input.correlationId,
          projectId: input.projectId,
          attempt,
          startedAt: attemptStart,
          finishedAt: new Date().toISOString(),
          category: error.category,
          statusCode: response.status,
          terminalReason: error.message,
        });

        throw error;
      }

      const payload = (await response.json()) as Partial<CloudinarySuccessResponse>;
      if (!payload.secure_url || !payload.public_id) {
        const error = toUploadError({
          category: 'permanent',
          correlationId: input.correlationId,
          reason: 'missing secure_url or public_id',
        });

        await input.recordAttempt?.({
          correlationId: input.correlationId,
          projectId: input.projectId,
          attempt,
          startedAt: attemptStart,
          finishedAt: new Date().toISOString(),
          category: error.category,
          terminalReason: error.message,
        });

        throw error;
      }

      await input.recordAttempt?.({
        correlationId: input.correlationId,
        projectId: input.projectId,
        attempt,
        startedAt: attemptStart,
        finishedAt: new Date().toISOString(),
        category: 'success',
        terminalReason: 'upload_completed',
      });

      return {
        imageUrl: payload.secure_url,
        publicId: payload.public_id,
      };
    } catch (error) {
      const shouldRetry = isRetryableError(error);
      const baseError = error instanceof CloudinaryUploadError
        ? error
        : toUploadError({
          category: shouldRetry ? 'retryable' : 'permanent',
          correlationId: input.correlationId,
          reason: toTerminalReason(error),
        });

      if (shouldRetry && attempt < retryConfig.maxAttempts) {
        const retryDelayMs = computeBackoffMs(attempt, retryConfig);
        await input.recordAttempt?.({
          correlationId: input.correlationId,
          projectId: input.projectId,
          attempt,
          startedAt: attemptStart,
          finishedAt: new Date().toISOString(),
          category: baseError.category,
          statusCode: baseError.statusCode,
          terminalReason: baseError.message,
          retryScheduledMs: retryDelayMs,
        });

        await delay(retryDelayMs);
        lastError = baseError;
        continue;
      }

      if (!(error instanceof CloudinaryUploadError)) {
        await input.recordAttempt?.({
          correlationId: input.correlationId,
          projectId: input.projectId,
          attempt,
          startedAt: attemptStart,
          finishedAt: new Date().toISOString(),
          category: baseError.category,
          statusCode: baseError.statusCode,
          terminalReason: baseError.message,
        });
      }

      throw baseError;
    } finally {
      clearTimeout(timeout);
    }
  }

  throw lastError ?? toUploadError({
    category: 'retryable',
    correlationId: input.correlationId,
    reason: 'retries exhausted',
  });
}
