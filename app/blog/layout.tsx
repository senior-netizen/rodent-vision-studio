import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Journal — Notes from Rodent',
  description:
    'Field notes on engineering production-grade web, mobile, IoT, and robotics systems from the Rodent team.',
  alternates: {
    canonical: '/blog',
    types: { 'application/rss+xml': '/blog/rss.xml' },
  },
  openGraph: {
    title: 'Journal | Rodent',
    description: 'Engineering notes on shipping production-grade systems.',
    type: 'website',
    url: '/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
