import type { Block } from 'payload'

const text = (name: string, required = false): any => ({ name, type: 'text', required })
export const contentBlocks: Block[] = [
  { slug: 'hero', fields: [text('eyebrow'), text('heading', true), { name: 'description', type: 'textarea' }, { name: 'image', type: 'upload', relationTo: 'media' }] },
  { slug: 'richText', fields: [{ name: 'content', type: 'richText', required: true }] },
  { slug: 'capabilityGrid', fields: [{ name: 'items', type: 'array', fields: [text('title', true), { name: 'description', type: 'textarea' }] }] },
  { slug: 'processSteps', fields: [{ name: 'steps', type: 'array', fields: [text('title', true), { name: 'description', type: 'textarea' }] }] },
  { slug: 'architectureFlow', fields: [text('title'), { name: 'diagram', type: 'upload', relationTo: 'media' }, { name: 'description', type: 'textarea' }] },
  { slug: 'benefitsGrid', fields: [{ name: 'benefits', type: 'array', fields: [text('title', true), { name: 'description', type: 'textarea' }] }] },
  { slug: 'image', fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }, text('alt', true), text('caption')] },
  { slug: 'quote', fields: [{ name: 'quote', type: 'textarea', required: true }, text('attribution')] },
  { slug: 'callout', fields: [text('title'), { name: 'body', type: 'textarea', required: true }, { name: 'tone', type: 'select', options: ['note', 'why-it-matters', 'decision', 'warning', 'example'] }] },
  { slug: 'codeBlock', fields: [text('language'), text('filename'), { name: 'code', type: 'code', required: true }] },
  { slug: 'dataTable', fields: [{ name: 'columns', type: 'array', fields: [text('heading', true)] }, { name: 'rowsJSON', type: 'json', required: true }] },
  { slug: 'cta', fields: [text('heading', true), { name: 'description', type: 'textarea' }, text('label', true), text('url', true)] },
  { slug: 'relatedContent', fields: [{ name: 'insights', type: 'relationship', relationTo: 'insights', hasMany: true }, { name: 'services', type: 'relationship', relationTo: 'services', hasMany: true }, { name: 'projects', type: 'relationship', relationTo: 'projects', hasMany: true }] },
]
