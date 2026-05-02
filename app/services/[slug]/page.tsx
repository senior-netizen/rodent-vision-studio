import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projectById } from '@/data/projects';
import { serviceBySlug, services } from '@/data/services';

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  if (!(params.slug in serviceBySlug)) return {};
  const service = serviceBySlug[params.slug as keyof typeof serviceBySlug];
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      type: 'article',
      url: `/services/${service.slug}`,
    },
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  if (!(params.slug in serviceBySlug)) notFound();
  const service = serviceBySlug[params.slug as keyof typeof serviceBySlug];
  const related = service.relatedProjects
    .map((id) => projectById[id])
    .filter(Boolean);

  return (
    <main>
      {/* Hero */}
      <section className="relative pb-16 pt-28 md:pb-24 md:pt-32">
        <div className="container-wide">
          <div className="mb-6 flex items-center gap-4">
            <Link href="/services" className="text-caption transition-colors duration-300 hover:text-fg-muted">
              ← Services
            </Link>
            <span className="h-px w-6 bg-border" />
            <span className="text-label">{service.slug.toUpperCase()}</span>
          </div>
          <h1 className="text-display text-[clamp(3rem,8vw,7rem)]">{service.name}</h1>
          <p className="text-body mt-6 max-w-3xl text-lg">{service.capability}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
      </section>

      {/* Deliverables */}
      <section className="section-shell">
        <div className="container-wide editorial-grid">
          <div className="col-span-12 md:col-span-1">
            <span className="section-number">01</span>
          </div>
          <div className="col-span-12 md:col-span-4">
            <h2 className="text-heading text-[clamp(2rem,3vw,3rem)]">Deliverables</h2>
          </div>
          <ul className="col-span-12 grid gap-3 md:col-span-7">
            {service.deliverables.map((item) => (
              <li key={item} className="card-glass p-5 text-body text-sm">{item}</li>
            ))}
          </ul>
        </div>
        <div className="container-wide">
          <div className="divider mt-16" />
        </div>
      </section>

      {/* Process */}
      <section className="section-shell">
        <div className="container-wide editorial-grid">
          <div className="col-span-12 md:col-span-1">
            <span className="section-number">02</span>
          </div>
          <div className="col-span-12 md:col-span-4">
            <h2 className="text-heading text-[clamp(2rem,3vw,3rem)]">Process</h2>
          </div>
          <div className="col-span-12 grid gap-4 md:col-span-7 md:grid-cols-2">
            {service.process.map((step, idx) => (
              <div key={step.title} className="card-glass p-6">
                <span className="text-label">0{idx + 1}</span>
                <h3 className="text-heading mt-3 text-xl">{step.title}</h3>
                <p className="text-body mt-2 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="container-wide">
          <div className="divider mt-16" />
        </div>
      </section>

      {/* Technologies */}
      <section className="section-shell">
        <div className="container-wide editorial-grid">
          <div className="col-span-12 md:col-span-1">
            <span className="section-number">03</span>
          </div>
          <div className="col-span-12 md:col-span-4">
            <h2 className="text-heading text-[clamp(2rem,3vw,3rem)]">Technologies</h2>
          </div>
          <div className="col-span-12 flex flex-wrap gap-2 md:col-span-7">
            {service.technologies.map((t) => (
              <span key={t} className="rounded-full border border-border px-4 py-2 text-caption">{t}</span>
            ))}
          </div>
        </div>
        <div className="container-wide">
          <div className="divider mt-16" />
        </div>
      </section>

      {/* Related projects */}
      {related.length > 0 && (
        <section className="section-shell">
          <div className="container-wide editorial-grid">
            <div className="col-span-12 md:col-span-1">
              <span className="section-number">04</span>
            </div>
            <div className="col-span-12 md:col-span-4">
              <h2 className="text-heading text-[clamp(2rem,3vw,3rem)]">Related work</h2>
            </div>
            <div className="col-span-12 grid gap-4 md:col-span-7 md:grid-cols-2">
              {related.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="card-glass group flex flex-col gap-3 p-6 transition-colors duration-300 hover:border-border-hover"
                >
                  <span className="text-label">{project.category}</span>
                  <h3 className="text-heading text-xl">{project.name}</h3>
                  {project.tagline && (
                    <p className="text-body text-sm leading-relaxed">{project.tagline}</p>
                  )}
                  <span className="mt-2 text-caption transition-colors duration-300 group-hover:text-fg-muted">
                    View case study →
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div className="container-wide">
            <div className="divider mt-16" />
          </div>
        </section>
      )}

      {/* FAQ */}
      {service.faqs.length > 0 && (
        <section className="section-shell">
          <div className="container-wide editorial-grid">
            <div className="col-span-12 md:col-span-1">
              <span className="section-number">05</span>
            </div>
            <div className="col-span-12 md:col-span-4">
              <h2 className="text-heading text-[clamp(2rem,3vw,3rem)]">FAQ</h2>
            </div>
            <div className="col-span-12 grid gap-4 md:col-span-7">
              {service.faqs.map((faq) => (
                <div key={faq.q} className="card-glass p-6">
                  <h3 className="text-heading text-lg">{faq.q}</h3>
                  <p className="text-body mt-3 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="container-wide">
            <div className="divider mt-16" />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-shell">
        <div className="container-wide">
          <div className="card-glass flex flex-col items-start gap-6 p-10 md:flex-row md:items-center md:justify-between">
            <p className="text-heading max-w-2xl text-2xl leading-snug">{service.cta}</p>
            <Link
              href="/contact"
              className="rounded-md border border-accent px-6 py-3 text-caption text-accent transition-colors hover:bg-accent/10"
            >
              Start a project
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
