export type Lab = {
  slug: 'edge-orchestrator' | 'autonomous-inspection' | 'adaptive-grid-forecasting';
  title: string;
  concept: string;
  testing: string;
  futureApplication: string;
};

export const labs: Lab[] = [
  {
    slug: 'edge-orchestrator',
    title: 'Edge Orchestrator',
    concept: 'A deterministic scheduler for mixed-vendor edge fleets.',
    testing: 'Conflict resolution for command queues under intermittent connectivity.',
    futureApplication: 'Field automation for distributed utility and logistics operations.',
  },
  {
    slug: 'autonomous-inspection',
    title: 'Autonomous Inspection',
    concept: 'Computer-vision-driven inspection workflows for industrial assets.',
    testing: 'Anomaly confidence scoring and guided intervention loops.',
    futureApplication: 'Safety and compliance inspection in mining and heavy infrastructure.',
  },
  {
    slug: 'adaptive-grid-forecasting',
    title: 'Adaptive Grid Forecasting',
    concept: 'Short-horizon demand models for distributed energy infrastructure.',
    testing: 'Signal quality filtering and event-aware forecast correction.',
    futureApplication: 'Real-time dispatch optimization for utility operators.',
  },
];

export const labBySlug = Object.fromEntries(labs.map((lab) => [lab.slug, lab])) as Record<Lab['slug'], Lab>;
