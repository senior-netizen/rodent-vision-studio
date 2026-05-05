'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AdminShell } from '@/components/admin/admin-shell';
import { supabase } from '@/lib/supabase';

type ProjectRow = {
  id: string;
  slug: string;
  name: string;
  category: string;
  published: boolean;
  position: number;
  updated_at: string;
};

export default function AdminProjectsPage() {
  const [rows, setRows] = useState<ProjectRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const { data, error } = await supabase
      .from('projects')
      .select('id, slug, name, category, published, position, updated_at')
      .order('position', { ascending: true });
    if (error) setError(error.message);
    else setRows((data ?? []) as ProjectRow[]);
  }

  useEffect(() => { load(); }, []);

  async function remove(id: string) {
    if (!confirm('Delete this project?')) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) alert(error.message);
    else load();
  }

  return (
    <AdminShell>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, gap: 16, flexWrap: 'wrap' }}>
        <h1 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 32, fontWeight: 800, letterSpacing: '-0.5px' }}>
          Projects
        </h1>
        <Link href="/admin/projects/new" className="btn-primary" style={{ textDecoration: 'none' }}>
          New project
        </Link>
      </div>
      {error ? <p style={{ color: '#b91c1c' }}>{error}</p> : null}
      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
        {rows === null ? (
          <p style={{ padding: 24, color: 'var(--mid)' }}>Loading…</p>
        ) : rows.length === 0 ? (
          <p style={{ padding: 24, color: 'var(--mid)' }}>No projects yet.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#f8f8fb', textAlign: 'left' }}>
                <th style={th}>Name</th>
                <th style={th}>Slug</th>
                <th style={th}>Category</th>
                <th style={th}>Status</th>
                <th style={{ ...th, width: 1 }}></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={td}><Link href={`/admin/projects/${r.id}`} style={{ color: 'inherit', fontWeight: 600 }}>{r.name}</Link></td>
                  <td style={{ ...td, color: 'var(--mid)' }}>{r.slug}</td>
                  <td style={{ ...td, color: 'var(--mid)' }}>{r.category}</td>
                  <td style={td}>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: '4px 8px', borderRadius: 999, background: r.published ? '#dcfce7' : '#fee2e2', color: r.published ? '#166534' : '#991b1b' }}>
                      {r.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td style={td}>
                    <button onClick={() => remove(r.id)} style={btnGhost}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminShell>
  );
}

const th: React.CSSProperties = { padding: '12px 16px', fontSize: 11, letterSpacing: 1.2, textTransform: 'uppercase', color: 'var(--mid)', fontWeight: 600 };
const td: React.CSSProperties = { padding: '14px 16px' };
const btnGhost: React.CSSProperties = { background: 'transparent', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 12px', fontSize: 12, cursor: 'pointer', color: '#b91c1c' };
