import type { CollectionConfig } from 'payload'
import { authorOwnsDrafts, contentCreate, contentDelete, enforceAuthorWorkflow, publicOrAuthenticated } from '../access'
import { attributionHooks } from '../fields/common'

export const contentAccess = { read: publicOrAuthenticated, create: contentCreate, update: authorOwnsDrafts, delete: contentDelete }
export const versioning: CollectionConfig['versions'] = { drafts: { autosave: true, schedulePublish: true }, maxPerDoc: 50 }
export const contentHooks = {
  beforeChange: [enforceAuthorWorkflow, ...(attributionHooks.beforeChange as any)],
  afterChange: [async ({ req, doc, previousDoc, collection }: any) => {
    if (!req.user || req.context?.skipAudit || doc?._status === previousDoc?._status) return doc
    if (doc?._status === 'published' || previousDoc?._status === 'published') await req.payload.create({
      collection: 'audit-logs', overrideAccess: true, context: { skipAudit: true }, data: {
        actor: req.user.id, action: doc._status === 'published' ? 'publish' : 'unpublish', collection: collection.slug, documentID: String(doc.id), summary: `${collection.slug} publication state changed`,
      },
    })
    return doc
  }],
  afterDelete: [async ({ req, doc, collection }: any) => {
    if (req.user && !req.context?.skipAudit) await req.payload.create({ collection: 'audit-logs', overrideAccess: true, context: { skipAudit: true }, data: { actor: req.user.id, action: 'delete', collection: collection.slug, documentID: String(doc.id), summary: `${collection.slug} deleted` } })
    return doc
  }],
}
