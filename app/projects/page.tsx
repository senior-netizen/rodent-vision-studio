import type { Metadata } from 'next';
import Link from 'next/link';
import { projectConfigs } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Projects — Selected Systems by Rodent',
  description:
    'Selected web, mobile, and connected systems built by Rodent for businesses and field teams.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Projects | Rodent',
    description: 'Selected web, mobile, and connected systems built by Rodent.',
    type: 'website',
    url: '/projects',
  },
};

export default function ProjectsPage() {
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '6rem 1rem 2rem' }}>
      <h1 style={{ fontFamily: 'var(--font-syne)', marginBottom: '1rem' }}>Projects</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1rem' }}>
        {projectConfigs.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            style={{ border: '1px solid var(--border)', borderRadius: 12, padding: '1rem', textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <h2 style={{ fontFamily: 'var(--font-syne)', fontSize: 24 }}>{project.name}</h2>
              <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', border: '1px solid var(--teal)', color: '#087d65', borderRadius: 999, padding: '0.15rem 0.55rem' }}>
                Project delivered
              </span>
            </div>
            <p style={{ color: 'var(--mid)', fontSize: 14 }}>{project.problem}</p>
            <p style={{ color: 'var(--mid)', fontSize: 12, marginTop: 8 }}>
              {project.status === 'live'
                ? 'Public demo available.'
                : project.status === 'staging'
                  ? 'Public preview available.'
                  : 'Case study only.'}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
