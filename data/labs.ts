export interface LabEntry {
  slug: 'edge-orchestrator' | 'autonomous-inspection' | 'adaptive-grid-forecasting';
  name: string;
  description: string;
  status: 'researching' | 'validating' | 'pilot-ready';
  domains: string[];
  why: string;
}

export const labs = [
  {
    slug: 'edge-orchestrator',
    name: 'Edge Orchestrator',
    description: 'A deterministic scheduler for mixed-vendor edge fleets.',
    status: 'validating',
    domains: ['Edge Systems', 'Utility Ops', 'Logistics'],
    why: 'Intermittent connectivity makes command sequencing fragile in distributed fleets.',
  },
  {
    slug: 'autonomous-inspection',
    name: 'Autonomous Inspection',
    description: 'Computer-vision-driven inspection workflows for industrial assets.',
    status: 'researching',
    domains: ['Computer Vision', 'Industrial Safety', 'Compliance'],
    why: 'Operations teams need earlier anomaly signals before failures become safety incidents.',
  },
  {
    slug: 'adaptive-grid-forecasting',
    name: 'Adaptive Grid Forecasting',
    description: 'Short-horizon demand models for distributed energy infrastructure.',
    status: 'pilot-ready',
    domains: ['Energy Forecasting', 'Grid Intelligence', 'Dispatch'],
    why: 'Volatile local demand patterns require forecast correction that reacts to live events.',
  },
] satisfies LabEntry[];

export type Lab = (typeof labs)[number];

export const labBySlug = Object.fromEntries(labs.map((lab) => [lab.slug, lab])) as Record<Lab['slug'], Lab>;
