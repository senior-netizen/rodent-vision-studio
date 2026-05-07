import Link from 'next/link';

export const metadata = {
  title: 'About Rodent, Inc. — Team, Mission, and Milestones',
  description:
    'Meet the team behind Rodent, Inc. and learn how we build production-ready web, mobile, IoT, and enterprise systems across Africa.',
};

const team = [
  { name: 'Anesu Ndava', role: 'Founder & Systems Engineer', bio: 'Leads delivery across product architecture, infrastructure, and client execution for high-impact deployments.', linkedin: 'https://www.linkedin.com' },
  { name: 'Platform Engineering Team', role: 'Web, Mobile & Backend', bio: 'Designs robust APIs, dashboards, and mobile workflows built for operational reliability and growth.', linkedin: 'https://www.linkedin.com' },
  { name: 'Embedded & IoT Team', role: 'Field Systems', bio: 'Builds telemetry, automation, and edge monitoring pipelines that connect physical infrastructure to decision systems.', linkedin: 'https://www.linkedin.com' },
];
const milestones = [
  'Founded Rodent, Inc. to solve deployment-first engineering problems.',
  'Delivered first production platforms in fintech and property operations.',
  'Expanded into IoT and real-time monitoring systems for field assets.',
  'Launched Labs initiatives in autonomous inspection and grid intelligence.',
];

export default function AboutPage() { return <main style={{ maxWidth: 1100, margin: '0 auto', padding: '6rem 1.25rem 4rem' }}><h1>About Rodent, Inc.</h1><p style={{ color: 'var(--mid)' }}>Rodent, Inc. builds deployable systems for African operators.</p><section><h2>Team</h2>{team.map((m)=><article key={m.name}><h3>{m.name}</h3><p>{m.role}</p></article>)}</section><section><h2>Milestones</h2><ul>{milestones.map((x)=><li key={x}>{x}</li>)}</ul></section><Link href="/contact">Start a project</Link></main>; }
