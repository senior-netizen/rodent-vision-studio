import Link from 'next/link';
import { projects } from '@/data/projects';
import { projectCaseStudiesById } from '@/data/project-case-studies';

export default function ProjectsPage() {
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '6rem 1rem 2rem' }}>
      <h1 style={{ fontFamily: 'var(--font-syne)', marginBottom: '1rem' }}>Projects</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1rem' }}>
        {projectConfigs.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`} style={{ border: '1px solid var(--border)', borderRadius: 12, padding: '1rem', textDecoration: 'none', color: 'inherit' }}>
            <h2 style={{ fontFamily: 'var(--font-syne)', fontSize: 24 }}>{project.name}</h2>
            <p style={{ color: 'var(--mid)', fontSize: 14 }}>{project.problem}</p>
            <p style={{ color: 'var(--mid)', fontSize: 12, marginTop: 8 }}>
              {project.links.live ? 'Live link available' : 'Repository link available'}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
