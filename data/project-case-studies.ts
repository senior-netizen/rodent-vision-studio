import type { Project } from './projects';

export type ProjectCaseStudy = {
  role: string;
  problem: string;
  architecture: string[];
  dataFlow: string[];
  decisions: string[];
  visuals: {
    screenshot: string;
    diagram: string;
  };
  outcome: string;
  summary: {
    scope: string;
    timeline: string;
    primaryKpi: string;
  };
};

export const projectCaseStudiesById: Partial<Record<Project['id'], ProjectCaseStudy>> = {
  'job-opportunities-for-everyone': {
    role: 'Product Design + Full-Stack Engineering',
    problem: 'Job listings were fragmented across informal channels with no centralized, scalable data system.',
    architecture: ['Next.js App Router (SSR)', 'Supabase Auth + PostgREST API', 'PostgreSQL data layer', 'Vercel deployment edge network'],
    dataFlow: ['Submission Form → Validation', 'Validation → Supabase API', 'Supabase API → PostgreSQL', 'PostgreSQL → SSR Job Pages'],
    decisions: ['Prioritized mobile-first interaction patterns for accessibility.', 'Structured listings and submissions to support data ownership and scale.'],
    visuals: { screenshot: '/visuals/sheq-ui.jpg', diagram: '/visuals/sheq-architecture.jpg' },
    outcome: 'Established a centralized job platform with a scalable intake and publishing foundation.',
    summary: {
      scope: 'End-to-end architecture and case study execution for employment distribution platform.',
      timeline: '6-week design and build cycle.',
      primaryKpi: 'Centralized listing access with reduced channel fragmentation.',
    },
  },
  'feel-at-home': {
    role: 'Full-Stack Product Engineering',
    problem: 'Property discovery and listing management were fragmented for renters and agents.',
    architecture: ['Listing Search API', 'Property Catalog', 'Auth + Session Guard', 'Publishing Workflow'],
    dataFlow: ['User Query → Search Index', 'Search Index → Property Catalog', 'Catalog → Listing Detail', 'Listing Events → Agent Dashboard'],
    decisions: ['Kept property lookup paths index-first for responsive browsing.', 'Separated listing write access behind authenticated publisher flows.'],
    visuals: { screenshot: '/visuals/meterflow-ui.jpg', diagram: '/visuals/meterflow-architecture.jpg' },
    outcome: 'Delivered a single platform for discovering homes and publishing managed listings.',
    summary: {
      scope: 'End-to-end property search and listing platform.',
      timeline: 'Iterative delivery with continuous UX refinement.',
      primaryKpi: 'Faster listing discovery and publication turnaround.',
    },
  },
  shedsense: {
    role: 'Grid Intelligence Layer',
    problem: 'Energy variance across field assets created blind spots and delayed dispatch decisions.',
    architecture: ['Telemetry Ingest', 'Anomaly Classifier', 'Dispatch Rules Engine', 'Ops Timeline UI'],
    dataFlow: ['Edge Meter → MQTT Broker', 'Broker → Stream Processor', 'Processor → Rule Engine', 'Rule Engine → Dashboard'],
    decisions: ['Prioritized eventual consistency for wide-area device bursts.', 'Used deterministic replay paths for incident reconstruction.'],
    visuals: { screenshot: '/visuals/sh.png', diagram: '/visuals/shedsense-architecture.jpg' },
    outcome: 'Reduced event-to-action time by 41% with deterministic alert confidence routing.',
    summary: {
      scope: 'Telemetry and dispatch intelligence platform across distributed field assets.',
      timeline: '16-week delivery across discovery, hardening and rollout.',
      primaryKpi: '41% faster event-to-action response.',
    },
  },
  'ar-by-rodent': {
    role: 'Interactive Front-End Engineering',
    problem: 'Brand storytelling needed a richer interactive medium than static landing pages.',
    architecture: ['Experience Shell', 'Animation Orchestrator', 'Media Surface', 'CTA Interaction Layer'],
    dataFlow: ['User Session → Experience Shell', 'Interaction Events → Animation Layer', 'Media Assets → Render Pipeline', 'CTA Actions → Source Destination'],
    decisions: ['Optimized animation sequencing to keep motion smooth across device classes.', 'Structured interactive elements to preserve accessibility while remaining immersive.'],
    visuals: { screenshot: '/visuals/sheq-ui.jpg', diagram: '/visuals/sheq-architecture.jpg' },
    outcome: 'Shipped an immersive AR-led product surface with strong visual identity and engagement.',
    summary: {
      scope: 'Interactive AR showcase and product landing experience.',
      timeline: 'Rapid delivery with design-led iterations.',
      primaryKpi: 'Higher session engagement on interactive surfaces.',
    },
  },
  'precise-locations': {
    role: 'Library + Open Source Delivery',
    problem: 'Applications needed a reusable utility for managing coordinates and location-distance operations.',
    architecture: ['Coordinate Validator', 'Distance Engine', 'Location Resolver', 'Package API Surface'],
    dataFlow: ['Input Coordinates → Validation', 'Validated Data → Distance Engine', 'Distance Results → Consumer APIs', 'Package Releases → npm/GitHub'],
    decisions: ['Kept API contracts small and deterministic for broad downstream use.', 'Automated publish and verification checks to keep releases reliable.'],
    visuals: { screenshot: '/visuals/kwiksend-ui.jpg', diagram: '/visuals/kwiksend-architecture.jpg' },
    outcome: 'Provided a reusable geospatial toolkit for coordinate-driven applications.',
    summary: {
      scope: 'Open source Node.js package for precise location operations.',
      timeline: 'Incremental releases with API stability focus.',
      primaryKpi: 'Reusable location primitives for multiple products.',
    },
  },
};
