import { NextRequest, NextResponse } from 'next/server';

type SupabaseUser = { id: string };

function readSupabaseSessionCookie(request: NextRequest): string | null {
  const authCookies = request.cookies
    .getAll()
    .filter((cookie) => cookie.name.includes('auth-token'))
    .sort((a, b) => a.name.localeCompare(b.name));

  if (authCookies.length === 0) return null;

  const raw = authCookies.map((cookie) => cookie.value).join('');

  try {
    const parsed = JSON.parse(decodeURIComponent(raw));
    if (Array.isArray(parsed) && typeof parsed[0] === 'string') return parsed[0];
    if (parsed && typeof parsed === 'object' && typeof parsed.access_token === 'string') return parsed.access_token;
  } catch {
    return null;
  }

  return null;
}

async function getCurrentUser(supabaseUrl: string, anonKey: string, accessToken: string): Promise<SupabaseUser | null> {
  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) return null;

  const payload = (await response.json()) as SupabaseUser;
  return payload?.id ? payload : null;
}

async function isAdminUser(supabaseUrl: string, anonKey: string, accessToken: string, userId: string): Promise<boolean> {
  const url = new URL(`${supabaseUrl}/rest/v1/user_roles`);
  url.searchParams.set('select', 'role');
  url.searchParams.set('user_id', `eq.${userId}`);
  url.searchParams.set('role', 'eq.admin');
  url.searchParams.set('limit', '1');

  const response = await fetch(url.toString(), {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) return false;

  const roles = (await response.json()) as Array<{ role?: string }>;
  return Array.isArray(roles) && roles.some((entry) => entry.role === 'admin');
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/admin')) return NextResponse.next();
  if (pathname === '/admin/login') return NextResponse.next();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  const accessToken = readSupabaseSessionCookie(request);
  if (!accessToken) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  const user = await getCurrentUser(supabaseUrl, anonKey, accessToken);
  if (!user) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  const isAdmin = await isAdminUser(supabaseUrl, anonKey, accessToken, user.id);
  if (!isAdmin) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
