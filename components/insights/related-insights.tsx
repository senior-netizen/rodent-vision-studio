import Link from 'next/link';
import { categoryLabel, publishedPosts } from '@/data/blog';

export function RelatedInsights({ service, project, title = 'Engineering notes related to this work.' }: { service?: string; project?: string; title?: string }) {
  const articles = publishedPosts.filter(post => service ? post.relatedServices?.includes(service) : project ? post.relatedProjects?.includes(project) : false).slice(0, 3);
  if (!articles.length) return null;
  return <section className="detail-section"><header><p className="detail-kicker">From Rodent Lab Insights</p><h2>{title}</h2></header><div className="related-grid">{articles.map(article => <Link href={`/insights/${article.slug}`} key={article.slug}><span>{categoryLabel(article.category)}</span><h3>{article.title}</h3><p>{article.description}</p><strong>Read insight →</strong></Link>)}</div></section>;
}
