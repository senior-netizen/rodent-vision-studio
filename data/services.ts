import type { Project } from './projects';

export type ServiceSlug = 'web' | 'mobile' | 'iot' | 'robotics';

export type ServiceFaq = { q: string; a: string };

export type Service = {
  slug: ServiceSlug;
  name: string;
  summary: string;
  capability: string;
  deliverables: string[];
  process: { title: string; description: string }[];
  technologies: string[];
  faqs: ServiceFaq[];
  metaTitle: string;
  metaDescription: string;
  relatedProjects: Project['id'][];
  cta: string;
};

export const services: Service[] = [
  {
    slug: 'web',
    name: 'Web Systems',
    summary: 'Custom platforms, dashboards, and APIs engineered for scale and operational reliability.',
    capability:
      'We build command surfaces, B2B portals, and operational dashboards with strict SLAs, strong auditability, and role-aware controls.',
    deliverables: [
      'Production-grade Next.js or Node.js application',
      'Typed API contracts with auth and audit trails',
      'Operational dashboards with role-aware controls',
      'Deployment pipeline, monitoring, and runbook',
    ],
    process: [
      { title: 'Discovery', description: 'Map operators, data flows, and SLAs to a concrete system design.' },
      { title: 'Architecture', description: 'Define schemas, contracts, and the deployment topology.' },
      { title: 'Build', description: 'Iterative shipping with previews, code review, and test coverage.' },
      { title: 'Hardening', description: 'Load tests, observability, and incident playbooks before handover.' },
    ],
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Supabase', 'Vercel'],
    faqs: [
      { q: 'Do you work with our existing stack?', a: 'Yes. We adapt to your runtime, database, and deployment surface where it makes sense and flag tradeoffs upfront.' },
      { q: 'How long does a typical build take?', a: 'Most platforms ship a useful first version in 4–8 weeks, then iterate with operators.' },
    ],
    metaTitle: 'Web Systems — Custom Platforms & Dashboards | Rodent, Inc.',
    metaDescription: 'Production-grade web platforms, B2B portals, and operational dashboards built on Next.js, TypeScript, and PostgreSQL.',
    relatedProjects: ['feel-home', 'precise-locations-lib'],
    cta: 'Need a web platform that operators can trust under load? Start a project with us.',
  },
  {
    slug: 'mobile',
    name: 'Mobile Applications',
    summary: 'Production-grade mobile systems designed for field reliability and resilient offline behavior.',
    capability:
      'Our mobile systems focus on deterministic sync, stable data capture, and secure operator workflows for constrained networks.',
    deliverables: [
      'Cross-platform mobile application',
      'Offline-first sync and conflict resolution',
      'Secure auth, device, and operator workflows',
      'Release pipeline with staged rollouts',
    ],
    process: [
      { title: 'Field study', description: 'Understand operator context, devices, and connectivity constraints.' },
      { title: 'Sync model', description: 'Design the offline data model and conflict strategy first.' },
      { title: 'Build', description: 'Iterate with operator feedback on real devices.' },
      { title: 'Rollout', description: 'Staged release, telemetry, and crash triage.' },
    ],
    technologies: ['React Native', 'TypeScript', 'SQLite', 'Supabase', 'Expo'],
    faqs: [
      { q: 'Native or cross-platform?', a: 'We default to React Native for shared logic and drop to native modules where it materially helps.' },
      { q: 'How do you handle bad networks?', a: 'Offline-first with deterministic sync and conflict resolution baked into the data model from day one.' },
    ],
    metaTitle: 'Mobile Applications — Offline-First Field Apps | Rodent, Inc.',
    metaDescription: 'Production-grade mobile systems for field operations with deterministic sync, offline-first data, and secure operator workflows.',
    relatedProjects: ['feel-home', 'ar-experience'],
    cta: 'Need a mobile application for real operations, not demos? Start a project with us.',
  },
  {
    slug: 'iot',
    name: 'IoT Systems',
    summary: 'Connected infrastructure for monitoring, automation, and real-time telemetry processing.',
    capability:
      'We deliver sensor pipelines, telemetry backplanes, device twins, and rules engines for observability and control.',
    deliverables: [
      'Edge ingestion and broker topology',
      'Stream processing and rules engine',
      'Device twin and command channel',
      'Operational dashboard and alerting',
    ],
    process: [
      { title: 'Site survey', description: 'Map devices, network paths, and failure modes.' },
      { title: 'Pipeline design', description: 'Choose ingest, broker, and storage strategy for the workload.' },
      { title: 'Build', description: 'Implement processors, rules, and the operator surface.' },
      { title: 'Run', description: 'Monitoring, replay, and incident reconstruction in production.' },
    ],
    technologies: ['MQTT', 'Node.js', 'PostgreSQL', 'TimescaleDB', 'Grafana'],
    faqs: [
      { q: 'Do you handle the firmware?', a: 'We focus on backplane and software. We integrate with existing firmware vendors and can advise on protocols.' },
      { q: 'How do you handle bursts?', a: 'Eventual consistency with deterministic replay paths so wide-area device bursts do not lose data.' },
    ],
    metaTitle: 'IoT Systems — Telemetry Pipelines & Rules Engines | Rodent, Inc.',
    metaDescription: 'Edge ingestion, stream processing, device twins, and operational dashboards for connected infrastructure at scale.',
    relatedProjects: ['shedsense-grid', 'precise-locations-lib'],
    cta: 'Need an IoT platform with reliable ingest and command isolation? Start a project with us.',
  },
  {
    slug: 'robotics',
    name: 'Robotics & Automation',
    summary: 'Integrated hardware/software automation systems for physical operations and industrial workflows.',
    capability:
      'From machine orchestration to actuator feedback loops, we build robotics systems that prioritize safety, uptime, and deterministic execution.',
    deliverables: [
      'Machine orchestration layer',
      'Actuator feedback and safety interlocks',
      'Operator console and supervision UI',
      'Logging, replay, and uptime telemetry',
    ],
    process: [
      { title: 'Workflow mapping', description: 'Document physical workflows, safety zones, and failure modes.' },
      { title: 'Control design', description: 'Define orchestration, interlocks, and supervision boundaries.' },
      { title: 'Integration', description: 'Bring controllers, sensors, and the operator surface together.' },
      { title: 'Commissioning', description: 'Run-in, calibration, and on-site handover with runbooks.' },
    ],
    technologies: ['ROS', 'Python', 'Node.js', 'PLC integration', 'Edge compute'],
    faqs: [
      { q: 'Do you build hardware?', a: 'We integrate with existing controllers and actuators. We co-design with hardware partners when needed.' },
      { q: 'How is safety handled?', a: 'Interlocks and supervision are designed alongside the orchestration layer, not bolted on later.' },
    ],
    metaTitle: 'Robotics & Automation — Industrial Workflows | Rodent, Inc.',
    metaDescription: 'Integrated robotics and automation systems with safety interlocks, supervision, and deterministic execution for physical operations.',
    relatedProjects: ['ar-experience', 'shedsense-grid'],
    cta: 'Need robotics workflows integrated with your digital systems? Start a project with us.',
  },
];

export const serviceBySlug = Object.fromEntries(services.map((service) => [service.slug, service])) as Record<ServiceSlug, Service>;
