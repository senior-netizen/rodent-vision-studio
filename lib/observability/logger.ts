export type LogLevel = 'info' | 'warn' | 'error';

export type StructuredLog = {
  level?: LogLevel;
  event: string;
  message: string;
  correlationId: string;
  idempotencyKey?: string;
  projectSlug?: string;
  [key: string]: unknown;
};

function safeError(error: unknown): Record<string, unknown> {
  if (!(error instanceof Error)) {
    return { error: String(error) };
  }

  return {
    errorName: error.name,
    errorMessage: error.message,
    errorStack: error.stack,
  };
}

export function logStructured(input: StructuredLog): void {
  const { level = 'info', ...log } = input;

  const payload = {
    timestamp: new Date().toISOString(),
    level,
    ...log,
  };

  const line = JSON.stringify(payload);
  if (level === 'error') {
    console.error(line);
    return;
  }

  if (level === 'warn') {
    console.warn(line);
    return;
  }

  console.log(line);
}

export function logStructuredError(input: Omit<StructuredLog, 'level'> & { error: unknown }): void {
  const { error, ...log } = input;
  const errorDetails = safeError(error);
  logStructured({ ...(log as StructuredLog), level: 'error', ...errorDetails });
}
