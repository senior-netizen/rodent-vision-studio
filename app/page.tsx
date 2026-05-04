import type { Metadata } from 'next';
import HomePage from './page.client';

export const metadata: Metadata = {
  title: 'Rodent, Inc. — Web, Mobile, IoT & Robotics Systems',
  description:
    'Rodent, Inc. designs and builds production-ready web, mobile, IoT, and robotics systems for ambitious teams.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Rodent, Inc. — Web, Mobile, IoT & Robotics Systems',
    description:
      'Rodent, Inc. designs and builds production-ready web, mobile, IoT, and robotics systems for ambitious teams.',
    type: 'website',
    url: '/',
    images: [{ url: '/rodent-logo.png', alt: 'Rodent, Inc. logo' }],
  },
};

export default HomePage;
