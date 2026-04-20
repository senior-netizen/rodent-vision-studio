export type ProjectConfig = {
  id: string;
  name: string;
  slug: string;
  category: string;
  role: string;
  links: {
    live?: string;
    repo?: string;
  };
  problem: string;
  architecture: string[];
  stack: string[];
  dataFlow: string[];
  decisions: string[];
  visuals: {
    screenshot: string;
    diagram: string;
    preview: string;
  };
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
    slug: 'feel-at-home',
    category: 'PropTech Platform',
    role: 'Full-Stack Product Engineering',
    links: {
      live: 'https://feelathome.vercel.app'
    },
    problem: 'Property discovery and listing management were fragmented for renters and agents.',
    architecture: ['Listing Search API', 'Property Catalog', 'Auth + Session Guard', 'Publishing Workflow'],
    stack: ['Next.js', 'TypeScript', 'React Query', 'PostgreSQL', 'Tailwind CSS'],
    dataFlow: ['User Query → Search Index', 'Search Index → Property Catalog', 'Catalog → Listing Detail', 'Listing Events → Agent Dashboard'],
    decisions: ['Kept property lookup paths index-first for responsive browsing.', 'Separated listing write access behind authenticated publisher flows.'],
    visuals: { screenshot: '/visuals/meterflow-ui.jpg', diagram: '/visuals/meterflow-architecture.jpg', preview: '/visuals/meterflow-preview.jpg' },
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
    slug: 'shedsense',
    category: 'Grid Intelligence',
    role: 'Grid Intelligence Layer',
    links: {
      live: 'https://backend-nl4r.onrender.com'
    },
    problem: 'Energy variance across field assets created blind spots and delayed dispatch decisions.',
    architecture: ['Telemetry Ingest', 'Anomaly Classifier', 'Dispatch Rules Engine', 'Ops Timeline UI'],
    stack: ['Next.js 14', 'TypeScript', 'Three.js', 'Framer Motion', 'PostgreSQL'],
    dataFlow: ['Edge Meter → MQTT Broker', 'Broker → Stream Processor', 'Processor → Rule Engine', 'Rule Engine → Dashboard'],
    decisions: ['Prioritized eventual consistency for wide-area device bursts.', 'Used deterministic replay paths for incident reconstruction.'],
    visuals: { screenshot: '/visuals/sh.png', diagram: '/visuals/shedsense-architecture.jpg', preview: '/visuals/sh.png' },
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
    slug: 'ar-by-rodent',
    category: 'AR Experience',
    role: 'Interactive Front-End Engineering',
    links: {
      live: 'https://arbyrodent.vercel.app/'
    },
    problem: 'Brand storytelling needed a richer interactive medium than static landing pages.',
    architecture: ['Experience Shell', 'Animation Orchestrator', 'Media Surface', 'CTA Interaction Layer'],
    stack: ['Next.js', 'TypeScript', 'Framer Motion', 'WebGL', 'CSS Effects'],
    dataFlow: ['User Session → Experience Shell', 'Interaction Events → Animation Layer', 'Media Assets → Render Pipeline', 'CTA Actions → Source Destination'],
    decisions: ['Optimized animation sequencing to keep motion smooth across device classes.', 'Structured interactive elements to preserve accessibility while remaining immersive.'],
    visuals: { screenshot: '/visuals/sheq-ui.jpg', diagram: '/visuals/sheq-architecture.jpg', preview: '/visuals/sheq-preview.jpg' },
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
    slug: 'precise-locations',
    category: 'Geospatial Package',
    role: 'Library + Open Source Delivery',
    links: {
      repo: 'https://github.com/anesu398/precise-locations'
    },
    problem: 'Applications needed a reusable utility for managing coordinates and location-distance operations.',
    architecture: ['Coordinate Validator', 'Distance Engine', 'Location Resolver', 'Package API Surface'],
    stack: ['Node.js', 'TypeScript', 'npm', 'GitHub Actions', 'Semantic Versioning'],
    dataFlow: ['Input Coordinates → Validation', 'Validated Data → Distance Engine', 'Distance Results → Consumer APIs', 'Package Releases → npm/GitHub'],
    decisions: ['Kept API contracts small and deterministic for broad downstream use.', 'Automated publish and verification checks to keep releases reliable.'],
    visuals: { screenshot: '/visuals/kwiksend-ui.jpg', diagram: '/visuals/kwiksend-architecture.jpg', preview: '/visuals/kwiksend-preview.jpg' },
    outcome: 'Provided a reusable geospatial toolkit for coordinate-driven applications.',
    summary: {
      scope: 'Open source Node.js package for precise location operations.',
      timeline: 'Incremental releases with API stability focus.',
      primaryKpi: 'Reusable location primitives for multiple products.',
    }
  }
];

export const projectById = Object.fromEntries(projectConfigs.map((project) => [project.id, project])) as Record<ProjectConfig['id'], ProjectConfig>;

export const projectIdBySlug = Object.fromEntries(projectConfigs.map((project) => [project.slug, project.id])) as Record<ProjectConfig['slug'], ProjectConfig['id']>;
