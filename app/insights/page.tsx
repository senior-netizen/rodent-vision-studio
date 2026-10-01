import type { Metadata } from 'next';
import { InsightsIndex } from '@/components/insights/insights-index';
import { publishedPosts } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Rodent Lab Insights — Engineering Notes & Build Stories',
  description: 'Engineering notes, build stories and practical thinking from the systems Rodent Lab designs and the industries we work in.',
  alternates: { canonical: '/insights', types: { 'application/rss+xml': '/rss.xml' } },
  openGraph: { title: 'Rodent Lab Insights', description: 'Engineering notes, architecture decisions, build stories and practical industry analysis.', type: 'website', url: '/insights', images: [{ url: '/visuals/rodent-logo.png', alt: 'Rodent Lab Insights' }] },
};

export default function InsightsPage() { return <InsightsIndex posts={publishedPosts} />; }
