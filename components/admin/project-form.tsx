'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export type ProjectFormValues = {
  id?: string;
  slug: string;
  name: string;
  category: string;
  color: string;
  role: string;
  url: string;
  live_url: string;
  repo_url: string;
  tagline: string;
  problem: string;
  solution: string;
  result: string;
  hero_image: string;
  position: number;
  published: boolean;
};

export const emptyProject: ProjectFormValues = {
  slug: '', name: '', category: '', color: '#6366f1', role: '',
  url: '', live_url: '', repo_url: '', tagline: '',
  problem: '', solution: '', result: '', hero_image: '',
  position: 0, published: true,
};

export function ProjectForm({ initial }: { initial: ProjectFormValues }) {
  const router = useRouter();
  const [v, setV] = useState<ProjectFormValues>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof ProjectFormValues>(key: K, value: ProjectFormValues[K]) {
    setV((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = {
      slug: v.slug.trim(),
      name: v.name.trim(),
      category: v.category.trim(),
      color: v.color || '#6366f1',
      role: v.role.trim(),
      url: v.url.trim() || null,
      live_url: v.live_url.trim() || null,
      repo_url: v.repo_url.trim() || null,
      tagline: v.tagline.trim() || null,
      problem: v.problem,
      solution: v.solution || null,
      result: v.result || null,
      hero_image: v.hero_image.trim() || null,
      position: Number(v.position) || 0,
      published: v.published,
    };
    const op = v.id
      ? supabase.from('projects').update(payload).eq('id', v.id)
      : supabase.from('projects').insert(payload);
    const { error } = await op;
    setSaving(false);
    if (error) { setError(error.message); return; }
    router.push('/admin/projects');
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 16, maxWidth: 820 }}>
      <Row>
        <Field label="Name *"><input style={input} required value={v.name} onChange={(e) => update('name', e.target.value)} /></Field>
        <Field label="Slug *"><input style={input} required value={v.slug} onChange={(e) => update('slug', e.target.value)} /></Field>
      </Row>
      <Row>
        <Field label="Category"><input style={input} value={v.category} onChange={(e) => update('category', e.target.value)} /></Field>
        <Field label="Role"><input style={input} value={v.role} onChange={(e) => update('role', e.target.value)} /></Field>
      </Row>
      <Field label="Tagline"><input style={input} value={v.tagline} onChange={(e) => update('tagline', e.target.value)} /></Field>
      <Row>
        <Field label="Live URL"><input style={input} value={v.live_url} onChange={(e) => update('live_url', e.target.value)} /></Field>
        <Field label="Repo URL"><input style={input} value={v.repo_url} onChange={(e) => update('repo_url', e.target.value)} /></Field>
      </Row>
      <Field label="External URL"><input style={input} value={v.url} onChange={(e) => update('url', e.target.value)} /></Field>
      <Field label="Hero image URL"><input style={input} value={v.hero_image} onChange={(e) => update('hero_image', e.target.value)} /></Field>
      <Row>
        <Field label="Brand colour"><input style={input} value={v.color} onChange={(e) => update('color', e.target.value)} /></Field>
        <Field label="Display order"><input type="number" style={input} value={v.position} onChange={(e) => update('position', Number(e.target.value))} /></Field>
      </Row>
      <Field label="Problem"><textarea style={{ ...input, minHeight: 100, resize: 'vertical' }} value={v.problem} onChange={(e) => update('problem', e.target.value)} /></Field>
      <Field label="Solution"><textarea style={{ ...input, minHeight: 100, resize: 'vertical' }} value={v.solution} onChange={(e) => update('solution', e.target.value)} /></Field>
      <Field label="Result"><textarea style={{ ...input, minHeight: 100, resize: 'vertical' }} value={v.result} onChange={(e) => update('result', e.target.value)} /></Field>
      <label style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 14 }}>
        <input type="checkbox" checked={v.published} onChange={(e) => update('published', e.target.checked)} />
        Published
      </label>
      {error ? <p style={{ color: '#b91c1c', fontSize: 13 }}>{error}</p> : null}
      <div style={{ display: 'flex', gap: 10 }}>
        <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save project'}</button>
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
function Row({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>{children}</div>;
}
