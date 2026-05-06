import { NextRequest, NextResponse } from 'next/server';

type SupabaseUser = { id: string };

type SessionLike = { access_token?: string };

function decodeCookiePayload(value: string): unknown {
  const decoded = decodeURIComponent(value);

  if (decoded.startsWith('base64-')) {
    const payload = decoded.slice('base64-'.length);
    return JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
  }

  return JSON.parse(decoded);
}

function extractAccessToken(payload: unknown): string | null {
  if (Array.isArray(payload) && payload.length > 0) {
    const first = payload[0];
    if (typeof first === 'string') return first;
    if (first && typeof first === 'object' && typeof (first as SessionLike).access_token === 'string') {
      return (first as SessionLike).access_token ?? null;
    }
  }

  if (payload && typeof payload === 'object' && typeof (payload as SessionLike).access_token === 'string') {
    return (payload as SessionLike).access_token ?? null;
  }

  return null;
}

function readSupabaseSessionCookie(request: NextRequest): string | null {
  const authCookies = request.cookies
    .getAll()
    .filter((cookie) => cookie.name.includes('auth-token'))
    .sort((a, b) => a.name.localeCompare(b.name));

  if (authCookies.length === 0) return null;

  const combined = authCookies.map((cookie) => cookie.value).join('');
  const candidates = [combined, ...authCookies.map((cookie) => cookie.value)];

  for (const value of candidates) {
    try {
      const payload = decodeCookiePayload(value);
      const token = extractAccessToken(payload);
      if (token) return token;
    } catch {
      continue;
    }
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

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

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
