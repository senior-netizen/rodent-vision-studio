import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { projectConfigs } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Engineering Case Studies | Rodent Lab',
  description: 'Explore Rodent Lab case studies across web platforms, IoT telemetry, interactive products, developer tooling and commercial websites.',
  alternates: { canonical: '/projects' },
  openGraph: { title: 'Engineering Case Studies | Rodent Lab', description: 'The operational problems, architecture and engineering decisions behind systems built by Rodent.', type: 'website', url: '/projects' },
};

export default function ProjectsPage() {
  return <main className="detail-page">
    <section className="detail-hero" style={{ gridTemplateColumns: '1fr' }}><div><Link href="/" className="detail-back">← Home</Link><p className="detail-kicker">Selected work</p><h1>Engineering case studies.</h1><p className="detail-lead">The problems, system boundaries and decisions behind software, connected products and public platforms built by Rodent.</p></div></section>
    <section className="detail-section"><div className="project-index-grid">{projectConfigs.map((project) => <Link href={`/projects/${project.slug}`} key={project.id} className="project-index-card"><div className="project-index-image"><Image src={project.visuals.preview} alt={`${project.name} project preview`} fill sizes="(max-width: 700px) 100vw, 50vw" /></div><div><span>{project.category} · {project.projectType}</span><h2>{project.name}</h2><p>{project.tagline}</p><ul>{project.stack.slice(0,3).map((technology) => <li key={technology}>{technology}</li>)}</ul><strong>View case study →</strong></div></Link>)}</div></section>
  </main>;
}
