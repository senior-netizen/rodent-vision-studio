import Link from 'next/link';

export const metadata = {
  title: 'Pricing & Engagement Models — Rodent, Inc.',
  description: 'Explore Rodent, Inc. engagement models: MVP sprints, project-based builds, and embedded engineering retainers.',
};

const models = [
  { name: 'MVP Sprint', duration: '6–8 weeks', budget: '$5k–$20k', detail: 'Fixed scope delivery for validating a product quickly.' },
  { name: 'Project-Based', duration: '8+ weeks', budget: '$20k–$50k+', detail: 'Discovery, architecture, build, and deployment.' },
  { name: 'Retainer / Embedded Team', duration: 'Monthly', budget: '$6k+/month', detail: 'Dedicated engineering capacity for ongoing execution.' },
];

export default function PricingPage() { return <main style={{ maxWidth: 1000, margin: '0 auto', padding: '6rem 1.25rem 4rem' }}><h1>Engagement models</h1><div>{models.map((m)=><section key={m.name}><h2>{m.name}</h2><p>{m.duration} · {m.budget}</p><p>{m.detail}</p></section>)}</div><Link href="/contact">Talk to us</Link></main>; }
