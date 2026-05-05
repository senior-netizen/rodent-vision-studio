'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { useAdminGuard } from '@/lib/admin/use-admin-guard';

export function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { loading, isAdmin, email } = useAdminGuard();

  if (loading) {
    return (
      <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', color: 'var(--mid)', fontSize: 14 }}>
        Checking access…
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem' }}>
        <div style={{ maxWidth: 420, textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 28, fontWeight: 800, marginBottom: 12 }}>
            Access denied
          </h1>
          <p style={{ color: 'var(--mid)', marginBottom: 18 }}>
            {email ? `Signed in as ${email}, but this account isn’t an admin.` : 'Sign in with an admin account to continue.'}
          </p>
          <button
            type="button"
            className="btn-primary"
            onClick={async () => { await supabase.auth.signOut(); router.replace('/admin/login'); }}
          >
            Sign out
          </button>
        </div>
      </main>
    );
  }

  const navItem = (href: string, label: string) => {
    const active = pathname === href || pathname.startsWith(href + '/');
    return (
      <Link
        href={href}
        style={{
          padding: '10px 14px',
          borderRadius: 8,
          fontSize: 13,
          fontWeight: 600,
          textDecoration: 'none',
          color: active ? '#fff' : 'var(--dark)',
          background: active ? '#111' : 'transparent',
          letterSpacing: 0.2,
        }}
      >
        {label}
      </Link>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f8fb' }}>
      <header style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <Link href="/admin" style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 800, fontSize: 18, letterSpacing: '-0.3px', textDecoration: 'none', color: 'var(--dark)' }}>
            Rodent / Admin
          </Link>
          <nav style={{ display: 'flex', gap: 4 }}>
            {navItem('/admin', 'Overview')}
            {navItem('/admin/projects', 'Projects')}
            {navItem('/admin/blog', 'Journal')}
          </nav>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 13, color: 'var(--mid)' }}>
          <span>{email}</span>
          <button
            type="button"
            onClick={async () => { await supabase.auth.signOut(); router.replace('/admin/login'); }}
            style={{ background: 'transparent', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 12px', fontSize: 12, cursor: 'pointer' }}
          >
            Sign out
          </button>
        </div>
      </header>
      <div style={{ padding: '32px 28px', maxWidth: 1200, margin: '0 auto' }}>{children}</div>
    </div>
  );
}
