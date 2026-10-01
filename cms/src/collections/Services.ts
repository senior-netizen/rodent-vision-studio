import type { CollectionConfig } from 'payload'
import { cards, links, richText, seoFields, slugField, steps, workflowFields } from '../fields/common'
import { contentHooks, versioning } from './contentAccess'
import { contentDelete, isEditorial, publicOrAuthenticated } from '../access'
export const Services: CollectionConfig = {
  slug: 'services', admin: { useAsTitle: 'name' }, access: { read: publicOrAuthenticated, create: isEditorial, update: isEditorial, delete: contentDelete }, versions: versioning, hooks: contentHooks,
  fields: [
    { name: 'name', type: 'text', required: true }, slugField('name'), { name: 'category', type: 'relationship', relationTo: 'categories' },
    { name: 'eyebrow', type: 'text' }, { name: 'heroTitle', type: 'text', required: true }, { name: 'heroDescription', type: 'textarea', required: true },
    richText('introduction', true), cards('capabilities'), steps('process'), richText('architecture'), cards('benefits'),
    { name: 'industries', type: 'relationship', relationTo: 'industries', hasMany: true }, { name: 'technologies', type: 'relationship', relationTo: 'technologies', hasMany: true },
    { name: 'relatedProjects', type: 'relationship', relationTo: 'projects', hasMany: true }, { name: 'relatedInsights', type: 'relationship', relationTo: 'insights', hasMany: true },
    { name: 'cta', type: 'group', fields: [{ name: 'heading', type: 'text' }, { name: 'label', type: 'text' }, { name: 'url', type: 'text' }] },
    seoFields, ...workflowFields,
  ], timestamps: true,
}
