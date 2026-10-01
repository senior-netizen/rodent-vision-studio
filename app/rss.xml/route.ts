import { publishedPosts, categoryLabel, estimateReadingTime } from '@/data/blog';
import { getSiteOrigin } from '@/lib/site-url';

function escapeXml(value: string) { return value.replace(/[<>&'"]/g, character => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[character]!)); }
export function GET() {
  const origin = getSiteOrigin();
  const items = publishedPosts.map(post => `  <item><title>${escapeXml(post.title)}</title><link>${origin}/insights/${post.slug}</link><guid isPermaLink="true">${origin}/insights/${post.slug}</guid><pubDate>${new Date(post.publishDate).toUTCString()}</pubDate><category>${escapeXml(categoryLabel(post.category))}</category><description>${escapeXml(post.description)}</description></item>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Rodent Lab Insights</title><link>${origin}/insights</link><atom:link href="${origin}/rss.xml" rel="self" type="application/rss+xml"/><description>Engineering notes, build stories and practical thinking from Rodent Lab.</description><language>en</language><lastBuildDate>${new Date(publishedPosts[0].publishDate).toUTCString()}</lastBuildDate>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': `public, max-age=${estimateReadingTime(publishedPosts[0]) * 60}, s-maxage=3600` } });
}
