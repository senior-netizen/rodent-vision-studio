import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rodent Lab Insights',
  description: 'Engineering notes, build stories and practical thinking from Rodent Lab.',
  alternates: {
    canonical: '/insights',
    types: { 'application/rss+xml': '/rss.xml' },
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
