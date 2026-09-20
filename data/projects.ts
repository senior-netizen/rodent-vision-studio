export type DeploymentStatus = 'live' | 'staging' | 'failed';

export type LinkHealthCheck = {
  checkedAt: string;
  ok: boolean;
  statusCode?: number;
};

export type LinkHealth = {
  lastCheckedAt?: string;
  lastSuccessfulCheckAt?: string;
  recentChecks?: LinkHealthCheck[];
};

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

export interface ProjectConfig {
  id: string;
  slug: string;
  name: string;
  category: string;
  color: string;
  role: string;
  url: string;
  links: {
    live?: string;
    repo?: string;
  };
  problem: string;
  solution?: string;
  result?: string;
  metrics?: { label: string; value: string }[];
  tagline?: string;
  architecture: string[];
  preview: string;
  stack: string[];
  dataFlow: string[];
  decisions: string[];
  visuals: {
    screenshot: string;
    diagram?: string;
    preview: string;
  };
  previewGeneratedAt?: string;
  previewAsset?: {
    hash: string;
    version: string;
    aliasUrl: string;
  };
  status?: DeploymentStatus;
  deployments?: ProjectDeployment[];
  linkHealth?: LinkHealth;
  stale?: boolean;
  outcome: string;
  summary: {
    scope: string;
    timeline?: string;
    primaryKpi: string;
  };
}

export const projectConfigs = [
  {
    id: 'jofe-platform',
    color: '#1D4ED8',
    slug: 'job-opportunities-for-everyone-platform',
    name: 'Job Opportunities For Everyone',
    category: 'Employment Platform',
    role: 'Product Design + Full-Stack Engineering',
    url: 'https://jobopportunities.co.zw',
    links: {
      live: 'https://jobopportunities.co.zw',
    },
    problem: 'Job opportunities shared across separate channels can be difficult for applicants to find and for publishers to keep organised.',
    solution: 'Rodent built a web platform where opportunities can be submitted as structured records and published as individual job pages.',
    result: 'The delivered platform gives job seekers one place to browse listings and gives publishers a consistent way to add them.',
    tagline: 'One place to publish and browse structured job listings.',
    architecture: ['Next.js App Router (SSR)', 'Supabase Auth + PostgREST API', 'PostgreSQL data layer', 'Vercel deployment edge network'],
    preview: '/visuals/jofe-preview.jpg',
    stack: ['Next.js (App Router)', 'Supabase', 'PostgreSQL', 'TailwindCSS', 'Vercel'],
    dataFlow: ['Submission Form → Validation', 'Validation → Supabase API', 'Supabase API → PostgreSQL', 'PostgreSQL → SSR Job Pages'],
    decisions: ['Prioritized mobile-first interaction patterns for accessibility.', 'Structured listings and submissions to support data ownership and scale.'],
    visuals: { screenshot: '/visuals/jofe-preview.jpg', preview: '/visuals/jofe-preview.jpg' },
    previewGeneratedAt: '2026-04-20T00:00:00.000Z',
    status: 'live',
    deployments: [
      { version: '1.0.0', url: 'https://jobopportunities.co.zw', createdAt: '2026-04-20T00:00:00.000Z', status: 'live' },
    ],
    outcome: 'Established a centralized job platform with a scalable intake and publishing foundation.',
    summary: {
      scope: 'Job listing submission, publishing, and browsing.',
      primaryKpi: 'Structured listings in one public platform.',
    },
  },
  {
    id: 'feel-home',
    color: '#0F766E',
    slug: 'feel-at-home',
    category: 'Property Platform',
    role: 'Platform Engineering',
    links: {
      live: 'https://feelathome.vercel.app',
    },
    problem: 'People looking for a home and people publishing properties needed a shared place to manage listings.',
    solution: 'Rodent built a property website with searchable listings and sign-in-protected publishing tools.',
    result: 'The preview brings property discovery and managed listing publication into one interface.',
    tagline: 'Property discovery and managed publishing in one preview.',
    architecture: ['Next.js application layer', 'Typed API contracts', 'PostgreSQL persistence', 'Vercel deployment'],
    name: 'Feel At Home',
    url: 'https://feelathome.vercel.app',
    preview: '/visuals/feel-at-home-preview.jpg',
    stack: ['Next.js', 'TypeScript', 'React Query', 'PostgreSQL', 'Tailwind CSS'],
    dataFlow: ['User Query → Search Index', 'Search Index → Property Catalog', 'Catalog → Listing Detail', 'Listing Events → Agent Dashboard'],
    decisions: ['Kept property lookup paths index-first for responsive browsing.', 'Separated listing write access behind authenticated publisher flows.'],
    visuals: { screenshot: '/visuals/feel-at-home-preview.jpg', preview: '/visuals/feel-at-home-preview.jpg' },
    previewGeneratedAt: '2026-04-20T00:00:00.000Z',
    status: 'staging',
    deployments: [
      { version: '0.9.0', url: 'https://feelathome.vercel.app', createdAt: '2026-04-20T00:00:00.000Z', status: 'staging' },
    ],
    outcome: 'Delivered a single platform for discovering homes and publishing managed listings.',
    summary: {
      scope: 'End-to-end property search and listing platform.',
      primaryKpi: 'Search and publishing in one interface.',
    },
  },
  {
    id: 'shedsense-grid',
    color: '#7C3AED',
    slug: 'shedsense-grid',
    category: 'Telemetry Platform',
    role: 'Distributed Systems Engineering',
    links: {
      live: 'https://backend-nl4r.onrender.com',
    },
    problem: 'Teams monitoring equipment in the field needed a clear way to turn incoming meter readings into information they could act on.',
    solution: 'Rodent built a telemetry flow that receives readings through MQTT, checks them against rules, and sends alerts and status updates to an operations dashboard.',
    result: 'The system demonstrates field readings appearing as alerts and a time-ordered incident record for operators to review.',
    tagline: 'Field telemetry routed into alerts and an operations dashboard.',
    architecture: ['Edge ingestion', 'Stream processing', 'Rule evaluation engine', 'Operational dashboard'],
    name: 'ShedSense',
    url: 'https://backend-nl4r.onrender.com',
    preview: '/visuals/shedsense-preview.jpg',
    stack: ['Next.js 14', 'TypeScript', 'Three.js', 'Framer Motion', 'PostgreSQL'],
    dataFlow: ['Edge Meter → MQTT Broker', 'Broker → Stream Processor', 'Processor → Rule Engine', 'Rule Engine → Dashboard'],
    decisions: ['Kept incoming readings separate from the operator interface.', 'Recorded events in order so an operator can review what happened.'],
    visuals: {
      screenshot: '/visuals/shedsense-ui.jpg',
      diagram: '/visuals/shedsense-architecture.jpg',
      preview: '/visuals/shedsense-preview.jpg',
    },
    previewGeneratedAt: '2026-04-20T00:00:00.000Z',
    outcome: 'Connected field telemetry, rule evaluation, alerts, and an operator-facing incident view.',
    summary: {
      scope: 'Telemetry intake, rule checks, alerts, and an operator dashboard.',
      primaryKpi: 'Alert routing and incident visibility.',
    },
  },
  {
    id: 'ar-experience',
    color: '#DB2777',
    slug: 'ar-by-rodent',
    category: 'AR Experience',
    role: 'Interactive Product Engineering',
    links: {
      live: 'https://arbyrodent.vercel.app',
    },
    problem: 'The project needed a web-based way to introduce and demonstrate an augmented-reality concept.',
    solution: 'Rodent built an interactive product site using a Next.js interface, WebGL visuals, and motion that responds to user input.',
    result: 'The public site lets visitors explore the visual concept and follow its calls to action on mobile or desktop.',
    tagline: 'An interactive web presentation for an augmented-reality concept.',
    architecture: ['Next.js UI shell', 'WebGL render surface', 'Motion orchestration', 'CTA analytics hooks'],
    name: 'AR by Rodent',
    url: 'https://arbyrodent.vercel.app',
    preview: '/visuals/ar-by-rodent-preview.jpg',
    stack: ['Next.js', 'TypeScript', 'Framer Motion', 'WebGL', 'CSS Effects'],
    dataFlow: ['User Session → Experience Shell', 'Interaction Events → Animation Layer', 'Media Assets → Render Pipeline', 'CTA Actions → Source Destination'],
    decisions: ['Optimized animation sequencing to keep motion smooth across device classes.', 'Structured interactive elements to preserve accessibility while remaining immersive.'],
    visuals: { screenshot: '/visuals/ar-by-rodent-preview.jpg', preview: '/visuals/ar-by-rodent-preview.jpg' },
    previewGeneratedAt: '2026-04-20T00:00:00.000Z',
    status: 'live',
    deployments: [
      { version: '1.1.0', url: 'https://arbyrodent.vercel.app/', createdAt: '2026-04-20T00:00:00.000Z', status: 'live' },
    ],
    outcome: 'Shipped an immersive AR-led product surface with strong visual identity and engagement.',
    summary: {
      scope: 'Interactive AR showcase and product landing experience.',
      primaryKpi: 'Interactive presentation on mobile and desktop.',
    },
  },
  {
    id: 'precise-locations-lib',
    color: '#D97706',
    slug: 'precise-locations',
    category: 'Developer Tooling',
    role: 'Library Architecture + Release Engineering',
    links: {
      live: 'https://github.com/anesu398/precise-locations',
      repo: 'https://github.com/anesu398/precise-locations',
    },
    problem: 'Applications working with coordinates needed reusable validation and distance calculations instead of implementing them repeatedly.',
    solution: 'Rodent built a typed Node.js library that checks coordinate input, calculates distance, and packages those functions for reuse.',
    result: 'The source and release history are publicly available for developers to inspect and use.',
    tagline: 'Reusable coordinate validation and distance calculations.',
    architecture: ['Typed Node.js library core', 'Validation boundary', 'Automated release pipeline', 'GitHub/npm distribution'],
    name: 'Precise Locations',
    url: 'https://github.com/anesu398/precise-locations',
    preview: '/visuals/precise-locations-preview.jpg',
    stack: ['Node.js', 'TypeScript', 'npm', 'GitHub Actions', 'Semantic Versioning'],
    dataFlow: ['Input Coordinates → Validation', 'Validated Data → Distance Engine', 'Distance Results → Consumer APIs', 'Package Releases → npm/GitHub'],
    decisions: ['Kept the public functions small and typed.', 'Automated checks and package publishing through GitHub Actions.'],
    visuals: { screenshot: '/visuals/precise-locations-preview.jpg', preview: '/visuals/precise-locations-preview.jpg' },
    previewGeneratedAt: '2026-04-20T00:00:00.000Z',
    status: 'live',
    deployments: [
      { version: '1.0.0', url: 'https://github.com/anesu398/precise-locations', createdAt: '2026-04-20T00:00:00.000Z', status: 'live' },
    ],
    outcome: 'Provided a reusable geospatial toolkit for coordinate-driven applications.',
    summary: {
      scope: 'Open source Node.js package for precise location operations.',
      primaryKpi: 'Reusable location functions in a public package.',
    },
  },
  {
    id: 'express-energy',
    color: '#DC2626',
    slug: 'express-energy',
    name: 'Express Energy Service Station',
    category: 'Fuel Retail Platform',
    role: 'Brand + Web Engineering',
    url: 'https://expressenergy.co.zw',
    links: { live: 'https://expressenergy.co.zw' },
    problem: 'Express Energy needed a clear web presence where drivers could find station information and current published prices.',
    solution: 'Rodent built a mobile-friendly marketing site with a fuel-price section, station information, and a route to directions.',
    result: 'The public website gives drivers one place to check the information the station publishes online.',
    tagline: 'Published fuel prices and station information in one website.',
    architecture: ['Next.js marketing site', 'Daily price module', 'Station locator', 'CMS-backed content'],
    preview: '/visuals/express-energy-preview.jpg',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    dataFlow: ['Price update → CMS', 'CMS → Today\'s Prices module', 'User location → Station finder', 'CTA → Directions'],
    decisions: ['Mobile-first hero with strong brand identity.', 'Surfaced 24hr availability and Feruka sourcing as primary trust signals.'],
    visuals: {
      screenshot: '/visuals/express-energy-preview.jpg',
      preview: '/visuals/express-energy-preview.jpg',
    },
    previewGeneratedAt: '2026-05-03T00:00:00.000Z',
    status: 'live',
    deployments: [
      { version: '1.0.0', url: 'https://expressenergy.co.zw', createdAt: '2026-05-03T00:00:00.000Z', status: 'live' },
    ],
    outcome: 'Launched a branded fuel-retail web presence with live pricing and station discovery.',
    summary: {
      scope: 'Marketing site, pricing module, and station finder for a 24hr fuel retailer.',
      primaryKpi: 'Prices and station details visible in one place.',
    },
  },
] satisfies ProjectConfig[];

export type Project = (typeof projectConfigs)[number];

export const projectById = Object.fromEntries(
  projectConfigs
    .filter((project) => project.id)
    .map((project) => [project.id, project]),
) as Record<string, ProjectConfig>;

export const projectIdBySlug = Object.fromEntries(
  projectConfigs
    .filter((project) => Boolean(project.slug))
    .map((project) => [project.slug, project.id]),
) as Record<string, ProjectConfig['id']>;

export const projects: Project[] = [
  projectConfigs.find((project) => project.id === 'shedsense-grid')!,
  ...projectConfigs.filter((project) => project.id !== 'shedsense-grid'),
];
