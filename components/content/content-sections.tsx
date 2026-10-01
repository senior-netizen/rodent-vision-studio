import Link from 'next/link';
import type { ServiceItem } from '@/data/services';

export function CapabilityGrid({ items }: { items: ServiceItem[] }) {
  return <div className="content-grid">{items.map((item) => <article className="content-card" key={item.title}><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>;
}

export function ArchitectureFlow({ items, label = 'System flow' }: { items: string[]; label?: string }) {
  return <ol className="architecture-flow" aria-label={label}>{items.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong></li>)}</ol>;
}

export function NumberedProcess({ items }: { items: { title: string; description: string }[] }) {
  return <ol className="process-grid">{items.map((item, index) => <li key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.description}</p></li>)}</ol>;
}

export function EnterpriseCta({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return <section className="enterprise-cta"><p className="detail-kicker">{eyebrow}</p><h2>{title}</h2><p>{body}</p><div><Link className="btn-primary" href="/contact">Discuss your project</Link><Link className="btn-secondary" href="/projects">Explore case studies</Link></div></section>;
}
