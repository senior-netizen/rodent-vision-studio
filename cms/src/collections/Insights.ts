import type { CollectionConfig } from 'payload'
import { contentBlocks } from '../blocks'
import { links, seoFields, slugField, workflowFields } from '../fields/common'
import { contentAccess, contentHooks, versioning } from './contentAccess'
export const Insights: CollectionConfig = {
  slug: 'insights', admin: { useAsTitle: 'title', defaultColumns: ['title', 'editorialStatus', '_status', 'updatedAt'] }, access: contentAccess, versions: versioning, hooks: contentHooks,
  fields: [
    { name: 'title', type: 'text', required: true }, slugField(), { name: 'excerpt', type: 'textarea', required: true, maxLength: 300 },
    { name: 'content', type: 'blocks', blocks: contentBlocks, required: true }, { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'coverAlt', type: 'text' }, { name: 'category', type: 'relationship', relationTo: 'categories', required: true },
    { name: 'tags', type: 'relationship', relationTo: 'tags', hasMany: true }, { name: 'author', type: 'relationship', relationTo: 'authors', required: true },
    { name: 'technologies', type: 'relationship', relationTo: 'technologies', hasMany: true }, { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'relatedServices', type: 'relationship', relationTo: 'services', hasMany: true }, { name: 'relatedProjects', type: 'relationship', relationTo: 'projects', hasMany: true },
    links('references'), seoFields, ...workflowFields,
  ], timestamps: true,
}
