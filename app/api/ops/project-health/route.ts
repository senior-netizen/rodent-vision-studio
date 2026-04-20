import { NextResponse } from 'next/server';
import {
  createWebhookAlertHook,
  runProjectRegistryValidation,
} from '@/lib/projects/health';

function isAuthorized(request: Request): boolean {
  const token = process.env.PROJECT_REGISTRY_CRON_TOKEN;
  if (!token) {
    return true;
  }

  const bearer = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim();
  return bearer === token;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized scheduler invocation.' }, { status: 401 });
  }

  const webhookUrl = process.env.PROJECT_REGISTRY_ALERT_WEBHOOK_URL;
  const alertHook = webhookUrl ? createWebhookAlertHook(webhookUrl) : undefined;

  const result = await runProjectRegistryValidation({ alertHook });

  return NextResponse.json({
    ok: result.errors.length === 0,
    checkedAt: result.checkedAt,
    errorCount: result.errors.length,
    errors: result.errors,
    drift: result.drift,
  });
}
