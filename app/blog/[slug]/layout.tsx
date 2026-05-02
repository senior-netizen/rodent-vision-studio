import type { Metadata } from 'next';
import { blogBySlug, blogPosts } from '@/data/blog';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  if (!(params.slug in blogBySlug)) return {};
  const post = blogBySlug[params.slug as keyof typeof blogBySlug];
  return {
    title: `${post.title} — Rodent, Inc.`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
    },
  };
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
