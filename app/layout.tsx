import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import './globals.css';
import { SmoothScrollProvider } from '@/components/sections/smooth-scroll-provider';
import Script from 'next/script';
import { getSiteUrl, PUBLIC_BRAND_LABEL } from '@/lib/site-url';

const fontVariables: CSSProperties = {
  '--font-syne': '"Segoe UI", "Inter", "Helvetica Neue", Arial, sans-serif',
  '--font-dm-sans': '"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
} as CSSProperties;


export const metadata: Metadata = {
  title: {
    default: 'Rodent — Engineering Digital Infrastructure for Africa',
    template: '%s | Rodent',
  },
  description:
    'Rodent, a division of Squirrellabs Technologies (Private) Limited, builds web platforms, mobile applications, IoT systems, and robotics solutions.',
  metadataBase: getSiteUrl(),
  applicationName: PUBLIC_BRAND_LABEL,
  authors: [{ name: PUBLIC_BRAND_LABEL }],
  keywords: ['Rodent', 'Squirrellabs Technologies', 'web systems', 'mobile applications', 'IoT', 'robotics', 'Africa', 'product engineering'],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Rodent — Engineering Digital Infrastructure for Africa',
    description:
      'Web platforms, mobile applications, and connected systems built around real operational needs.',
    type: 'website',
    siteName: PUBLIC_BRAND_LABEL,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rodent',
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
