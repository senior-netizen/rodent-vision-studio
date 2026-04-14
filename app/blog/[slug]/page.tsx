'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { blogBySlug, blogPosts } from '@/data/blog';

const easeCurve: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  if (!(params.slug in blogBySlug)) notFound();

  const post = blogBySlug[params.slug as keyof typeof blogBySlug];
  const currentIndex = blogPosts.findIndex((p) => p.slug === params.slug);
  const nextPost = blogPosts[(currentIndex + 1) % blogPosts.length];

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
