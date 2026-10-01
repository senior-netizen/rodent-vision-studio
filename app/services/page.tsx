import type { Metadata } from 'next';
import Link from 'next/link';
import { services } from '@/data/services';

export const metadata: Metadata = {
  title: 'Engineering Services | Rodent Lab',
  description:
    'Software, connected systems, enterprise automation and physical-system engineering built around real operational requirements.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Engineering Services | Rodent Lab',
    description: 'Explore web, mobile, IoT, robotics and SAP finance-automation engineering from Rodent Lab.',
    type: 'website',
    url: '/services',
  },
};

export default function ServicesPage() {
  return (
    <main>
      <section className="relative pb-12 pt-28 md:pb-20 md:pt-36">
        <div className="container-wide">
          <div className="mb-6 flex items-center gap-4">
            <Link href="/" className="text-caption transition-colors duration-300 hover:text-fg-muted">
              ← Back
            </Link>
            <span className="h-px w-6 bg-border" />
            <span className="text-label">What we build</span>
          </div>
          <h1 className="text-display text-[clamp(2.75rem,7vw,6rem)]">Engineering Services</h1>
          <p className="text-body mt-6 max-w-2xl text-lg">
            Software, connected systems and automation built around real operational requirements—from public interfaces to field equipment and enterprise finance workflows.
          </p>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-wide">
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="card-glass group flex flex-col gap-4 p-8 transition-colors duration-300 hover:border-border-hover"
              >
                <span className="text-label">{service.eyebrow}</span>
                {service.category && <span className="service-category">{service.category}</span>}
                <h2 className="text-heading text-3xl">{service.name}</h2>
                <p className="text-body text-base leading-relaxed">{service.summary}</p>
                {service.tags && (
                  <div className="service-tags" aria-label={`${service.name} capabilities`}>
                    {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                )}
                <span className="mt-auto text-caption transition-colors duration-300 group-hover:text-fg-muted">
                  Explore {service.name} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
