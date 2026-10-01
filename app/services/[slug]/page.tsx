import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projectById } from '@/data/projects';
import { serviceBySlug, services, type ServiceSlug } from '@/data/services';
import { SapBankReconciliationPage } from '@/components/services/sap-bank-reconciliation-page';
import { ServiceDetailPage } from '@/components/services/service-detail-page';

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  if (!(params.slug in serviceBySlug)) return {};
  const service = serviceBySlug[params.slug as ServiceSlug];
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      type: 'article',
      url: `/services/${service.slug}`,
      images: [{ url: '/rodent-logo.png', alt: 'Rodent Lab engineering services' }],
    },
  };
}

export default function ServiceRoute({ params }: { params: { slug: string } }) {
  if (!(params.slug in serviceBySlug)) notFound();
  const service = serviceBySlug[params.slug as ServiceSlug];
  if (service.slug === 'sap-bank-reconciliation') return <SapBankReconciliationPage />;
  const related = service.relatedProjects.map((id) => projectById[id]).filter(Boolean);
  return <ServiceDetailPage service={service} related={related} />;
}
