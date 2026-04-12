import Link from 'next/link';
import { services } from '@/data/services';

export default function ServicesPage() {
  return (
    <main style={{ maxWidth: 1080, margin: '0 auto', padding: '6rem 1rem 2rem' }}>
      <h1 style={{ fontFamily: 'var(--font-syne)', marginBottom: '1rem' }}>Services</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1rem' }}>
        {services.map((service) => (
          <Link key={service.slug} href={`/services/${service.slug}`} style={{ border: '1px solid var(--border)', borderRadius: 12, padding: '1rem', textDecoration: 'none', color: 'inherit' }}>
            <h2 style={{ marginBottom: '0.6rem', fontFamily: 'var(--font-syne)' }}>{service.name}</h2>
            <p style={{ color: 'var(--mid)' }}>{service.summary}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
