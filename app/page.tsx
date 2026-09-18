import type { Metadata } from 'next';
import HomePage from './page.client';

export const metadata: Metadata = {
  title: 'Rodent — Web, Mobile, IoT & Robotics Systems',
  description:
    'Rodent, a division of Squirrellabs Technologies (Private) Limited, builds web platforms, mobile applications, IoT systems, and robotics solutions.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Rodent — Web, Mobile, IoT & Robotics Systems',
    description:
      'Rodent, a division of Squirrellabs Technologies (Private) Limited, builds web platforms, mobile applications, IoT systems, and robotics solutions.',
    type: 'website',
    url: '/',
    images: [{ url: '/rodent-logo.png', alt: 'Rodent logo' }],
  },
};

const organizationData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Squirrellabs Technologies (Private) Limited',
  url: 'https://rodent.co.zw',
  department: {
    '@type': 'Organization',
    name: 'Rodent',
    description: 'The software and hardware engineering division of Squirrellabs Technologies (Private) Limited.',
    url: 'https://rodent.co.zw',
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <HomePage />
    </>
  );
}
