export type DeploymentStatus = 'live' | 'staging' | 'failed';

export type ProjectDeployment = {
  version: string;
  url: string;
  createdAt: string;
  status: DeploymentStatus;
};

export type PreviewStatus = 'pending' | 'ready' | 'failed';

export type PreviewState = {
  status: PreviewStatus;
  lastError?: string;
  attemptCount: number;
  requestedAt?: string;
  generatedAt?: string;
  failedAt?: string;
  updatedAt: string;
};

export type ProjectConfig = {
  id?: string;
  slug?: string;
  name: string;
  category?: string;
  role?: string;
  links?: {
    live?: string;
    repo?: string;
  };
  problem?: string;
  architecture?: string[];
  url?: string;
  preview?: string;
  stack: string[];
  dataFlow: string[];
  decisions: string[];
  visuals: {
    screenshot: string;
    diagram: string;
    preview: string;
  };
  previewGeneratedAt?: string;
  previewState?: PreviewState;
  status?: DeploymentStatus;
  deployments?: ProjectDeployment[];
  outcome: string;
  summary: {
    scope: string;
    timeline: string;
    primaryKpi: string;
  };
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
    dataFlow: ['Submission Form → Validation', 'Validation → Supabase API', 'Supabase API → PostgreSQL', 'PostgreSQL → SSR Job Pages'],
    decisions: ['Prioritized mobile-first interaction patterns for accessibility.', 'Structured listings and submissions to support data ownership and scale.'],
    visuals: { screenshot: '/visuals/sheq-ui.jpg', diagram: '/visuals/sheq-architecture.jpg', preview: '/visuals/sheq-preview.jpg' },
    previewGeneratedAt: '2026-04-20T00:00:00.000Z',
    status: 'live',
    deployments: [
      { version: '1.0.0', url: '/projects/job-opportunities-for-everyone-platform', createdAt: '2026-04-20T00:00:00.000Z', status: 'live' },
    ],
    outcome: 'Established a centralized job platform with a scalable intake and publishing foundation.',
    summary: {
      scope: 'End-to-end architecture and case study execution for employment distribution platform.',
      timeline: '6-week design and build cycle.',
      primaryKpi: 'Centralized listing access with reduced channel fragmentation.',
    }
  },
  {
    id: 'feel-home',
    name: 'Feel At Home',
    url: 'https://feelathome.vercel.app',
    preview: '/visuals/meterflow-preview.jpg',
    stack: ['Next.js', 'TypeScript', 'React Query', 'PostgreSQL', 'Tailwind CSS'],
    dataFlow: ['User Query → Search Index', 'Search Index → Property Catalog', 'Catalog → Listing Detail', 'Listing Events → Agent Dashboard'],
    decisions: ['Kept property lookup paths index-first for responsive browsing.', 'Separated listing write access behind authenticated publisher flows.'],
    visuals: { screenshot: '/visuals/meterflow-ui.jpg', diagram: '/visuals/meterflow-architecture.jpg', preview: '/visuals/meterflow-preview.jpg' },
    previewGeneratedAt: '2026-04-20T00:00:00.000Z',
    status: 'staging',
    deployments: [
      { version: '0.9.0', url: 'https://feelathome.vercel.app', createdAt: '2026-04-20T00:00:00.000Z', status: 'staging' },
    ],
    outcome: 'Delivered a single platform for discovering homes and publishing managed listings.',
    summary: {
      scope: 'End-to-end property search and listing platform.',
      timeline: 'Iterative delivery with continuous UX refinement.',
      primaryKpi: 'Faster listing discovery and publication turnaround.',
    }
  },
  {
    id: 'shedsense-grid',
    name: 'ShedSense',
    url: 'https://backend-nl4r.onrender.com',
    preview: '/visuals/sh.png',
    stack: ['Next.js 14', 'TypeScript', 'Three.js', 'Framer Motion', 'PostgreSQL'],
    dataFlow: ['Edge Meter → MQTT Broker', 'Broker → Stream Processor', 'Processor → Rule Engine', 'Rule Engine → Dashboard'],
    decisions: ['Prioritized eventual consistency for wide-area device bursts.', 'Used deterministic replay paths for incident reconstruction.'],
    visuals: { screenshot: '/visuals/sh.png', diagram: '/visuals/shedsense-architecture.jpg', preview: '/visuals/sh.png' },
    previewGeneratedAt: '2026-04-20T00:00:00.000Z',
    status: 'live',
    deployments: [
      { version: '1.4.2', url: 'https://backend-nl4r.onrender.com', createdAt: '2026-04-20T00:00:00.000Z', status: 'live' },
    ],
    outcome: 'Reduced event-to-action time by 41% with deterministic alert confidence routing.',
    summary: {
      scope: 'Telemetry and dispatch intelligence platform across distributed field assets.',
      timeline: '16-week delivery across discovery, hardening and rollout.',
      primaryKpi: '41% faster event-to-action response.',
    }
  },
  {
    id: 'ar-experience',
    name: 'AR by Rodent',
    url: 'https://arbyrodent.vercel.app',
    preview: '/visuals/sheq-preview.jpg',
    stack: ['Next.js', 'TypeScript', 'Framer Motion', 'WebGL', 'CSS Effects'],
    dataFlow: ['User Session → Experience Shell', 'Interaction Events → Animation Layer', 'Media Assets → Render Pipeline', 'CTA Actions → Source Destination'],
    decisions: ['Optimized animation sequencing to keep motion smooth across device classes.', 'Structured interactive elements to preserve accessibility while remaining immersive.'],
    visuals: { screenshot: '/visuals/sheq-ui.jpg', diagram: '/visuals/sheq-architecture.jpg', preview: '/visuals/sheq-preview.jpg' },
    previewGeneratedAt: '2026-04-20T00:00:00.000Z',
    status: 'live',
    deployments: [
      { version: '1.1.0', url: 'https://arbyrodent.vercel.app/', createdAt: '2026-04-20T00:00:00.000Z', status: 'live' },
    ],
    outcome: 'Shipped an immersive AR-led product surface with strong visual identity and engagement.',
    summary: {
      scope: 'Interactive AR showcase and product landing experience.',
      timeline: 'Rapid delivery with design-led iterations.',
      primaryKpi: 'Higher session engagement on interactive surfaces.',
    }
  },
  {
    id: 'precise-locations-lib',
    name: 'Precise Locations',
    url: 'https://github.com/anesu398/precise-locations',
    preview: '/visuals/kwiksend-preview.jpg',
    stack: ['Node.js', 'TypeScript', 'npm', 'GitHub Actions', 'Semantic Versioning'],
    dataFlow: ['Input Coordinates → Validation', 'Validated Data → Distance Engine', 'Distance Results → Consumer APIs', 'Package Releases → npm/GitHub'],
    decisions: ['Kept API contracts small and deterministic for broad downstream use.', 'Automated publish and verification checks to keep releases reliable.'],
    visuals: { screenshot: '/visuals/kwiksend-ui.jpg', diagram: '/visuals/kwiksend-architecture.jpg', preview: '/visuals/kwiksend-preview.jpg' },
    previewGeneratedAt: '2026-04-20T00:00:00.000Z',
    status: 'live',
    deployments: [
      { version: '1.0.0', url: 'https://github.com/anesu398/precise-locations', createdAt: '2026-04-20T00:00:00.000Z', status: 'live' },
    ],
    outcome: 'Provided a reusable geospatial toolkit for coordinate-driven applications.',
    summary: {
      scope: 'Open source Node.js package for precise location operations.',
      timeline: 'Incremental releases with API stability focus.',
      primaryKpi: 'Reusable location primitives for multiple products.',
    }
  }
];

export const projectById = Object.fromEntries(projectConfigs.filter((project) => project.id).map((project) => [project.id, project])) as Record<string, ProjectConfig>;

export const projectIdBySlug = Object.fromEntries(projectConfigs.filter((project) => project.slug && project.id).map((project) => [project.slug, project.id])) as Record<string, string>;


export type Project = ProjectConfig;
export const projects = projectConfigs;
