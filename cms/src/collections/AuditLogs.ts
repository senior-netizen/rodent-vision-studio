import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access'
export const AuditLogs: CollectionConfig = {
  slug: 'audit-logs', admin: { hidden: false }, access: { read: isAdmin, create: () => false, update: () => false, delete: () => false },
  fields: [
    { name: 'actor', type: 'relationship', relationTo: 'users' }, { name: 'action', type: 'select', options: ['publish', 'unpublish', 'delete', 'role-change'] },
    { name: 'collection', type: 'text', required: true }, { name: 'documentID', type: 'text' }, { name: 'summary', type: 'text' },
  ], timestamps: true,
}
