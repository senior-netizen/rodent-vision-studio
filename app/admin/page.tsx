'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AdminShell } from '@/components/admin/admin-shell';
import { supabase } from '@/lib/supabase';

type Counts = { projects: number; posts: number };

export default function AdminHomePage() {
  const [counts, setCounts] = useState<Counts>({ projects: 0, posts: 0 });

  useEffect(() => {
    (async () => {
      const [{ count: pc }, { count: bc }] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
      ]);
      setCounts({ projects: pc ?? 0, posts: bc ?? 0 });
    })();
  }, []);

  const card: React.CSSProperties = {
    background: '#fff',
    border: '1px solid var(--border)',
    borderRadius: 16,
    padding: 24,
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
  };

  return (
    <AdminShell>
      <h1 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 32, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 24 }}>
        Overview
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
        <Link href="/admin/projects" style={card}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--mid)' }}>Projects</span>
          <p style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 40, fontWeight: 800, margin: '6px 0 4px', letterSpacing: '-1px' }}>{counts.projects}</p>
          <span style={{ fontSize: 13, color: 'var(--mid)' }}>Manage case studies →</span>
        </Link>
        <Link href="/admin/blog" style={card}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--mid)' }}>Journal</span>
          <p style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 40, fontWeight: 800, margin: '6px 0 4px', letterSpacing: '-1px' }}>{counts.posts}</p>
          <span style={{ fontSize: 13, color: 'var(--mid)' }}>Manage posts →</span>
        </Link>
      </div>
    </AdminShell>
  );
}
