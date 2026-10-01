import type { CollectionConfig } from 'payload'
import { cards, links, richText, seoFields, slugField, workflowFields } from '../fields/common'
import { contentHooks, versioning } from './contentAccess'
import { contentDelete, isEditorial, publicOrAuthenticated } from '../access'
export const Projects: CollectionConfig = {
  slug: 'projects', admin: { useAsTitle: 'name' }, access: { read: publicOrAuthenticated, create: isEditorial, update: isEditorial, delete: contentDelete }, versions: versioning, hooks: contentHooks,
  fields: [
    { name: 'name', type: 'text', required: true }, slugField('name'), { name: 'projectType', type: 'text' }, { name: 'category', type: 'relationship', relationTo: 'categories' },
    { name: 'shortDescription', type: 'textarea', required: true }, { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'projectState', type: 'select', options: ['concept', 'active', 'completed', 'ongoing'] }, { name: 'rodentLabRole', type: 'textarea' },
    richText('context'), richText('problem'), richText('requirements'), richText('solution'), richText('architecture'), richText('dataFlow'),
    cards('capabilities'), cards('engineeringDecisions'), { name: 'technologies', type: 'relationship', relationTo: 'technologies', hasMany: true },
    richText('challenges'), richText('outcome'), links('externalLinks'), { name: 'industries', type: 'relationship', relationTo: 'industries', hasMany: true },
    { name: 'relatedServices', type: 'relationship', relationTo: 'services', hasMany: true }, { name: 'relatedInsights', type: 'relationship', relationTo: 'insights', hasMany: true },
    seoFields, ...workflowFields,
  ], timestamps: true,
}
