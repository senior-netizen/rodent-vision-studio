'use client';

import { AdminShell } from '@/components/admin/admin-shell';
import { ProjectForm, emptyProject } from '@/components/admin/project-form';

export default function NewProjectPage() {
  return (
    <AdminShell>
      <h1 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 32, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 24 }}>
        New project
      </h1>
      <ProjectForm initial={emptyProject} />
    </AdminShell>
  );
}
