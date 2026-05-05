'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { blogBySlug, blogPosts as staticPosts } from '@/data/blog';
import { supabase } from '@/lib/supabase';

const easeCurve: [number, number, number, number] = [0.16, 1, 0.3, 1];

type DisplayPost = { slug: string; title: string; excerpt: string; body: string; publishedAt: string };

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const staticFallback = (params.slug in blogBySlug)
    ? (blogBySlug as Record<string, { slug: string; title: string; excerpt: string; body: string; publishedAt: string }>)[params.slug]
    : null;
  const [post, setPost] = useState<DisplayPost | null>(staticFallback);
  const [allPosts, setAllPosts] = useState<DisplayPost[]>(staticPosts as unknown as DisplayPost[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [{ data: one }, { data: all }] = await Promise.all([
        supabase.from('blog_posts').select('slug, title, excerpt, body, published_at').eq('slug', params.slug).eq('published', true).maybeSingle(),
        supabase.from('blog_posts').select('slug, title, excerpt, body, published_at').eq('published', true).order('published_at', { ascending: false }),
      ]);
      if (one) setPost({ slug: one.slug, title: one.title, excerpt: one.excerpt, body: one.body, publishedAt: one.published_at });
      if (all && all.length) setAllPosts(all.map((p) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt, body: p.body, publishedAt: p.published_at })));
      setLoading(false);
    })();
  }, [params.slug]);

  if (!post && !loading) notFound();
  if (!post) {
    return <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', color: 'var(--mid)' }}>Loading…</main>;
  }
  const currentIndex = allPosts.findIndex((p) => p.slug === params.slug);
  const nextPost = allPosts[(currentIndex + 1) % Math.max(allPosts.length, 1)] ?? post;


  return (
    <main style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Hero header */}
      <section
        style={{
          padding: '160px 2rem 80px',
          background: 'linear-gradient(160deg, #ececf4 0%, #f8f8fb 48%, #f1f0f7 100%)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeCurve }}
          >
            <Link
              href="/blog"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: 'var(--mid)',
                textDecoration: 'none',
                marginBottom: 32,
                transition: 'color 0.2s',
              }}
            >
              ← Back to Journal
            </Link>
          </motion.div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: easeCurve }}
            style={{
              display: 'block',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: 'var(--teal)',
              marginBottom: 16,
            }}
          >
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: easeCurve, delay: 0.15 }}
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 800,
              letterSpacing: '-2px',
              lineHeight: 1.08,
              color: 'var(--dark)',
            }}
          >
            {post.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeCurve, delay: 0.35 }}
            style={{ fontSize: 16, color: 'var(--mid)', maxWidth: 540, lineHeight: 1.7, marginTop: 20 }}
          >
            {post.excerpt}
          </motion.p>
        </div>
      </section>

      {/* Article body */}
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '60px 2rem 80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeCurve, delay: 0.4 }}
        >
          <div
            style={{
              fontSize: 17,
              lineHeight: 1.85,
              color: '#333',
              fontFamily: 'var(--font-dm-sans), sans-serif',
            }}
          >
            {post.body}
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: easeCurve, delay: 0.6 }}
            style={{
              height: 1,
              background: 'var(--border)',
              margin: '60px 0 40px',
              transformOrigin: 'left',
            }}
          />

          {/* Next post */}
          <Link
            href={`/blog/${nextPost.slug}`}
            style={{
              display: 'block',
              padding: '24px',
              border: '1px solid var(--border)',
              borderRadius: 16,
              textDecoration: 'none',
              color: 'inherit',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            className="hover-scale"
          >
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--teal)' }}>
              Next Article →
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: '-0.5px',
                marginTop: 8,
              }}
            >
              {nextPost.title}
            </h3>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
