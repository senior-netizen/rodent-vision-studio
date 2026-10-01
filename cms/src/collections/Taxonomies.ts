import type { CollectionConfig } from 'payload'
import { contentDelete, isEditorial } from '../access'
import { slugField } from '../fields/common'
const base = (slug: string, label: string, extra: any[] = []): CollectionConfig => ({
  slug, admin: { useAsTitle: 'name' }, access: { read: () => true, create: isEditorial, update: isEditorial, delete: contentDelete },
  fields: [{ name: 'name', type: 'text', required: true }, slugField('name'), ...extra],
})
export const Categories = base('categories', 'Categories', [{ name: 'type', type: 'select', required: true, options: ['insight', 'service', 'project', 'industry'] }])
export const Tags = base('tags', 'Tags')
export const Technologies = base('technologies', 'Technologies', [{ name: 'website', type: 'text' }])
export const Industries = base('industries', 'Industries', [{ name: 'description', type: 'textarea' }])
export const Authors = base('authors', 'Authors', [
  { name: 'role', type: 'text', required: true }, { name: 'biography', type: 'textarea', required: true },
  { name: 'photo', type: 'upload', relationTo: 'media' }, { name: 'linkedIn', type: 'text' }, { name: 'github', type: 'text' },
])
