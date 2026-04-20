import type { Project } from './projects';

export type ServiceSlug = 'web' | 'mobile' | 'iot' | 'robotics';

export type Service = {
  slug: ServiceSlug;
  name: string;
  summary: string;
  capability: string;
  relatedProjects: ProjectConfig['id'][];
  cta: string;
};

export const services: Service[] = [
  {
    slug: 'web',
    name: 'Web Systems',
    summary: 'Custom platforms, dashboards, and APIs engineered for scale and operational reliability.',
    capability:
      'We build command surfaces, B2B portals, and operational dashboards with strict SLAs, strong auditability, and role-aware controls.',
    relatedProjects: ['feel-home', 'precise-locations-lib'],
    cta: 'Need a web platform that operators can trust under load? Start a project with us.',
  },
  {
    slug: 'mobile',
    name: 'Mobile Applications',
    summary: 'Production-grade mobile systems designed for field reliability and resilient offline behavior.',
    capability:
      'Our mobile systems focus on deterministic sync, stable data capture, and secure operator workflows for constrained networks.',
    relatedProjects: ['feel-home', 'ar-experience'],
    cta: 'Need a mobile application for real operations, not demos? Start a project with us.',
  },
  {
    slug: 'iot',
    name: 'IoT Systems',
    summary: 'Connected infrastructure for monitoring, automation, and real-time telemetry processing.',
    capability:
      'We deliver sensor pipelines, telemetry backplanes, device twins, and rules engines for observability and control.',
    relatedProjects: ['shedsense-grid', 'precise-locations-lib'],
    cta: 'Need an IoT platform with reliable ingest and command isolation? Start a project with us.',
  },
  {
    slug: 'robotics',
    name: 'Robotics & Automation',
    summary: 'Integrated hardware/software automation systems for physical operations and industrial workflows.',
    capability:
      'From machine orchestration to actuator feedback loops, we build robotics systems that prioritize safety, uptime, and deterministic execution.',
    relatedProjects: ['ar-experience', 'shedsense-grid'],
    cta: 'Need robotics workflows integrated with your digital systems? Start a project with us.',
  },
];

export const serviceBySlug = Object.fromEntries(services.map((service) => [service.slug, service])) as Record<ServiceSlug, Service>;
