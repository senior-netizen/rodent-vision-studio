import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import './globals.css';
import { SmoothScrollProvider } from '@/components/sections/smooth-scroll-provider';
import Script from 'next/script';

const fontVariables: CSSProperties = {
  '--font-syne': '"Segoe UI", "Inter", "Helvetica Neue", Arial, sans-serif',
  '--font-dm-sans': '"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
} as CSSProperties;


function resolveMetadataBase(): URL {
  const explicitSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (explicitSiteUrl) {
    return new URL(explicitSiteUrl);
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    return new URL(`https://${vercelUrl}`);
  }

  return new URL('http://localhost:3000');
}

export const metadata: Metadata = {
  title: {
    default: 'Rodent, Inc. — Engineering Digital Infrastructure for Africa',
    template: '%s | Rodent, Inc.',
  },
  description:
    'We design and build production-grade systems across web, mobile, IoT, and robotics—focused on performance, reliability, and real-world deployment.',
  metadataBase: resolveMetadataBase(),
  applicationName: 'Rodent, Inc.',
  authors: [{ name: 'Rodent, Inc.' }],
  keywords: ['Rodent Inc', 'web systems', 'mobile applications', 'IoT', 'robotics', 'Africa', 'product engineering'],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Rodent, Inc. — Engineering Digital Infrastructure for Africa',
    description:
      'Production-grade web, mobile, IoT, and robotics systems engineered for performance, reliability, and real-world deployment.',
    type: 'website',
    siteName: 'Rodent, Inc.',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rodent, Inc.',
    description: 'Engineering digital infrastructure for Africa.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={fontVariables}>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <Script src="/awsmd-motion.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
