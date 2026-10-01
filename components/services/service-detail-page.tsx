import Link from 'next/link';
import type { Service } from '@/data/services';
import type { ProjectConfig } from '@/data/projects';
import { ArchitectureFlow, CapabilityGrid, EnterpriseCta, NumberedProcess } from '@/components/content/content-sections';
import { RelatedInsights } from '@/components/insights/related-insights';

export function ServiceDetailPage({ service, related }: { service: Service; related: ProjectConfig[] }) {
  return <main className={`detail-page detail-${service.slug}`}>
    <section className="detail-hero">
      <div><Link href="/services" className="detail-back">← Engineering services</Link><p className="detail-kicker">{service.eyebrow}</p><h1>{service.heroTitle}</h1><p className="detail-lead">{service.capability}</p><p>{service.introduction}</p><div className="detail-actions"><Link href="/contact" className="btn-primary">Discuss your project</Link><a href="#capabilities" className="btn-secondary">Explore capabilities</a></div></div>
      <div className="service-motif" aria-label={`${service.name} system motif`}>{service.flow.slice(0, 5).map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</div>)}</div>
    </section>

    <section className="detail-section" id="capabilities"><header><p className="detail-kicker">What we deliver</p><h2>Engineering capability, connected to the operation.</h2><p>Each engagement is scoped around the workflow and evidence available—not a fixed package of unnecessary features.</p></header><CapabilityGrid items={service.deliverables} /></section>

    <section className="detail-section detail-flow"><header><p className="detail-kicker">How the system works</p><h2>A clear path through the system.</h2><p>This reference flow shows the responsibilities that must connect. The final architecture depends on the project’s security, data, infrastructure and operational constraints.</p></header><ArchitectureFlow items={service.flow} label={`${service.name} reference workflow`} /></section>

    <section className="detail-section"><header><p className="detail-kicker">Integration</p><h2>Designed around real system boundaries.</h2></header><div className="detail-split"><p>{service.integrations}</p><div><span className="detail-label">Technology evidenced across Rodent work</span><ul className="tag-list">{service.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul></div></div></section>

    <section className="detail-section"><header><p className="detail-kicker">Delivery method</p><h2>From operational discovery to a maintainable release.</h2></header><NumberedProcess items={service.process} /></section>

    <section className="detail-section"><header><p className="detail-kicker">Business outcomes</p><h2>Technology in service of better operations.</h2></header><CapabilityGrid items={service.outcomes} /></section>

    <section className="detail-section"><div className="detail-split"><div><p className="detail-kicker">Who it is for</p><h2>Relevant operating contexts.</h2><p>Fit is established in discovery; this service is not presented as equally appropriate for every organisation.</p></div><ul className="audience-list">{service.audiences.map((audience) => <li key={audience}>{audience}</li>)}</ul></div></section>

    {related.length > 0 && <section className="detail-section"><header><p className="detail-kicker">Related projects</p><h2>See the capability in working systems.</h2></header><div className="related-grid">{related.map((project) => <Link href={`/projects/${project.slug}`} key={project.id}><span>{project.category}</span><h3>{project.name}</h3><p>{project.tagline}</p><strong>View case study →</strong></Link>)}</div></section>}
    <RelatedInsights service={service.slug} />

    {service.faqs.length > 0 && <section className="detail-section"><header><p className="detail-kicker">Practical questions</p><h2>Before an engagement starts.</h2></header><div className="content-grid">{service.faqs.map((faq) => <article className="content-card" key={faq.q}><h3>{faq.q}</h3><p>{faq.a}</p></article>)}</div></section>}
    <EnterpriseCta eyebrow="Start the conversation" title={service.cta} body="Bring the current process, constraints and intended users. Rodent will help define a credible next engineering step." />
  </main>;
}
