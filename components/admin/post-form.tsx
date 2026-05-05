'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export type PostFormValues = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_image: string;
  published: boolean;
  published_at: string;
};

export const emptyPost: PostFormValues = {
  slug: '', title: '', excerpt: '', body: '', cover_image: '',
  published: true, published_at: new Date().toISOString().slice(0, 10),
};

export function PostForm({ initial }: { initial: PostFormValues }) {
  const router = useRouter();
  const [v, setV] = useState<PostFormValues>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof PostFormValues>(key: K, value: PostFormValues[K]) {
    setV((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = {
      slug: v.slug.trim(),
      title: v.title.trim(),
      excerpt: v.excerpt,
      body: v.body,
      cover_image: v.cover_image.trim() || null,
      published: v.published,
      published_at: new Date(v.published_at).toISOString(),
    };
    const op = v.id
      ? supabase.from('blog_posts').update(payload).eq('id', v.id)
      : supabase.from('blog_posts').insert(payload);
    const { error } = await op;
    setSaving(false);
    if (error) { setError(error.message); return; }
    router.push('/admin/blog');
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 16, maxWidth: 820 }}>
      <Field label="Title *"><input style={input} required value={v.title} onChange={(e) => update('title', e.target.value)} /></Field>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Slug *"><input style={input} required value={v.slug} onChange={(e) => update('slug', e.target.value)} /></Field>
        <Field label="Published date"><input type="date" style={input} value={v.published_at.slice(0, 10)} onChange={(e) => update('published_at', e.target.value)} /></Field>
      </div>
      <Field label="Cover image URL"><input style={input} value={v.cover_image} onChange={(e) => update('cover_image', e.target.value)} /></Field>
      <Field label="Excerpt"><textarea style={{ ...input, minHeight: 80, resize: 'vertical' }} value={v.excerpt} onChange={(e) => update('excerpt', e.target.value)} /></Field>
      <Field label="Body"><textarea style={{ ...input, minHeight: 260, resize: 'vertical', fontFamily: 'var(--font-inter), inherit' }} value={v.body} onChange={(e) => update('body', e.target.value)} /></Field>
      <label style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 14 }}>
        <input type="checkbox" checked={v.published} onChange={(e) => update('published', e.target.checked)} />
        Published
      </label>
      {error ? <p style={{ color: '#b91c1c', fontSize: 13 }}>{error}</p> : null}
      <div style={{ display: 'flex', gap: 10 }}>
        <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save post'}</button>
        <button type="button" onClick={() => router.back()} style={{ background: 'transparent', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 16px', fontSize: 14, cursor: 'pointer' }}>Cancel</button>
      </div>
    </form>
  );
}

const input: React.CSSProperties = { width: '100%', padding: '0.7rem 0.9rem', borderRadius: 10, border: '1px solid var(--border)', background: '#fff', fontFamily: 'inherit', fontSize: 14, outline: 'none' };

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: 'grid', gap: 6 }}>
      <span style={{ fontSize: 11, letterSpacing: 1.2, textTransform: 'uppercase', color: 'var(--mid)', fontWeight: 600 }}>{label}</span>
      {children}
    </label>
  );
}
