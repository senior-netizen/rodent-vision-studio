import { ApiError } from './errors'
import { querySchema } from './schemas'
import type { z } from 'zod'

export const collections = ['insights', 'services', 'projects', 'categories', 'technologies', 'industries'] as const
export type Collection = typeof collections[number]
type Query = z.infer<typeof querySchema>

const pickRelation = (value: unknown) => {
  if (!value || typeof value !== 'object') return value
  const v = value as Record<string, unknown>; return { id: v.id, name: v.name ?? v.title, slug: v.slug }
}
export function toPublicDto(collection: Collection, raw: Record<string, unknown>) {
  const common: Record<string, unknown> = { id: raw.id, name: raw.name, title: raw.title, slug: raw.slug, description: raw.description, excerpt: raw.excerpt, featured: raw.featured, publishedAt: raw.publishedAt, updatedAt: raw.updatedAt }
  if (collection === 'insights') Object.assign(common, { coverImage: pickRelation(raw.coverImage), category: pickRelation(raw.category), tags: Array.isArray(raw.tags) ? raw.tags.map(pickRelation) : [], author: pickRelation(raw.author), content: raw.content, relatedServices: raw.relatedServices, relatedProjects: raw.relatedProjects, seo: raw.seo })
  if (collection === 'services') Object.assign(common, { summary: raw.summary, content: raw.content, icon: raw.icon, seo: raw.seo })
  if (collection === 'projects') Object.assign(common, { summary: raw.summary, content: raw.content, coverImage: pickRelation(raw.coverImage), technologies: Array.isArray(raw.technologies) ? raw.technologies.map(pickRelation) : [], industry: pickRelation(raw.industry), seo: raw.seo })
  return Object.fromEntries(Object.entries(common).filter(([, value]) => value !== undefined))
}

function cmsUrl(path: string) { const base = process.env.CMS_BASE_URL; if (!base) throw new ApiError('UPSTREAM_ERROR', 503, 'CMS unavailable'); return new URL(path, base.endsWith('/') ? base : `${base}/`) }
function headers() { return process.env.CMS_API_SECRET ? { Authorization: `Bearer ${process.env.CMS_API_SECRET}` } : undefined }
export async function listContent(collection: Collection, query: Query) {
  const url = cmsUrl(`api/${collection}`); url.searchParams.set('draft', 'false'); url.searchParams.set('where[_status][equals]', 'published'); url.searchParams.set('page', String(query.page)); url.searchParams.set('limit', String(query.limit)); url.searchParams.set('depth', '2')
  if (query.category) url.searchParams.set('where[category.slug][equals]', query.category)
  if (query.tag) url.searchParams.set('where[tags.slug][equals]', query.tag)
  if (query.featured !== undefined) url.searchParams.set('where[featured][equals]', String(query.featured))
  if (query.search) url.searchParams.set('where[or][0][title][like]', query.search)
  const response = await fetch(url, { headers: headers(), next: { revalidate: 300, tags: [`content:${collection}`] } })
  if (!response.ok) throw new ApiError('UPSTREAM_ERROR', 502, 'CMS request failed')
  const body = await response.json() as { docs?: Record<string, unknown>[]; page?: number; limit?: number; totalDocs?: number }
  return { data: (body.docs ?? []).filter(d => d._status === 'published' || d._status === undefined).map(d => toPublicDto(collection, d)), meta: { page: body.page ?? query.page, limit: body.limit ?? query.limit, total: body.totalDocs ?? 0 } }
}
export async function getContent(collection: Collection, slug: string) {
  const url = cmsUrl(`api/${collection}`); url.searchParams.set('draft', 'false'); url.searchParams.set('where[_status][equals]', 'published'); url.searchParams.set('where[slug][equals]', slug); url.searchParams.set('limit', '1'); url.searchParams.set('depth', '2')
  const response = await fetch(url, { headers: headers(), next: { revalidate: 300, tags: [`content:${collection}`, `content:${collection}:${slug}`] } })
  if (!response.ok) throw new ApiError('UPSTREAM_ERROR', 502, 'CMS request failed')
  const body = await response.json() as { docs?: Record<string, unknown>[] }; const doc = body.docs?.find(d => d._status === 'published' || d._status === undefined)
  if (!doc) throw new ApiError('NOT_FOUND', 404, 'Not found'); return toPublicDto(collection, doc)
}
