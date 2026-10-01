import { getPayload } from 'payload'
import config from '@payload-config'

if (process.env.NODE_ENV === 'production') throw new Error('Development seed is disabled in production.')
const payload = await getPayload({ config })
const upsert = async (collection: 'categories' | 'technologies' | 'industries', name: string, extra = {}) => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const found = await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1 })
  if (!found.docs.length) await payload.create({ collection, data: { name, slug, ...extra } as any })
}
for (const [name, type] of [['Insights', 'insight'], ['Services', 'service'], ['Projects', 'project'], ['Industries', 'industry']]) await upsert('categories', name, { type })
for (const name of ['Next.js', 'PostgreSQL', 'Flutter', 'MQTT', 'ESP32', 'SAP', 'TypeScript']) await upsert('technologies', name)
for (const name of ['Energy', 'Finance', 'Infrastructure', 'Retail', 'Tyre Industry', 'Property', 'Industrial Operations']) await upsert('industries', name)
console.log('Development taxonomies seeded. No users or credentials were created.')
process.exit(0)
