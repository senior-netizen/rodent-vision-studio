import {
  createWebhookAlertHook,
  runProjectRegistryValidation,
} from '../lib/projects/health';

async function run() {
  const webhookUrl = process.env.PROJECT_REGISTRY_ALERT_WEBHOOK_URL;
  const alertHook = webhookUrl ? createWebhookAlertHook(webhookUrl) : undefined;

  const result = await runProjectRegistryValidation({ alertHook });

  if (result.errors.length > 0) {
    console.error(`Scheduled project registry check completed with ${result.errors.length} error(s).`);
    for (const error of result.errors) {
      console.error(`- [${error.projectId}] ${error.reason}`);
    }
  } else {
    console.log(`Scheduled project registry check succeeded at ${result.checkedAt}.`);
  }

  if (result.drift.missingInRegistry.length > 0 || result.drift.unknownInRegistry.length > 0) {
    console.warn('Project registry drift detected.');
    console.warn(`- Missing in registry: ${result.drift.missingInRegistry.join(', ') || 'none'}`);
    console.warn(`- Unknown in registry: ${result.drift.unknownInRegistry.join(', ') || 'none'}`);
  }
}

void run();
