'use client';

import { useEffect, useState } from 'react';
import { AdminShell } from '@/components/admin/admin-shell';
import { PostForm, PostFormValues, emptyPost } from '@/components/admin/post-form';
import { supabase } from '@/lib/supabase';

export default function EditPostPage({ params }: { params: { id: string } }) {
  const [initial, setInitial] = useState<PostFormValues | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('blog_posts').select('*').eq('id', params.id).maybeSingle();
      if (error) { setError(error.message); return; }
      if (!data) { setError('Not found'); return; }
      setInitial({
        ...emptyPost,
        id: data.id,
        slug: data.slug ?? '',
        title: data.title ?? '',
        excerpt: data.excerpt ?? '',
        body: data.body ?? '',
        cover_image: data.cover_image ?? '',
        published: data.published ?? true,
        published_at: (data.published_at ?? new Date().toISOString()).slice(0, 10),
      });
    })();
  }, [params.id]);

  return (
    <AdminShell>
      <h1 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 32, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 24 }}>Edit post</h1>
      {error ? <p style={{ color: '#b91c1c' }}>{error}</p> : null}
      {initial ? <PostForm initial={initial} /> : !error ? <p style={{ color: 'var(--mid)' }}>Loading…</p> : null}
    </AdminShell>
  );
}
