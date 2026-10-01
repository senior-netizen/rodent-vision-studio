import type { CollectionConfig } from 'payload'
import { isAdmin, isSuperAdmin, preventPrivilegeEscalation, userOf } from '../access'

export const Users: CollectionConfig = {
  slug: 'users', auth: { tokenExpiration: 60 * 60 * 8, maxLoginAttempts: 5, lockTime: 15 * 60 * 1000, minPasswordLength: 12, cookies: { secure: process.env.NODE_ENV === 'production', sameSite: 'lax' } },
  admin: { useAsTitle: 'email' },
  access: {
    read: ({ req }) => isAdmin({ req } as any) || (userOf(req) ? { id: { equals: userOf(req)!.id } } : false),
    create: isAdmin, update: ({ req }) => isSuperAdmin({ req } as any) || (userOf(req) ? { id: { equals: userOf(req)!.id } } : false), delete: isSuperAdmin,
  },
  hooks: { beforeChange: [preventPrivilegeEscalation], afterChange: [async ({ req, doc, previousDoc }) => {
    if (previousDoc?.role && previousDoc.role !== doc.role && req.user && !req.context?.skipAudit) await req.payload.create({ collection: 'audit-logs', overrideAccess: true, context: { skipAudit: true }, data: { actor: req.user.id, action: 'role-change', collection: 'users', documentID: String(doc.id), summary: 'User role changed' } })
    return doc
  }] },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'select', required: true, defaultValue: 'author', saveToJWT: true, options: [
      { label: 'Super admin', value: 'super-admin' }, { label: 'Administrator', value: 'administrator' },
      { label: 'Editor', value: 'editor' }, { label: 'Author', value: 'author' },
    ], access: { update: ({ req }) => userOf(req)?.role === 'super-admin' } },
    { name: 'active', type: 'checkbox', defaultValue: true, required: true, saveToJWT: true, access: { update: ({ req }) => userOf(req)?.role === 'super-admin' } },
    { name: 'avatar', type: 'upload', relationTo: 'media' },
  ], timestamps: true,
}
