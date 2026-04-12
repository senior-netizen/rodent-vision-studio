import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import './globals.css';
import { SmoothScrollProvider } from '@/components/sections/smooth-scroll-provider';

const fontVariables: CSSProperties = {
  '--font-syne': '"Segoe UI", "Inter", "Helvetica Neue", Arial, sans-serif',
  '--font-dm-sans': '"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
} as CSSProperties;

export const metadata: Metadata = {
  title: 'Rodent, Inc. — Engineering Digital Infrastructure for Africa',
  description: 'We design and build production-grade systems across web, mobile, IoT, and robotics—focused on performance, reliability, and real-world deployment.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={fontVariables}>
      <body><SmoothScrollProvider>{children}</SmoothScrollProvider></body>
    </html>
  );
}
