'use client';

import { useEffect, useState } from 'react';
import { AdminShell } from '@/components/admin/admin-shell';
import { ProjectForm, ProjectFormValues, emptyProject } from '@/components/admin/project-form';
import { supabase } from '@/lib/supabase';

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const [initial, setInitial] = useState<ProjectFormValues | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('projects').select('*').eq('id', params.id).maybeSingle();
      if (error) { setError(error.message); return; }
      if (!data) { setError('Not found'); return; }
      setInitial({
        ...emptyProject,
        id: data.id,
        slug: data.slug ?? '',
        name: data.name ?? '',
        category: data.category ?? '',
        color: data.color ?? '#6366f1',
        role: data.role ?? '',
        url: data.url ?? '',
        live_url: data.live_url ?? '',
        repo_url: data.repo_url ?? '',
        tagline: data.tagline ?? '',
        problem: data.problem ?? '',
        solution: data.solution ?? '',
        result: data.result ?? '',
        hero_image: data.hero_image ?? '',
        position: data.position ?? 0,
        published: data.published ?? true,
      });
    })();
  }, [params.id]);

  return (
    <AdminShell>
      <h1 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 32, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 24 }}>
        Edit project
      </h1>
      {error ? <p style={{ color: '#b91c1c' }}>{error}</p> : null}
      {initial ? <ProjectForm initial={initial} /> : !error ? <p style={{ color: 'var(--mid)' }}>Loading…</p> : null}
    </AdminShell>
  );
}
