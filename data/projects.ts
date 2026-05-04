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
    diagram: string;
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
    timeline: string;
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
    problem: 'Job listings were fragmented across informal channels with no centralized, scalable data system.',
    solution: 'Built a Next.js + Supabase platform with structured submission, validation, and SSR-rendered job pages on a unified PostgreSQL data layer.',
    result: 'Centralized listing intake with a publishing pipeline that scales beyond informal channels.',
    metrics: [
      { label: 'Channels consolidated', value: '5+' },
      { label: 'Build cycle', value: '6 weeks' },
      { label: 'Time-to-publish', value: '< 1 min' },
    ],
    tagline: 'Fragmented listings → one structured intake and publishing pipeline.',
    architecture: ['Next.js App Router (SSR)', 'Supabase Auth + PostgREST API', 'PostgreSQL data layer', 'Vercel deployment edge network'],
    preview: '/visuals/jofe-preview.jpg',
    stack: ['Next.js (App Router)', 'Supabase', 'PostgreSQL', 'TailwindCSS', 'Vercel'],
    dataFlow: ['Submission Form → Validation', 'Validation → Supabase API', 'Supabase API → PostgreSQL', 'PostgreSQL → SSR Job Pages'],
    decisions: ['Prioritized mobile-first interaction patterns for accessibility.', 'Structured listings and submissions to support data ownership and scale.'],
    visuals: { screenshot: '/visuals/jofe-preview.jpg', diagram: '/visuals/sheq-architecture.jpg', preview: '/visuals/jofe-preview.jpg' },
    previewGeneratedAt: '2026-04-20T00:00:00.000Z',
    status: 'live',
    deployments: [
      { version: '1.0.0', url: 'https://jobopportunities.co.zw', createdAt: '2026-04-20T00:00:00.000Z', status: 'live' },
    ],
    outcome: 'Established a centralized job platform with a scalable intake and publishing foundation.',
    summary: {
      scope: 'End-to-end architecture and case study execution for employment distribution platform.',
      timeline: '6-week design and build cycle.',
      primaryKpi: 'Centralized listing access with reduced channel fragmentation.',
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
    problem: 'Property discovery and publishing required a single reliable platform with fast indexing.',
    solution: 'Index-first search architecture with typed API contracts and authenticated publisher flows for managed listings.',
    result: 'A unified discovery and publishing experience that shortens listing turnaround for renters and agents alike.',
    metrics: [
      { label: 'Listing surfaces', value: '1 unified' },
      { label: 'Publisher access', value: 'Auth-gated' },
      { label: 'Search latency', value: 'Index-first' },
    ],
    tagline: 'Fragmented property search → one index-first discovery + publishing platform.',
    architecture: ['Next.js application layer', 'Typed API contracts', 'PostgreSQL persistence', 'Vercel deployment'],
    name: 'Feel At Home',
    url: 'https://feelathome.vercel.app',
    preview: '/visuals/feel-at-home-preview.jpg',
    stack: ['Next.js', 'TypeScript', 'React Query', 'PostgreSQL', 'Tailwind CSS'],
    dataFlow: ['User Query → Search Index', 'Search Index → Property Catalog', 'Catalog → Listing Detail', 'Listing Events → Agent Dashboard'],
    decisions: ['Kept property lookup paths index-first for responsive browsing.', 'Separated listing write access behind authenticated publisher flows.'],
    visuals: { screenshot: '/visuals/feel-at-home-preview.jpg', diagram: '/visuals/feel-at-home-preview.jpg', preview: '/visuals/feel-at-home-preview.jpg' },
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
    problem: 'Field telemetry pipelines needed deterministic routing and resilient actioning.',
    solution: 'Edge ingestion over MQTT into a stream processor and rule engine that routes alerts with deterministic confidence to an ops dashboard.',
    result: 'Reduced event-to-action time by 41% with replayable incident reconstruction.',
    metrics: [
      { label: 'Event-to-action', value: '−41%' },
      { label: 'Pipeline', value: 'MQTT → Rules → UI' },
      { label: 'Rollout', value: '16 weeks' },
    ],
    tagline: 'Noisy field telemetry → deterministic alerts, 41% faster response.',
    architecture: ['Edge ingestion', 'Stream processing', 'Rule evaluation engine', 'Operational dashboard'],
    name: 'ShedSense',
    url: 'https://backend-nl4r.onrender.com',
    preview: '/visuals/shedsense-real.jpg',
    stack: ['Next.js 14', 'TypeScript', 'Three.js', 'Framer Motion', 'PostgreSQL'],
    dataFlow: ['Edge Meter → MQTT Broker', 'Broker → Stream Processor', 'Processor → Rule Engine', 'Rule Engine → Dashboard'],
    decisions: ['Prioritized eventual consistency for wide-area device bursts.', 'Used deterministic replay paths for incident reconstruction.'],
    visuals: { screenshot: '/visuals/shedsense-real.jpg', diagram: '/visuals/shedsense-real.jpg', preview: '/visuals/shedsense-real.jpg' },
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
    problem: 'The product needed a performant immersive presentation layer that remained accessible.',
    solution: 'Next.js shell with a WebGL render surface and Framer Motion orchestration tuned for smooth motion across device classes.',
    result: 'An immersive AR-led product surface with strong identity and accessible interaction.',
    metrics: [
      { label: 'Render surface', value: 'WebGL' },
      { label: 'Target devices', value: 'Mobile + desktop' },
      { label: 'Accessibility', value: 'Preserved' },
    ],
    tagline: 'Static landing → immersive, accessible AR-led product surface.',
    architecture: ['Next.js UI shell', 'WebGL render surface', 'Motion orchestration', 'CTA analytics hooks'],
    name: 'AR by Rodent',
    url: 'https://arbyrodent.vercel.app',
    preview: '/visuals/ar-by-rodent-preview.jpg',
    stack: ['Next.js', 'TypeScript', 'Framer Motion', 'WebGL', 'CSS Effects'],
    dataFlow: ['User Session → Experience Shell', 'Interaction Events → Animation Layer', 'Media Assets → Render Pipeline', 'CTA Actions → Source Destination'],
    decisions: ['Optimized animation sequencing to keep motion smooth across device classes.', 'Structured interactive elements to preserve accessibility while remaining immersive.'],
    visuals: { screenshot: '/visuals/ar-by-rodent-preview.jpg', diagram: '/visuals/ar-by-rodent-preview.jpg', preview: '/visuals/ar-by-rodent-preview.jpg' },
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
    problem: 'Teams required deterministic geospatial primitives with stable package contracts.',
    solution: 'Typed Node.js library with a strict validation boundary, semver-driven releases, and automated GitHub Actions publishing.',
    result: 'A reusable geospatial toolkit consumed across multiple downstream products.',
    metrics: [
      { label: 'Distribution', value: 'npm + GitHub' },
      { label: 'Release pipeline', value: 'Automated' },
      { label: 'API surface', value: 'Stable' },
    ],
    tagline: 'Ad-hoc geo math → deterministic, versioned location primitives.',
    architecture: ['Typed Node.js library core', 'Validation boundary', 'Automated release pipeline', 'GitHub/npm distribution'],
    name: 'Precise Locations',
    url: 'https://github.com/anesu398/precise-locations',
    preview: '/visuals/precise-locations-preview.jpg',
    stack: ['Node.js', 'TypeScript', 'npm', 'GitHub Actions', 'Semantic Versioning'],
    dataFlow: ['Input Coordinates → Validation', 'Validated Data → Distance Engine', 'Distance Results → Consumer APIs', 'Package Releases → npm/GitHub'],
    decisions: ['Kept API contracts small and deterministic for broad downstream use.', 'Automated publish and verification checks to keep releases reliable.'],
    visuals: { screenshot: '/visuals/precise-locations-preview.jpg', diagram: '/visuals/precise-locations-preview.jpg', preview: '/visuals/precise-locations-preview.jpg' },
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
    problem: 'A 24hr Masvingo fuel station needed an authoritative web presence with live pricing and station info.',
    solution: 'Built a brand-led marketing site with a daily fuel-price module, station finder, and trust signals (24hr service, direct from Feruka).',
    result: 'A clear, mobile-first hub that surfaces today\'s prices and drives visits to the station.',
    metrics: [
      { label: 'Service window', value: '24/7' },
      { label: 'Location', value: 'Masvingo' },
      { label: 'Sourcing', value: 'Direct from Feruka' },
    ],
    tagline: 'Static fuel branding → live pricing + station discovery on web.',
    architecture: ['Next.js marketing site', 'Daily price module', 'Station locator', 'CMS-backed content'],
    preview: '/visuals/express-energy-preview.jpg',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    dataFlow: ['Price update → CMS', 'CMS → Today\'s Prices module', 'User location → Station finder', 'CTA → Directions'],
    decisions: ['Mobile-first hero with strong brand identity.', 'Surfaced 24hr availability and Feruka sourcing as primary trust signals.'],
    visuals: {
      screenshot: '/visuals/express-energy-preview.jpg',
      diagram: '/visuals/express-energy-preview.jpg',
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
      timeline: 'Rapid brand-aligned build and launch.',
      primaryKpi: 'Daily-updated fuel prices visible to drivers in Masvingo.',
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

export const projects: Project[] = projectConfigs;
