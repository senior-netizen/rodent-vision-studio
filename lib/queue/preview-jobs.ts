import crypto from 'node:crypto';
import { setTimeout as sleep } from 'node:timers/promises';
import type { UpsertProjectPayload } from '@/lib/projects/contracts';

export type PreviewJobPayload = {
  projectSlug: string;
  sourceUrl: string;
  idempotencyKey: string;
  correlationId: string;
  payload: UpsertProjectPayload;
};

export type PreviewJob = {
  id: string;
  payload: PreviewJobPayload;
  attemptsMade: number;
};

export type ProcessPreviewJobHandler = (job: PreviewJob) => Promise<void>;

export type ProcessPreviewJobOptions = {
  concurrency?: number;
  maxAttempts?: number;
  pollWaitSeconds?: number;
};

export type PreviewWorkerHandle = {
  close: () => Promise<void>;
};

type SqsConfig = {
  queueUrl: string;
  deadLetterQueueUrl?: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
};

type ReceivedMessage = {
  MessageId: string;
  ReceiptHandle: string;
  Body?: string;
  Attributes?: {
    ApproximateReceiveCount?: string;
  };
};

function getSqsConfig(): SqsConfig {
  const queueUrl = process.env.PREVIEW_QUEUE_SQS_URL;
  const deadLetterQueueUrl = process.env.PREVIEW_QUEUE_SQS_DLQ_URL;
  const region = process.env.AWS_REGION;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const sessionToken = process.env.AWS_SESSION_TOKEN;

  if (!queueUrl || !region || !accessKeyId || !secretAccessKey) {
    throw new Error('SQS queue backend requires PREVIEW_QUEUE_SQS_URL, AWS_REGION, AWS_ACCESS_KEY_ID, and AWS_SECRET_ACCESS_KEY.');
  }

  return {
    queueUrl,
    deadLetterQueueUrl,
    region,
    accessKeyId,
    secretAccessKey,
    sessionToken,
  };
}

function encodeParams(params: Record<string, string>): string {
  return Object.entries(params)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

function sha256(input: string): string {
  return crypto.createHash('sha256').update(input, 'utf8').digest('hex');
}

function hmac(key: Buffer | string, value: string): Buffer {
  return crypto.createHmac('sha256', key).update(value, 'utf8').digest();
}

function deriveSigningKey(secret: string, dateStamp: string, region: string): Buffer {
  const kDate = hmac(`AWS4${secret}`, dateStamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, 'sqs');
  return hmac(kService, 'aws4_request');
}

function buildSignedHeaders(body: string, config: SqsConfig): Headers {
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
  const dateStamp = amzDate.slice(0, 8);
  const endpoint = new URL(config.queueUrl);

  const canonicalHeaders = [
    `content-type:application/x-www-form-urlencoded`,
    `host:${endpoint.host}`,
    `x-amz-date:${amzDate}`,
  ];

  if (config.sessionToken) {
    canonicalHeaders.push(`x-amz-security-token:${config.sessionToken}`);
  }

  const signedHeaders = config.sessionToken
    ? 'content-type;host;x-amz-date;x-amz-security-token'
    : 'content-type;host;x-amz-date';

  const canonicalRequest = [
    'POST',
    endpoint.pathname || '/',
    '',
    `${canonicalHeaders.sort().join('\n')}\n`,
    signedHeaders,
    sha256(body),
  ].join('\n');

  const credentialScope = `${dateStamp}/${config.region}/sqs/aws4_request`;
  const stringToSign = [
    'AWS4-HMAC-SHA256',
    amzDate,
    credentialScope,
    sha256(canonicalRequest),
  ].join('\n');

  const signature = crypto
    .createHmac('sha256', deriveSigningKey(config.secretAccessKey, dateStamp, config.region))
    .update(stringToSign, 'utf8')
    .digest('hex');

  const authorization = `AWS4-HMAC-SHA256 Credential=${config.accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Amz-Date': amzDate,
    Authorization: authorization,
  });

  if (config.sessionToken) {
    headers.set('X-Amz-Security-Token', config.sessionToken);
  }

  return headers;
}

async function callSqs(queueUrl: string, params: Record<string, string>, config: SqsConfig): Promise<string> {
  const body = encodeParams({
    Version: '2012-11-05',
    ...params,
  });

  const response = await fetch(queueUrl, {
    method: 'POST',
    headers: buildSignedHeaders(body, config),
    body,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`SQS call failed (${response.status}): ${text}`);
  }

  return response.text();
}

function parseTagValue(xml: string, tag: string): string | undefined {
  const match = xml.match(new RegExp(`<${tag}>([^<]+)</${tag}>`));
  return match?.[1];
}

function decodeXmlEntities(value: string): string {
  return value
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', '\'')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&amp;', '&');
}

function parseReceiveMessages(xml: string): ReceivedMessage[] {
  const matches = [...xml.matchAll(/<Message>([\s\S]*?)<\/Message>/g)];

  return matches.map((match) => {
    const fragment = match[1];
    return {
      MessageId: parseTagValue(fragment, 'MessageId') ?? '',
      ReceiptHandle: parseTagValue(fragment, 'ReceiptHandle') ?? '',
      Body: parseTagValue(fragment, 'Body'),
      Attributes: {
        ApproximateReceiveCount: parseTagValue(fragment, 'ApproximateReceiveCount'),
      },
    };
  });
}

function maybeDecodeBody(body: string): string {
  const unescaped = decodeXmlEntities(body);
  try {
    return decodeURIComponent(unescaped);
  } catch {
    return unescaped;
  }
}

export async function enqueuePreviewJob(payload: PreviewJobPayload): Promise<string> {
  const config = getSqsConfig();
  const messageBody = JSON.stringify(payload);
  const isFifo = config.queueUrl.endsWith('.fifo');

  const responseXml = await callSqs(config.queueUrl, {
    Action: 'SendMessage',
    MessageBody: messageBody,
    ...(isFifo
      ? {
        MessageGroupId: payload.projectSlug,
        MessageDeduplicationId: `${payload.idempotencyKey}:${payload.projectSlug}`,
      }
      : {}),
  }, config);

  return parseTagValue(responseXml, 'MessageId') ?? `${payload.idempotencyKey}:${payload.projectSlug}`;
}

export async function processPreviewJob(
  handler: ProcessPreviewJobHandler,
  options?: ProcessPreviewJobOptions,
): Promise<PreviewWorkerHandle> {
  const config = getSqsConfig();
  const maxAttempts = options?.maxAttempts ?? 5;
  const pollWaitSeconds = options?.pollWaitSeconds ?? 20;
  const concurrency = Math.max(1, options?.concurrency ?? 1);
  const controller = new AbortController();

  async function runWorkerLoop(workerIndex: number): Promise<void> {
    while (!controller.signal.aborted) {
      try {
        const responseXml = await callSqs(config.queueUrl, {
          Action: 'ReceiveMessage',
          WaitTimeSeconds: String(pollWaitSeconds),
          MaxNumberOfMessages: '1',
          VisibilityTimeout: '30',
          'AttributeName.1': 'ApproximateReceiveCount',
        }, config);

        const messages = parseReceiveMessages(responseXml);
        if (messages.length === 0) {
          continue;
        }

        for (const message of messages) {
          const body = message.Body ? maybeDecodeBody(message.Body) : null;
          if (!body) {
            continue;
          }

          const payload = JSON.parse(body) as PreviewJobPayload;
          const attemptsMade = Math.max(0, Number(message.Attributes?.ApproximateReceiveCount ?? '1') - 1);

          try {
            await handler({
              id: message.MessageId,
              payload,
              attemptsMade,
            });

            await callSqs(config.queueUrl, {
              Action: 'DeleteMessage',
              ReceiptHandle: message.ReceiptHandle,
            }, config);
          } catch (error) {
            if (attemptsMade + 1 >= maxAttempts && config.deadLetterQueueUrl) {
              await callSqs(config.deadLetterQueueUrl, {
                Action: 'SendMessage',
                MessageBody: JSON.stringify({
                  ...payload,
                  failedAt: new Date().toISOString(),
                  reason: error instanceof Error ? error.message : String(error),
                  workerIndex,
                }),
              }, config);

              await callSqs(config.queueUrl, {
                Action: 'DeleteMessage',
                ReceiptHandle: message.ReceiptHandle,
              }, config);
            }

            throw error;
          }
        }
      } catch {
        if (!controller.signal.aborted) {
          await sleep(1_000);
        }
      }
    }
  }

  const workerPromises = Array.from({ length: concurrency }, (_, index) => runWorkerLoop(index));

  return {
    close: async () => {
      controller.abort();
      await Promise.allSettled(workerPromises);
    },
  };
}
