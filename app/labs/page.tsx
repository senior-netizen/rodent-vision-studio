import Link from 'next/link';
import { labs } from '@/data/labs';

export default function LabsPage() {
  return (
    <main style={{ maxWidth: 1000, margin: '0 auto', padding: '6rem 1rem 2rem' }}>
      <h1 style={{ fontFamily: 'var(--font-syne)', marginBottom: '1rem' }}>Labs</h1>
      <div style={{ display: 'grid', gap: '0.9rem' }}>
        {labs.map((lab) => (
          <Link key={lab.slug} href={`/labs/${lab.slug}`} style={{ border: '1px solid var(--border)', borderRadius: 12, padding: '1rem', textDecoration: 'none', color: 'inherit' }}>
            <h2 style={{ marginBottom: '0.4rem', fontFamily: 'var(--font-syne)' }}>{lab.title}</h2>
            <p style={{ color: 'var(--mid)' }}>{lab.concept}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
