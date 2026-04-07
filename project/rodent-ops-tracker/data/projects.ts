export type ProjectConfig = {
  name: string;
  slug: 'shedsense' | 'meterflow' | 'sheq' | 'kwiksend';
  category: 'Grid Intelligence' | 'IoT Devices' | 'Dashboards' | 'Payment Rails';
  role: string;
  problem: string;
  architecture: string[];
  stack: string[];
  dataFlow: string[];
  systemDecisions: string[];
  visuals: { title: string; caption: string; kind: 'diagram' | 'interface' }[];
  outcome: string[];
};

export const projects: ProjectConfig[] = [
  {
    name: 'ShedSense',
    slug: 'shedsense',
    category: 'Grid Intelligence',
    role: 'Grid Intelligence Layer',
    problem: 'Utilities lacked a deterministic way to correlate feeder events with site-level shed actions in less than 90 seconds.',
    architecture: ['Substation Event Ingest', 'Normalization Bus', 'Rules Engine', 'Dispatch API', 'Operator Console'],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Kafka', 'Three.js'],
    dataFlow: ['Substation events stream into ingest gateways.', 'Rules engine computes shed priority and outage blast radius.', 'Dispatch API pushes actionable states to operators.'],
    systemDecisions: ['At-least-once ingestion with idempotent keys.', 'Time-windowed correlation for unreliable feeder timestamps.'],
    visuals: [
      { title: 'Feeder Correlation Graph', caption: 'Live relation model for feeder-state changes.', kind: 'diagram' },
      { title: 'Dispatch Console', caption: 'Dark-mode operator interface for incident response.', kind: 'interface' }
    ],
    outcome: ['42% faster fault localization.', 'Reduced false shed commands by 31%.']
  },
  {
    name: 'MeterFlow',
    slug: 'meterflow',
    category: 'IoT Devices',
    role: 'Field Device Ingestion Layer',
    problem: 'Meter telemetry arrived out of order, breaking downstream billing integrity and anomaly detection.',
    architecture: ['Device Fleet', 'MQTT Bridge', 'Ordering Buffer', 'Validation API', 'Ledger Store'],
    stack: ['Next.js', 'TypeScript', 'MQTT', 'Redis', 'TimescaleDB'],
    dataFlow: ['Meters publish signed payloads every 5 seconds.', 'Ordering buffer rebuilds event sequence before validation.', 'Validated records persist to billing and analytics stores.'],
    systemDecisions: ['Vector-clock dedupe to eliminate replay attacks.', 'Circuit-breakers isolate faulty device clusters.'],
    visuals: [
      { title: 'Device Health Matrix', caption: 'Cluster-level fleet health and packet loss.', kind: 'diagram' },
      { title: 'Telemetry Inspector', caption: 'Per-device packet audit and corrective controls.', kind: 'interface' }
    ],
    outcome: ['Billing correction tickets dropped 58%.', 'Sustained 1.2M payloads/hour at p95 < 180ms.']
  },
  {
    name: 'SHEQ Dashboard',
    slug: 'sheq',
    category: 'Dashboards',
    role: 'Operational Assurance Layer',
    problem: 'Safety and compliance events were siloed from production telemetry and could not be audited in real-time.',
    architecture: ['Compliance Input API', 'Policy Engine', 'Risk Graph', 'Alert Router', 'Executive Dashboard'],
    stack: ['Next.js', 'TypeScript', 'Node', 'ClickHouse', 'WebSockets'],
    dataFlow: ['Field audits sync into compliance API.', 'Policy engine scores risk against asset telemetry.', 'Dashboard streams live non-conformance alerts.'],
    systemDecisions: ['Immutable event logs for legal traceability.', 'Explicit severity scoring to avoid alert fatigue.'],
    visuals: [
      { title: 'Risk Graph', caption: 'Cross-asset non-conformance propagation map.', kind: 'diagram' },
      { title: 'Compliance Command View', caption: 'Execution board for remediation workflows.', kind: 'interface' }
    ],
    outcome: ['Audit preparation time reduced from days to hours.', '100% traceability on corrective actions.']
  },
  {
    name: 'KwikSend',
    slug: 'kwiksend',
    category: 'Payment Rails',
    role: 'Settlement Orchestration Layer',
    problem: 'Infrastructure payment routing needed deterministic settlement across heterogeneous rails with strict retry safety.',
    architecture: ['Channel Gateways', 'Settlement Orchestrator', 'Risk Scoring Service', 'Reconciliation Engine', 'Ops Console'],
    stack: ['Next.js', 'TypeScript', 'Go services', 'PostgreSQL', 'gRPC'],
    dataFlow: ['Requests enter through rail-specific gateways.', 'Orchestrator selects path based on risk and cost.', 'Reconciliation engine confirms final settlement state.'],
    systemDecisions: ['Idempotency tokens enforced per merchant + amount.', 'Saga rollback for partial rail failures.'],
    visuals: [
      { title: 'Settlement Route Graph', caption: 'Cross-rail routing and fallback topology.', kind: 'diagram' },
      { title: 'Rail Operations Console', caption: 'Live settlement window management UI.', kind: 'interface' }
    ],
    outcome: ['Settlement failures reduced to 0.08%.', 'Average routing cost decreased 19%.']
  }
];

export const projectBySlug = Object.fromEntries(projects.map((project) => [project.slug, project])) as Record<ProjectConfig['slug'], ProjectConfig>;
