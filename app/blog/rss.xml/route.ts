import { createClient } from '@supabase/supabase-js';
import { blogPosts as staticPosts } from '@/data/blog';

export const dynamic = 'force-dynamic';
export const revalidate = 600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://rodent.co.zw';

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  '';

type Item = {
  slug: string;
  title: string;
  excerpt: string;
  body?: string | null;
  publishedAt: string;
};

function escapeXml(s: string) {
  return s.replace(/[<>&'"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]!)
  );
}

async function loadPosts(): Promise<Item[]> {
  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
      const { data } = await supabase
        .from('blog_posts')
        .select('slug, title, excerpt, body, published_at')
        .eq('published', true)
        .order('published_at', { ascending: false });
      if (data && data.length) {
        return data.map((p: any) => ({
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
          body: p.body,
          publishedAt: p.published_at,
        }));
      }
    } catch {
      // fall through to static
    }
  }
  return staticPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    body: p.body,
    publishedAt: p.publishedAt,
  }));
}

export async function GET() {
  const posts = await loadPosts();
  const lastBuild = posts[0]
    ? new Date(posts[0].publishedAt).toUTCString()
    : new Date().toUTCString();

  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/blog/${p.slug}`;
      const desc = p.body || p.excerpt || '';
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(p.excerpt || '')}</description>
      <content:encoded><![CDATA[${desc}]]></content:encoded>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Rodent, Inc. — Journal</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Field notes on engineering production-grade web, mobile, IoT, and robotics systems from the Rodent, Inc. team.</description>
    <language>en</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=600, s-maxage=600, stale-while-revalidate=86400',
    },
  });
}
