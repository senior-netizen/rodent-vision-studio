import Image from 'next/image';
import Link from 'next/link';
import type { ProjectConfig } from '@/data/projects';
import { ArchitectureFlow, CapabilityGrid, EnterpriseCta } from '@/components/content/content-sections';

function Section({ kicker, title, children }: { kicker: string; title: string; children: React.ReactNode }) {
  return <section className="detail-section"><header><p className="detail-kicker">{kicker}</p><h2>{title}</h2></header>{children}</section>;
}

export function CaseStudyPage({ project }: { project: ProjectConfig }) {
  const publicUrl = (project.status === 'live' || project.status === 'staging') ? project.links.live : undefined;
  return <main className={`detail-page project-detail project-${project.slug}`}>
    <section className="project-hero">
      <div className="project-hero-copy"><Link href="/projects" className="detail-back">← Case-study library</Link><p className="detail-kicker">{project.category}</p><h1>{project.name}</h1><p className="detail-lead">{project.tagline}</p><dl className="project-facts"><div><dt>Rodent role</dt><dd>{project.role}</dd></div><div><dt>Project type</dt><dd>{project.projectType}</dd></div><div><dt>Scope</dt><dd>{project.summary.scope}</dd></div></dl>{publicUrl && <a className="btn-secondary" href={publicUrl} target="_blank" rel="noreferrer">Open public {project.status === 'staging' ? 'preview' : 'project'} ↗</a>}</div>
      <figure><Image src={project.visuals.preview} alt={`${project.name} interface preview`} width={1600} height={900} priority /><figcaption>Project interface</figcaption></figure>
    </section>

    <Section kicker="The context" title="Why this system exists."><div className="narrative"><p>{project.context}</p></div></Section>
    <Section kicker="The problem" title="The operational or engineering gap."><div className="narrative"><p>{project.problem}</p></div></Section>
    <Section kicker="Key requirements" title="What the system needed to make possible."><ul className="requirement-grid">{project.requirements.map((requirement) => <li key={requirement}>✓ {requirement}</li>)}</ul></Section>
    {project.solution && <Section kicker="What Rodent built" title="A system, not a framework demonstration."><div className="narrative"><p>{project.solution}</p></div></Section>}
    <Section kicker="Capabilities delivered" title="The working parts of the product."><CapabilityGrid items={project.capabilities} /></Section>

    <Section kicker="System architecture" title="Responsibilities separated into understandable layers.">
      {project.visuals.diagram && <figure className="architecture-image"><Image src={project.visuals.diagram} alt={`${project.name} architecture diagram`} width={1600} height={900} /><figcaption>Project architecture</figcaption></figure>}
      <ArchitectureFlow items={project.architecture} label={`${project.name} architecture`} />
    </Section>
    <Section kicker="Data / process flow" title="How information moves through the system."><ArchitectureFlow items={project.dataFlow} label={`${project.name} data flow`} /></Section>

    <Section kicker="Engineering decisions" title="Choices explained in operational terms."><div className="content-grid">{project.decisionDetails.map((decision) => <article className="content-card" key={decision.title}><h3>{decision.title}</h3><p>{decision.description}</p></article>)}</div></Section>
    <Section kicker="Engineering challenges" title="Constraints addressed without inflated claims."><CapabilityGrid items={project.challenges} /></Section>

    <Section kicker="Technology in context" title="Tools selected to support the system."><div className="detail-split"><p>Technology supports the product’s interfaces, data and release path. It is part of the engineering explanation, not the outcome itself.</p><ul className="tag-list">{project.stack.map((item) => <li key={item}>{item}</li>)}</ul></div></Section>

    {project.visuals.screenshot !== project.visuals.preview && <Section kicker="Operational interface" title="The system as operators see it."><figure className="architecture-image"><Image src={project.visuals.screenshot} alt={`${project.name} operational interface`} width={1600} height={900} /><figcaption>Operational interface screenshot</figcaption></figure></Section>}

    <Section kicker="Outcome" title="A demonstrable result, without invented metrics."><div className="outcome-panel"><p>{project.result || project.outcome}</p><strong>{project.outcome}</strong></div></Section>
    <Section kicker="Related services" title="Capabilities behind this project."><div className="related-grid">{project.relatedServices.map((service) => <Link href={service.href} key={service.href}><span>Engineering service</span><h3>{service.name}</h3><strong>Explore service →</strong></Link>)}</div></Section>
    <EnterpriseCta eyebrow="Build something similar" title="Need a system with similar capabilities?" body="Tell Rodent about the operational problem, users and constraints—not just the technology you think you need." />
  </main>;
}
