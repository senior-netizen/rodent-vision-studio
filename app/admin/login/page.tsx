'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ kind: 'error' | 'info'; text: string } | null>(null);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) router.replace('/admin');
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/admin');
    });
    return () => sub.subscription.unsubscribe();
  }, [router]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        setMessage({ kind: 'info', text: 'Account created — you can sign in now.' });
        setMode('signin');
      }
    } catch (err) {
      setMessage({ kind: 'error', text: err instanceof Error ? err.message : 'Authentication failed.' });
    } finally {
      setLoading(false);
    }
  }

  const input: React.CSSProperties = {
    width: '100%',
    padding: '0.85rem 1rem',
    borderRadius: 10,
    border: '1px solid var(--border)',
    background: '#fff',
    fontFamily: 'inherit',
    fontSize: 14,
    outline: 'none',
  };

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #ececf4 0%, #f8f8fb 48%, #f1f0f7 100%)', display: 'grid', placeItems: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: 420, background: '#fff', border: '1px solid var(--border)', borderRadius: 18, padding: '2.4rem', boxShadow: '0 25px 60px -30px rgba(15,15,30,0.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <div style={{ height: 1, width: 28, background: 'var(--teal, #14b8a6)' }} />
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--mid)' }}>
            Admin
          </span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 32, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 8 }}>
          {mode === 'signin' ? 'Sign in' : 'Create account'}
        </h1>
        <p style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 24 }}>
          {mode === 'signin' ? 'Manage projects and journal posts.' : 'First admin will be granted access automatically.'}
        </p>
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 14 }}>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={input} disabled={loading} />
          <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={input} disabled={loading} />
          <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: 6 }}>
            {loading ? 'Working…' : mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        </form>
        {message ? (
          <p style={{ marginTop: 14, fontSize: 13, color: message.kind === 'error' ? '#b91c1c' : '#166534' }}>{message.text}</p>
        ) : null}
        <button
          type="button"
          onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setMessage(null); }}
          style={{ marginTop: 18, background: 'transparent', border: 'none', color: 'var(--mid)', fontSize: 13, cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
        >
          {mode === 'signin' ? 'Need an account? Create one' : 'Already have an account? Sign in'}
        </button>
      </div>
    </main>
  );
}
