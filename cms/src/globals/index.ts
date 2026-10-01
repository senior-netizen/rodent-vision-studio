import type { GlobalConfig } from 'payload'
import { settingsAccess } from '../access'
import { links, seoFields } from '../fields/common'

const access = { read: () => true, update: settingsAccess }
export const SiteSettings: GlobalConfig = { slug: 'site-settings', access, fields: [
  { name: 'companyName', type: 'text', required: true }, { name: 'siteDescription', type: 'textarea' },
  { name: 'contact', type: 'group', fields: [{ name: 'email', type: 'email' }, { name: 'phone', type: 'text' }, { name: 'address', type: 'textarea' }] },
  links('socialLinks'), { name: 'defaultSEOImage', type: 'upload', relationTo: 'media' }, seoFields,
] }
const navItems = (name: string): any => ({ name, type: 'array', fields: [{ name: 'label', type: 'text', required: true }, { name: 'url', type: 'text', required: true }, { name: 'newTab', type: 'checkbox' }] })
export const Navigation: GlobalConfig = { slug: 'navigation', access, fields: [navItems('header'), navItems('footer')] }
export const Homepage: GlobalConfig = {
  slug: 'homepage', access, versions: { drafts: { autosave: true, schedulePublish: true }, maxPerDoc: 30 },
  fields: [
    { name: 'hero', type: 'group', fields: [{ name: 'eyebrow', type: 'text' }, { name: 'title', type: 'text', required: true }, { name: 'description', type: 'textarea' }] },
    { name: 'featuredProjects', type: 'relationship', relationTo: 'projects', hasMany: true },
    { name: 'featuredServices', type: 'relationship', relationTo: 'services', hasMany: true },
    { name: 'latestInsights', type: 'relationship', relationTo: 'insights', hasMany: true },
    { name: 'cta', type: 'group', fields: [{ name: 'heading', type: 'text' }, { name: 'description', type: 'textarea' }, { name: 'label', type: 'text' }, { name: 'url', type: 'text' }] },
  ],
}
