export type ProjectConfig = {
  name: string;
  slug: 'shedsense' | 'meterflow' | 'sheq' | 'kwiksend';
  category: 'Grid Intelligence' | 'IoT Devices' | 'Dashboards' | 'Payment Rails';
  role: string;
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
    name: 'ShedSense',
    slug: 'shedsense',
    category: 'Grid Intelligence',
    role: 'Grid Intelligence Layer',
    problem: 'Energy variance across field assets created blind spots and delayed dispatch decisions.',
    architecture: ['Telemetry Ingest', 'Anomaly Classifier', 'Dispatch Rules Engine', 'Ops Timeline UI'],
    stack: ['Next.js 14', 'TypeScript', 'Three.js', 'Framer Motion', 'PostgreSQL'],
    dataFlow: ['Edge Meter → MQTT Broker', 'Broker → Stream Processor', 'Processor → Rule Engine', 'Rule Engine → Dashboard'],
    decisions: ['Prioritized eventual consistency for wide-area device bursts.', 'Used deterministic replay paths for incident reconstruction.'],
    visuals: { screenshot: '/visuals/shedsense-ui.jpg', diagram: '/visuals/shedsense-architecture.jpg', preview: '/visuals/shedsense-preview.jpg' },
    outcome: 'Reduced event-to-action time by 41% with deterministic alert confidence routing.',
    summary: {
      scope: 'Telemetry and dispatch intelligence platform across distributed field assets.',
      timeline: '16-week delivery across discovery, hardening and rollout.',
      primaryKpi: '41% faster event-to-action response.',
    }
  },
  {
    name: 'MeterFlow',
    slug: 'meterflow',
    category: 'IoT Devices',
    role: 'IoT Device Fabric',
    problem: 'Multi-vendor meter fleets lacked a stable protocol and observability baseline.',
    architecture: ['Protocol Adapter Bus', 'Schema Normalizer', 'Device Twin Store', 'Control Surface'],
    stack: ['Next.js 14', 'TypeScript', 'Node Workers', 'Redis Streams', 'Prometheus'],
    dataFlow: ['Device Pollers → Adapter Bus', 'Adapter Bus → Normalizer', 'Normalizer → Twin Store', 'Twin Store → Operator Surface'],
    decisions: ['Built idempotent ingest contracts for replay-safe data correction.', 'Separated command and telemetry channels for failure isolation.'],
    visuals: { screenshot: '/visuals/meterflow-ui.jpg', diagram: '/visuals/meterflow-architecture.jpg', preview: '/visuals/meterflow-preview.jpg' },
    outcome: 'Stabilized ingestion reliability at 99.97% across heterogeneous device networks.',
    summary: {
      scope: 'Multi-vendor device fabric with protocol normalization and command isolation.',
      timeline: '12-week implementation with phased fleet onboarding.',
      primaryKpi: '99.97% ingestion reliability baseline.',
    }
  },
  {
    name: 'SHEQ Dashboard',
    slug: 'sheq',
    category: 'Dashboards',
    role: 'Operational Assurance Surface',
    problem: 'Safety and quality indicators were spread across manual sheets and static reports.',
    architecture: ['Compliance Event Bus', 'Risk Scoring Service', 'Audit Snapshot Engine', 'Executive Command View'],
    stack: ['Next.js 14', 'TypeScript', 'Framer Motion', 'D3 SVG', 'ClickHouse'],
    dataFlow: ['Field Reports → Event Bus', 'Event Bus → Risk Scoring', 'Scoring → Audit Snapshots', 'Snapshots → Command View'],
    decisions: ['Introduced immutable snapshot windows for audit traceability.', 'Used sparse rendering for high-density operations timelines.'],
    visuals: { screenshot: '/visuals/sheq-ui.jpg', diagram: '/visuals/sheq-architecture.jpg', preview: '/visuals/sheq-preview.jpg' },
    outcome: 'Cut compliance reporting overhead by 58% and improved incident lead visibility.',
    summary: {
      scope: 'Operational assurance dashboard for SHEQ risk, audits and incident visibility.',
      timeline: '10-week build with compliance stakeholder checkpoints.',
      primaryKpi: '58% reduction in reporting overhead.',
    }
  },
  {
    name: 'KwikSend',
    slug: 'kwiksend',
    category: 'Payment Rails',
    role: 'Payment Orchestration Rail',
    problem: 'Disjoint payment providers caused reconciliation drift and payout failures.',
    architecture: ['Gateway Router', 'Ledger Core', 'Settlement Reconciler', 'Dispute Monitor'],
    stack: ['Next.js 14', 'TypeScript', 'GSAP', 'Kafka', 'PostgreSQL'],
    dataFlow: ['Client Intent → Router', 'Router → Ledger Core', 'Ledger → Settlement Reconciler', 'Reconciler → Monitoring Surface'],
    decisions: ['Applied append-only ledger semantics for non-repudiation.', 'Enforced policy-based routing by corridor and fee profile.'],
    visuals: { screenshot: '/visuals/kwiksend-ui.jpg', diagram: '/visuals/kwiksend-architecture.jpg', preview: '/visuals/kwiksend-preview.jpg' },
    outcome: 'Improved settlement success rates to 99.92% while shrinking reconciliation lag to minutes.',
    summary: {
      scope: 'Cross-provider payment orchestration and ledger-backed reconciliation.',
      timeline: '14-week rollout across payment corridors.',
      primaryKpi: '99.92% settlement success rate.',
    }
  }
];

export const projectBySlug = Object.fromEntries(projectConfigs.map((project) => [project.slug, project])) as Record<ProjectConfig['slug'], ProjectConfig>;
