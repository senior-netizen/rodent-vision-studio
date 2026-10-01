import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArticleBody } from '@/components/insights/article-body';
import { ShareActions } from '@/components/insights/share-actions';
import { InsightsIndex } from '@/components/insights/insights-index';
import { blogBySlug, categoryBySlug, categoryLabel, estimateReadingTime, insightAuthors, insightCategories, publishedPosts } from '@/data/blog';
import { projectById } from '@/data/projects';
import { serviceBySlug, type ServiceSlug } from '@/data/services';

export const dynamicParams = false;
export function generateStaticParams() { return [...publishedPosts.map(post => ({ slug: post.slug })), ...insightCategories.map(category => ({ slug: category.slug }))]; }

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const category = categoryBySlug[params.slug];
  if (category) return { title: `${category.label} | Rodent Lab Insights`, description: `Published ${category.label.toLowerCase()} from Rodent Lab.`, alternates: { canonical: `/insights/${category.slug}` }, openGraph: { title: `${category.label} | Rodent Lab Insights`, description: `Technical publication from Rodent Lab.`, type: 'website', url: `/insights/${category.slug}` } };
  const post = blogBySlug[params.slug];
  if (!post || post.status !== 'published') return {};
  const image = post.coverImage || '/visuals/rodent-logo.png';
  return { title: post.title, description: post.description, authors: [{ name: insightAuthors[post.author].name }], alternates: { canonical: `/insights/${post.slug}` }, openGraph: { title: post.title, description: post.description, type: 'article', url: `/insights/${post.slug}`, publishedTime: post.publishDate, modifiedTime: post.updatedDate, authors: [insightAuthors[post.author].name], tags: post.tags, images: [{ url: image, alt: post.coverAlt || post.title }] }, twitter: { card: 'summary_large_image', title: post.title, description: post.description, images: [image] } };
}

export default function InsightRoute({ params }: { params: { slug: string } }) {
  const category = categoryBySlug[params.slug];
  if (category) return <InsightsIndex posts={publishedPosts} initialCategory={category.slug} />;
  const post = blogBySlug[params.slug];
  if (!post || post.status !== 'published') notFound();
  const author = insightAuthors[post.author];
  const headings = post.body.filter((block): block is Extract<(typeof post.body)[number], { type: 'heading' }> => block.type === 'heading');
  const related = publishedPosts.filter(candidate => candidate.slug !== post.slug && (candidate.category === post.category || candidate.tags.some(tag => post.tags.includes(tag)))).slice(0, 3);
  const projects = (post.relatedProjects || []).map(id => projectById[id]).filter(Boolean);
  const services = (post.relatedServices || []).map(slug => serviceBySlug[slug as ServiceSlug]).filter(Boolean);
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.description, datePublished: post.publishDate, dateModified: post.updatedDate || post.publishDate, author: { '@type': 'Organization', name: author.name }, publisher: { '@type': 'Organization', name: 'Rodent Lab', logo: { '@type': 'ImageObject', url: '/visuals/rodent-logo.png' } }, image: post.coverImage, mainEntityOfPage: `/insights/${post.slug}`, keywords: post.tags.join(', ') };
  return <main className="article-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    <header className="article-header"><div><Link href={`/insights/${post.category}`} className="article-category">{categoryLabel(post.category)}</Link>{post.series && <p className="article-series">Series · {post.series}</p>}<h1>{post.title}</h1><p className="article-deck">{post.deck}</p><div className="article-byline"><span><strong>{author.name}</strong><small>{author.role}</small></span><span><strong>Published</strong><small>{new Date(`${post.publishDate}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}</small></span>{post.updatedDate && <span><strong>Updated</strong><small>{new Date(`${post.updatedDate}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}</small></span>}<span><strong>Reading time</strong><small>{estimateReadingTime(post)} minutes</small></span></div></div></header>
    {post.coverImage && <figure className="article-cover"><Image src={post.coverImage} alt={post.coverAlt || ''} width={1600} height={900} priority /></figure>}
    <div className="article-layout"><aside className="article-toc"><details open><summary>On this page</summary><ol>{headings.map(heading => <li key={heading.id}><a href={`#${heading.id}`}>{heading.text}</a></li>)}</ol></details></aside><article><ArticleBody blocks={post.body} /><ShareActions title={post.title} /><footer className="article-author"><p className="insight-eyebrow">Written by</p><h2>{author.name}</h2><p>{author.bio}</p><div className="insight-tags">{post.tags.map(tag => <span key={tag}>{tag}</span>)}</div></footer></article></div>
    {(projects.length > 0 || services.length > 0) && <section className="article-connections"><div><p className="insight-eyebrow">Continue through the system</p><h2>Related work and capability</h2></div><div className="connection-grid">{projects.map(project => <Link key={project.id} href={`/projects/${project.slug}`}><span>Related project</span><h3>{project.name}</h3><p>{project.tagline}</p><strong>View case study →</strong></Link>)}{services.map(service => <Link key={service.slug} href={`/services/${service.slug}`}><span>Related service</span><h3>{service.name}</h3><p>{service.summary}</p><strong>Explore service →</strong></Link>)}</div></section>}
    {related.length > 0 && <section className="related-insights"><p className="insight-eyebrow">Keep reading</p><h2>Related insights</h2><div className="related-insight-grid">{related.map(item => <Link href={`/insights/${item.slug}`} key={item.slug}><span>{categoryLabel(item.category)}</span><h3>{item.title}</h3><p>{estimateReadingTime(item)} min read</p></Link>)}</div></section>}
    <section className="article-cta"><p className="insight-eyebrow">Building something similar?</p><h2>Talk to Rodent Lab about the system you&apos;re trying to design, automate or connect.</h2><Link className="btn-primary" href="/contact">Start a conversation</Link></section>
  </main>;
}
