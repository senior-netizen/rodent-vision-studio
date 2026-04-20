import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projectById } from '@/data/projects';
import { serviceBySlug, services } from '@/data/services';

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  if (!(params.slug in serviceBySlug)) notFound();

  const service = serviceBySlug[params.slug as keyof typeof serviceBySlug];

  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '6rem 1rem 2rem' }}>
      <h1 style={{ fontFamily: 'var(--font-syne)', marginBottom: '0.6rem' }}>{service.name}</h1>
      <p style={{ color: 'var(--mid)', marginBottom: '1rem' }}>{service.capability}</p>
      <h2 style={{ marginBottom: '0.5rem' }}>Related Projects</h2>
      <ul style={{ marginBottom: '1rem', paddingLeft: '1rem' }}>
        {service.relatedProjects.map((id) => (
          <li key={id}>
            <Link href={`/projects/${id}`}>{projectById[id].name}</Link>
          </li>
        ))}
      </ul>
      <p style={{ marginBottom: '1rem' }}>{service.cta}</p>
      <Link className="btn-primary" href="/contact">Start a Project</Link>
    </main>
  );
}
