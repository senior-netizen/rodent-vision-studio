import type { Metadata } from 'next';
import Link from 'next/link';
import { services } from '@/data/services';

export const metadata: Metadata = {
  title: 'Services — Web, Mobile, IoT, Robotics | Rodent, Inc.',
  description:
    'We design and build production-grade systems across web, mobile, IoT, and robotics. Explore our service capabilities and engagement model.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Services | Rodent, Inc.',
    description: 'Production-grade web, mobile, IoT, and robotics systems engineered for real operations.',
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
          <h1 className="text-display text-[clamp(2.75rem,7vw,6rem)]">Services</h1>
          <p className="text-body mt-6 max-w-2xl text-lg">
            We design and build production-grade systems across web, mobile, IoT, and robotics — focused on
            performance, reliability, and real-world deployment.
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
                <span className="text-label">{service.slug.toUpperCase()}</span>
                <h2 className="text-heading text-3xl">{service.name}</h2>
                <p className="text-body text-base leading-relaxed">{service.summary}</p>
                <span className="mt-auto text-caption transition-colors duration-300 group-hover:text-fg-muted">
                  Read service →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
