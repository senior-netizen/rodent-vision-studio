import { notFound } from 'next/navigation';
import { labBySlug, labs } from '@/data/labs';

export function generateStaticParams() {
  return labs.map((lab) => ({ slug: lab.slug }));
}

export default function LabDetailPage({ params }: { params: { slug: string } }) {
  if (!(params.slug in labBySlug)) notFound();
  const lab = labBySlug[params.slug as keyof typeof labBySlug];

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '6rem 1rem 2rem' }}>
      <h1 style={{ fontFamily: 'var(--font-syne)', marginBottom: '1rem' }}>{lab.title}</h1>
      <p><strong>Concept:</strong> {lab.concept}</p>
      <p><strong>What we are testing:</strong> {lab.testing}</p>
      <p><strong>Future application:</strong> {lab.futureApplication}</p>
    </main>
  );
}
