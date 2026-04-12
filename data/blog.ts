export type BlogPost = {
  slug: 'designing-for-operations' | 'building-resilient-iot-pipelines' | 'why-observability-matters';
  title: string;
  excerpt: string;
  body: string;
  publishedAt: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'designing-for-operations',
    title: 'Designing Interfaces for Operations Teams',
    excerpt: 'How interface decisions impact uptime, mean-time-to-resolution, and operator trust.',
    body: 'Operational interfaces must optimize for clarity under stress. We prioritize deterministic state transitions, readable timelines, and context-rich alerts that reduce decision fatigue.',
    publishedAt: '2026-02-10',
  },
  {
    slug: 'building-resilient-iot-pipelines',
    title: 'Building Resilient IoT Pipelines',
    excerpt: 'A pragmatic architecture for replay-safe ingest and resilient device telemetry processing.',
    body: 'Reliability in IoT pipelines begins with idempotent contracts and explicit sequencing. We isolate command channels from telemetry, use append-only streams, and design replay paths from day one.',
    publishedAt: '2026-01-21',
  },
  {
    slug: 'why-observability-matters',
    title: 'Why Observability Drives Better Engineering Outcomes',
    excerpt: 'Metrics, traces, and logs should inform product decisions—not just incident response.',
    body: 'Observability is a strategic layer. By instrumenting user-critical flows and operational bottlenecks, teams can optimize architecture choices and improve delivery confidence over time.',
    publishedAt: '2025-11-03',
  },
];

export const blogBySlug = Object.fromEntries(blogPosts.map((post) => [post.slug, post])) as Record<BlogPost['slug'], BlogPost>;
