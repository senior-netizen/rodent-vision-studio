import Link from 'next/link';
import { projectConfigs } from '@/data/projects';
import { getProjectHealthById } from '@/lib/projects/health';

export default async function ProjectsPage() {
  const healthById = await getProjectHealthById();

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '6rem 1rem 2rem' }}>
      <h1 style={{ fontFamily: 'var(--font-syne)', marginBottom: '1rem' }}>Projects</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1rem' }}>
        {projectConfigs.map((project) => {
          const health = healthById[project.id];
          const staleLabel = health?.isStale ? 'Stale' : null;

          return (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              style={{ border: '1px solid var(--border)', borderRadius: 12, padding: '1rem', textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <h2 style={{ fontFamily: 'var(--font-syne)', fontSize: 24 }}>{project.name}</h2>
                {staleLabel ? (
                  <span
                    style={{
                      fontSize: 11,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      border: '1px solid #f59e0b',
                      color: '#f59e0b',
                      borderRadius: 999,
                      padding: '0.15rem 0.55rem',
                    }}
                  >
                    {staleLabel}
                  </span>
                ) : null}
              </div>
              <p style={{ color: 'var(--mid)', fontSize: 14 }}>{project.problem}</p>
              <p style={{ color: 'var(--mid)', fontSize: 12, marginTop: 8 }}>
                {health
                  ? `Last check ${new Date(health.checkedAt).toLocaleString()} · failures ${health.consecutiveFailures}`
                  : 'Health check not yet recorded'}
              </p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
