import type { CollectionConfig } from 'payload'
import { contentCreate, contentDelete, isAuthenticated } from '../access'
export const Media: CollectionConfig = {
  slug: 'media', upload: { mimeTypes: ['image/*', 'application/pdf'], imageSizes: [{ name: 'thumbnail', width: 480 }, { name: 'social', width: 1200, height: 630, position: 'centre' }], adminThumbnail: 'thumbnail' },
  access: { read: () => true, create: contentCreate, update: isAuthenticated, delete: contentDelete },
  fields: [
    { name: 'alt', type: 'text', required: true }, { name: 'caption', type: 'text' }, { name: 'credit', type: 'text' },
    { name: 'kind', type: 'select', defaultValue: 'image', options: ['image', 'diagram', 'screenshot', 'article-cover'] },
  ],
}
