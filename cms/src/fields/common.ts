import type { Field } from 'payload'
import { publishedFieldAccess } from '../access'

export const slugField = (source = 'title'): Field => ({
  name: 'slug', type: 'text', required: true, unique: true, index: true,
  hooks: { beforeValidate: [({ value, siblingData }) => {
    const raw = value || siblingData?.[source]
    return typeof raw === 'string' ? raw.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : raw
  }] },
})

export const seoFields: Field = { name: 'seo', type: 'group', fields: [
  { name: 'metaTitle', type: 'text', maxLength: 60 },
  { name: 'metaDescription', type: 'textarea', maxLength: 160 },
  { name: 'canonicalURL', type: 'text' },
  { name: 'openGraphTitle', type: 'text', maxLength: 60 },
  { name: 'openGraphDescription', type: 'textarea', maxLength: 160 },
  { name: 'openGraphImage', type: 'upload', relationTo: 'media' },
  { name: 'noindex', type: 'checkbox', defaultValue: false },
  { name: 'nofollow', type: 'checkbox', defaultValue: false },
] }

export const workflowFields: Field[] = [
  { name: 'editorialStatus', type: 'select', required: true, defaultValue: 'draft', options: [
    { label: 'Draft', value: 'draft' }, { label: 'Editorial review', value: 'review' },
    { label: 'Approved', value: 'approved' }, { label: 'Published', value: 'published' },
  ] },
  { name: 'publishedAt', type: 'date', access: { create: publishedFieldAccess, update: publishedFieldAccess } },
  { name: 'createdBy', type: 'relationship', relationTo: 'users', admin: { readOnly: true }, access: { update: () => false } },
  { name: 'updatedBy', type: 'relationship', relationTo: 'users', admin: { readOnly: true }, access: { update: () => false } },
]

export const attributionHooks = {
  beforeChange: [({ req, data, operation }: any) => ({ ...data, ...(operation === 'create' ? { createdBy: req.user?.id } : {}), updatedBy: req.user?.id })],
}

export const richText = (name: string, required = false): Field => ({ name, type: 'richText', required })
export const cards = (name: string): Field => ({ name, type: 'array', fields: [
  { name: 'title', type: 'text', required: true }, { name: 'description', type: 'textarea' }, { name: 'icon', type: 'upload', relationTo: 'media' },
] })
export const steps = (name: string): Field => ({ name, type: 'array', fields: [
  { name: 'title', type: 'text', required: true }, { name: 'description', type: 'textarea' },
] })
export const links = (name: string): Field => ({ name, type: 'array', fields: [
  { name: 'label', type: 'text', required: true }, { name: 'url', type: 'text', required: true },
] })
