export type ProjectStatus = 'live' | 'maintenance' | 'sunset' | 'beta';

export type DeploymentVersion = {
  label: string;
  releasedAt: string;
  notes?: string;
};

export type ProjectDeployment = {
  environment: 'production' | 'staging' | 'preview';
  url: string;
  provider?: string;
  region?: string;
};

export type Project = {
  id: string;
  name: string;
  url: string;
  preview: string;
  stack: string[];
  category: string;
  versions?: DeploymentVersion[];
  deployments?: ProjectDeployment[];
  status?: ProjectStatus;
  caseStudy?: string;
};

const ensureExternalAbsoluteUrl = (value: string, field: string) => {
  let parsed: URL;

  try {
    parsed = new URL(value);
  } catch {
    throw new Error(`[project-registry] ${field} must be an absolute URL. Received: ${value}`);
  }

  const isHttp = parsed.protocol === 'http:' || parsed.protocol === 'https:';
  const hasHost = Boolean(parsed.hostname);

  if (!isHttp || !hasHost) {
    throw new Error(`[project-registry] ${field} must be an external http(s) URL. Received: ${value}`);
  }
};

export const projects: Project[] = [
  {
    id: 'job-opportunities-for-everyone',
    name: 'Job Opportunities For Everyone',
    url: 'https://jobsforeveryone.vercel.app',
    preview: '/visuals/sheq-preview.jpg',
    stack: ['Next.js (App Router)', 'Supabase', 'PostgreSQL', 'TailwindCSS', 'Vercel'],
    category: 'Employment Platform',
    status: 'live',
    deployments: [{ environment: 'production', url: 'https://jobsforeveryone.vercel.app', provider: 'Vercel' }],
    caseStudy: 'job-opportunities-for-everyone',
  },
  {
    id: 'feel-at-home',
    name: 'Feel At Home',
    url: 'https://feelathome.vercel.app',
    preview: '/visuals/meterflow-preview.jpg',
    stack: ['Next.js', 'TypeScript', 'React Query', 'PostgreSQL', 'Tailwind CSS'],
    category: 'PropTech Platform',
    status: 'live',
    deployments: [{ environment: 'production', url: 'https://feelathome.vercel.app', provider: 'Vercel' }],
    caseStudy: 'feel-at-home',
  },
  {
    id: 'shedsense',
    name: 'ShedSense',
    url: 'https://backend-nl4r.onrender.com',
    preview: '/visuals/sh.png',
    stack: ['Next.js 14', 'TypeScript', 'Three.js', 'Framer Motion', 'PostgreSQL'],
    category: 'Grid Intelligence',
    status: 'live',
    deployments: [{ environment: 'production', url: 'https://backend-nl4r.onrender.com', provider: 'Render' }],
    caseStudy: 'shedsense',
  },
  {
    id: 'ar-by-rodent',
    name: 'AR by Rodent',
    url: 'https://arbyrodent.vercel.app',
    preview: '/visuals/sheq-preview.jpg',
    stack: ['Next.js', 'TypeScript', 'Framer Motion', 'WebGL', 'CSS Effects'],
    category: 'AR Experience',
    status: 'live',
    deployments: [{ environment: 'production', url: 'https://arbyrodent.vercel.app', provider: 'Vercel' }],
    caseStudy: 'ar-by-rodent',
  },
  {
    id: 'precise-locations',
    name: 'Precise Locations',
    url: 'https://github.com/anesu398/precise-locations',
    preview: '/visuals/kwiksend-preview.jpg',
    stack: ['Node.js', 'TypeScript', 'npm', 'GitHub Actions', 'Semantic Versioning'],
    category: 'Geospatial Package',
    status: 'live',
    deployments: [{ environment: 'production', url: 'https://www.npmjs.com/package/precise-locations', provider: 'npm' }],
    caseStudy: 'precise-locations',
    versions: [{ label: 'v1', releasedAt: '2025-01-01', notes: 'Initial stable release' }],
  },
];

for (const project of projects) {
  ensureExternalAbsoluteUrl(project.url, `${project.id}.url`);

  for (const [index, deployment] of (project.deployments ?? []).entries()) {
    ensureExternalAbsoluteUrl(deployment.url, `${project.id}.deployments[${index}].url`);
  }
}

export const projectById = Object.fromEntries(projects.map((project) => [project.id, project])) as Record<string, Project>;
