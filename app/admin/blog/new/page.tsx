'use client';

import { AdminShell } from '@/components/admin/admin-shell';
import { PostForm, emptyPost } from '@/components/admin/post-form';

export default function NewPostPage() {
  return (
    <AdminShell>
      <h1 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 32, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 24 }}>New post</h1>
      <PostForm initial={emptyPost} />
    </AdminShell>
  );
}
