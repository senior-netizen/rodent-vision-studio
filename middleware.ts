import { NextResponse } from 'next/server';

// Admin gating happens client-side via AdminShell + useAdminGuard, since the
// Supabase session lives in localStorage (not cookies) and isn't readable here.
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
