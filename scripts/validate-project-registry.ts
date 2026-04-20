import { runProjectRegistryValidation } from '../lib/projects/health';

async function run() {
  const result = await runProjectRegistryValidation();

  if (result.errors.length > 0) {
    console.error('Project registry validation failed:');
    for (const error of result.errors) {
      console.error(`- [${error.projectId}] ${error.reason}`);
    }

    if (result.drift.missingInRegistry.length > 0 || result.drift.unknownInRegistry.length > 0) {
      console.error('Registry drift detected:');
      console.error(`- Missing in registry: ${result.drift.missingInRegistry.join(', ') || 'none'}`);
      console.error(`- Unknown in registry: ${result.drift.unknownInRegistry.join(', ') || 'none'}`);
    }

    process.exit(1);
  }

  console.log(`Project registry validation passed at ${result.checkedAt}.`);
}

void run();
