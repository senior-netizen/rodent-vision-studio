'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { blogPosts } from '@/data/blog';

const easeCurve: [number, number, number, number] = [0.16, 1, 0.3, 1];

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeCurve } },
};

export default function BlogPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Header */}
      <section
        style={{
          padding: '160px 2rem 80px',
          background: 'linear-gradient(160deg, #ececf4 0%, #f8f8fb 48%, #f1f0f7 100%)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeCurve }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}
          >
            <div style={{ height: 1, width: 40, background: 'var(--teal)' }} />
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--mid)' }}>
              Journal
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: easeCurve, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 'clamp(36px, 6vw, 64px)',
              fontWeight: 800,
              letterSpacing: '-2px',
              lineHeight: 1.05,
              color: 'var(--dark)',
            }}
          >
            Thinking in Systems
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeCurve, delay: 0.3 }}
            style={{ fontSize: 16, color: 'var(--mid)', maxWidth: 480, lineHeight: 1.7, marginTop: 16 }}
          >
            Notes on infrastructure engineering, operational interfaces, and systems that work.
          </motion.p>
        </div>
      </section>

      {/* Posts */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '60px 2rem 100px' }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          style={{ display: 'grid', gap: 0 }}
        >
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              variants={staggerItem}
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <Link
                href={`/blog/${post.slug}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  alignItems: 'center',
                  gap: 24,
                  padding: '32px 0',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'opacity 0.2s',
                }}
                className="hover-scale"
              >
                <div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                      color: 'var(--teal)',
                      marginBottom: 8,
                      display: 'block',
                    }}
                  >
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <h2
                    style={{
                      fontFamily: 'var(--font-syne), sans-serif',
                      fontSize: 'clamp(20px, 3vw, 28px)',
                      fontWeight: 700,
                      letterSpacing: '-0.5px',
                      lineHeight: 1.2,
                      marginBottom: 8,
                    }}
                  >
                    {post.title}
                  </h2>
                  <p style={{ color: 'var(--mid)', fontSize: 14, lineHeight: 1.6, maxWidth: 540 }}>
                    {post.excerpt}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--mid)',
                    whiteSpace: 'nowrap',
                    padding: '8px 16px',
                    border: '1px solid var(--border)',
                    borderRadius: 100,
                    transition: 'all 0.2s',
                  }}
                >
                  Read →
                </span>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
