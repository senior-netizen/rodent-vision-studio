export type ProjectConfig = {
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

export const projectConfigs: ProjectConfig[] = [
  {
    id: 'jofe-platform',
    name: 'Job Opportunities For Everyone',
    slug: 'job-opportunities-for-everyone-platform',
    category: 'Employment Platform',
    role: 'Product Design + Full-Stack Engineering',
    links: {
      live: '/projects/jofe-platform'
    },
    problem: 'Job listings were fragmented across informal channels with no centralized, scalable data system.',
    architecture: ['Next.js App Router (SSR)', 'Supabase Auth + PostgREST API', 'PostgreSQL data layer', 'Vercel deployment edge network'],
    stack: ['Next.js (App Router)', 'Supabase', 'PostgreSQL', 'TailwindCSS', 'Vercel'],
    category: 'Employment Platform',
    status: 'live',
    deployments: [{ environment: 'production', url: 'https://jobsforeveryone.vercel.app', provider: 'Vercel' }],
    caseStudy: 'job-opportunities-for-everyone',
  },
  {
    id: 'feel-home',
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
    id: 'shedsense-grid',
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
    id: 'ar-experience',
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
    id: 'precise-locations-lib',
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

export const projectById = Object.fromEntries(projectConfigs.map((project) => [project.id, project])) as Record<ProjectConfig['id'], ProjectConfig>;

export const projectIdBySlug = Object.fromEntries(projectConfigs.map((project) => [project.slug, project.id])) as Record<ProjectConfig['slug'], ProjectConfig['id']>;
