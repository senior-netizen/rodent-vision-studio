import { promises as fs } from 'node:fs';
import path from 'node:path';

export type ProjectPreviewMetadata = {
  publicId: string;
  capturedAt: string;
  sourceUrl: string;
  correlationId: string;
};

type ProjectPreviewRecord = {
  imageUrl: string;
  metadata: ProjectPreviewMetadata;
  updatedAt: string;
};

type ProjectRegistry = {
  projects: Record<string, ProjectPreviewRecord>;
};

const registryPath = path.join(process.cwd(), 'data', 'project-registry.json');

async function readRegistry(): Promise<ProjectRegistry> {
  try {
    const contents = await fs.readFile(registryPath, 'utf8');
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
  await fs.mkdir(path.dirname(registryPath), { recursive: true });
  await fs.writeFile(registryPath, JSON.stringify(registry, null, 2), 'utf8');
}

export async function updateProjectPreview(projectId: string, imageUrl: string, metadata: ProjectPreviewMetadata) {
  const registry = await readRegistry();

  registry.projects[projectId] = {
    imageUrl,
    metadata,
    updatedAt: new Date().toISOString(),
  };

  await writeRegistry(registry);
}
