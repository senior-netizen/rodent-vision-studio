import { notFound } from 'next/navigation';
import { blogBySlug, blogPosts } from '@/data/blog';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  if (!(params.slug in blogBySlug)) notFound();

  const post = blogBySlug[params.slug as keyof typeof blogBySlug];

  return (
    <main style={{ maxWidth: 860, margin: '0 auto', padding: '6rem 1rem 2rem' }}>
      <h1 style={{ fontFamily: 'var(--font-syne)', marginBottom: '0.6rem' }}>{post.title}</h1>
      <p style={{ color: 'var(--mid)', marginBottom: '1rem' }}>{post.publishedAt}</p>
      <p>{post.body}</p>
    </main>
  );
}
