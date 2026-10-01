'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { categoryLabel, estimateReadingTime, insightAuthors, insightCategories, type BlogPost, type InsightCategory } from '@/data/blog';

function ArticleCard({ post }: { post: BlogPost }) {
  return <article className="insight-card">
    {post.coverImage && <Link href={`/insights/${post.slug}`} className="insight-card-image"><Image src={post.coverImage} alt={post.coverAlt || ''} width={720} height={420} /></Link>}
    <div className="insight-card-body"><p className="insight-category">{categoryLabel(post.category)}</p><h2><Link href={`/insights/${post.slug}`}>{post.title}</Link></h2><p>{post.description}</p><div className="insight-meta"><span>{insightAuthors[post.author].name}</span><span>{new Date(`${post.publishDate}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })}</span><span>{estimateReadingTime(post)} min read</span></div><div className="insight-tags">{post.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div></div>
  </article>;
}

export function InsightsIndex({ posts, initialCategory }: { posts: BlogPost[]; initialCategory?: InsightCategory }) {
  const [query, setQuery] = useState('');
  const featured = posts.find(post => post.featured) || posts[0];
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts.filter(post => (!initialCategory || post.category === initialCategory) && (!needle || [post.title, post.description, categoryLabel(post.category), ...post.tags].join(' ').toLowerCase().includes(needle)));
  }, [posts, query, initialCategory]);

  return <main className="insights-page">
    <header className="insights-hero"><div><p className="insight-eyebrow">Rodent Lab Insights</p><h1>{initialCategory ? categoryLabel(initialCategory) : 'Engineering what comes next — and documenting what we learn.'}</h1><p>Technical notes, architecture decisions, build stories and industry analysis from the software, electronics and infrastructure work happening inside Rodent Lab.</p></div></header>
    <nav className="category-nav" aria-label="Insight categories"><Link className={!initialCategory ? 'active' : ''} href="/insights">All</Link>{insightCategories.map(category => <Link className={initialCategory === category.slug ? 'active' : ''} key={category.slug} href={`/insights/${category.slug}`}>{category.label}</Link>)}</nav>
    {!initialCategory && featured && <section className="featured-insight" aria-labelledby="featured-title"><div className="featured-copy"><p className="insight-category">Featured · {categoryLabel(featured.category)}</p><h2 id="featured-title">{featured.title}</h2><p>{featured.deck}</p><div className="insight-meta"><span>{insightAuthors[featured.author].name}</span><span>{new Date(`${featured.publishDate}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}</span><span>{estimateReadingTime(featured)} min read</span></div><Link href={`/insights/${featured.slug}`} className="btn-primary">Read article →</Link></div><div className="featured-visual">{featured.coverImage ? <Image src={featured.coverImage} alt={featured.coverAlt || ''} width={1000} height={720} priority /> : <span>RL / INSIGHTS</span>}</div></section>}
    <section className="insight-library" aria-labelledby="library-title"><div className="insight-library-head"><div><p className="insight-eyebrow">Publication library</p><h2 id="library-title">{initialCategory ? `Latest in ${categoryLabel(initialCategory)}` : 'Recent articles'}</h2></div><label className="insight-search"><span className="sr-only">Search insights</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search title, topic or tag…" /></label></div>{filtered.length ? <div className="insight-grid">{filtered.filter(post => initialCategory || post.slug !== featured?.slug).map(post => <ArticleCard post={post} key={post.slug} />)}</div> : <p className="insight-empty">No published insights match this search.</p>}</section>
  </main>;
}

export { ArticleCard };
