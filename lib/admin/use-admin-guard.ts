'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export type AdminGuardState = {
  loading: boolean;
  isAdmin: boolean;
  email: string | null;
};

export function useAdminGuard(): AdminGuardState {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState<AdminGuardState>({ loading: true, isAdmin: false, email: null });

  useEffect(() => {
    let cancelled = false;

    async function check(session: Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session']) {
      if (!session) {
        if (!cancelled) {
          setState({ loading: false, isAdmin: false, email: null });
          if (pathname !== '/admin/login') router.replace('/admin/login');
        }
        return;
      }
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .maybeSingle();
      if (cancelled) return;
      if (error || !data) {
        setState({ loading: false, isAdmin: false, email: session.user.email ?? null });
      } else {
        setState({ loading: false, isAdmin: true, email: session.user.email ?? null });
      }
    }

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      check(session);
    });
    supabase.auth.getSession().then(({ data }) => check(data.session));

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [router, pathname]);

  return state;
}
