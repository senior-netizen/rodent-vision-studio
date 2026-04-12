import type { Metadata } from 'next';
import { DM_Sans, Syne } from 'next/font/google';
import './globals.css';
import { SmoothScrollProvider } from '@/components/sections/smooth-scroll-provider';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500'],
});

export const metadata: Metadata = {
  title: 'Rodent, Inc. — Engineering Digital Infrastructure for Africa',
  description: 'We design and build production-grade systems across web, mobile, IoT, and robotics—focused on performance, reliability, and real-world deployment.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body><SmoothScrollProvider>{children}</SmoothScrollProvider></body>
    </html>
  );
}
