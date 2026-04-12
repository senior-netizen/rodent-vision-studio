import Link from 'next/link';
import { blogPosts } from '@/data/blog';

export default function BlogPage() {
  return (
    <main style={{ maxWidth: 980, margin: '0 auto', padding: '6rem 1rem 2rem' }}>
      <h1 style={{ fontFamily: 'var(--font-syne)', marginBottom: '1rem' }}>Blog</h1>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {blogPosts.map((post) => (
          <article key={post.slug} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
            <h2 style={{ fontFamily: 'var(--font-syne)' }}>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p style={{ color: 'var(--mid)' }}>{post.excerpt}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
