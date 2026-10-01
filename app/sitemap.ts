import type { MetadataRoute } from 'next';
import { insightCategories, publishedPosts } from '@/data/blog';
import { projectConfigs } from '@/data/projects';
import { services } from '@/data/services';
import { getSiteOrigin } from '@/lib/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteOrigin();
  const entry = (path: string, lastModified?: string): MetadataRoute.Sitemap[number] => ({ url: `${origin}${path}`, lastModified: lastModified ? new Date(lastModified) : new Date(), changeFrequency: 'monthly', priority: path === '/' ? 1 : path === '/insights' ? .8 : .6 });
  return [entry('/'), entry('/about'), entry('/services'), entry('/projects'), entry('/insights'), ...services.map(service => entry(`/services/${service.slug}`)), ...projectConfigs.map(project => entry(`/projects/${project.slug}`)), ...insightCategories.map(category => entry(`/insights/${category.slug}`)), ...publishedPosts.map(post => entry(`/insights/${post.slug}`, post.updatedDate || post.publishDate))];
}
