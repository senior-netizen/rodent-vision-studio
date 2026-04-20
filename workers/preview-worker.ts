import { uploadPreviewBuffer } from '@/lib/cloudinary';
import { logStructured, logStructuredError } from '@/lib/observability/logger';
import { composeProjectConfig } from '@/lib/projects/contracts';
import { getProjectBySlug, upsertProject } from '@/lib/projects/store';
import { processPreviewJob, type PreviewJob } from '@/lib/queue/preview-jobs';
import { updateProjectPreview } from '@/lib/project-registry';

async function capturePreviewSource(sourceUrl: string): Promise<{ buffer: Buffer; capturedAt: string }> {
  const response = await fetch(sourceUrl);
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Preview capture failed: ${response.status} ${body}`);
  }

  const capturedAt = new Date().toISOString();
  const arrayBuffer = await response.arrayBuffer();

  return {
    buffer: Buffer.from(arrayBuffer),
    capturedAt,
  };
}

async function handlePreviewJob(job: PreviewJob): Promise<void> {
  const { payload, id } = job;

  logStructured({
    event: 'preview.job.started',
    message: 'Starting preview job.',
    correlationId: payload.correlationId,
    idempotencyKey: payload.idempotencyKey,
    projectSlug: payload.projectSlug,
    jobId: id,
    attemptsMade: job.attemptsMade,
  });

  const { buffer, capturedAt } = await capturePreviewSource(payload.sourceUrl);
  const upload = await uploadPreviewBuffer({
    projectId: payload.projectSlug,
    buffer,
    capturedAt,
    correlationId: payload.correlationId,
  });

  await updateProjectPreview(payload.projectSlug, upload.imageUrl, {
    publicId: upload.publicId,
    capturedAt,
    sourceUrl: payload.sourceUrl,
    correlationId: payload.correlationId,
  });

  const current = getProjectBySlug(payload.projectSlug);
  const updatedProject = composeProjectConfig({
    current,
    payload: payload.payload,
    previewUrl: upload.imageUrl,
    previewGeneratedAt: capturedAt,
  });

  upsertProject(updatedProject);

  logStructured({
    event: 'preview.job.completed',
    message: 'Preview job completed successfully.',
    correlationId: payload.correlationId,
    idempotencyKey: payload.idempotencyKey,
    projectSlug: payload.projectSlug,
    jobId: id,
    uploadedPublicId: upload.publicId,
  });
}

async function bootstrap() {
  const worker = await processPreviewJob(async (job) => {
    try {
      await handlePreviewJob(job);
    } catch (error) {
      logStructuredError({
        event: 'preview.job.failed',
        message: 'Preview job failed and will be retried or dead-lettered.',
        correlationId: job.payload.correlationId,
        idempotencyKey: job.payload.idempotencyKey,
        projectSlug: job.payload.projectSlug,
        jobId: job.id,
        error,
      });
      throw error;
    }
  });

  const shutdown = async () => {
    await worker.close();
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

bootstrap().catch((error) => {
  logStructuredError({
    event: 'preview.worker.bootstrap.failed',
    message: 'Failed to bootstrap preview worker.',
    correlationId: 'system',
    error,
  });
  process.exit(1);
});
