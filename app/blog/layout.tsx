import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Journal — Notes from Rodent',
  description:
    'Field notes on engineering web, mobile, IoT, and robotics systems from the Rodent team.',
  alternates: {
    canonical: '/blog',
    types: { 'application/rss+xml': '/blog/rss.xml' },
  },
  openGraph: {
    title: 'Journal | Rodent',
    description: 'Engineering notes on shipping practical systems.',
    type: 'website',
    url: '/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
