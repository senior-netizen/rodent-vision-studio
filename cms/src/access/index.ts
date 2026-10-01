import type { Access, FieldAccess } from 'payload'

export type Role = 'super-admin' | 'administrator' | 'editor' | 'author'
type CMSUser = { id: string | number; role?: Role; active?: boolean }
export const userOf = (req: any): CMSUser | null => (req.user as CMSUser | null) ?? null
export const hasRole = (user: CMSUser | null, roles: Role[]) => Boolean(user?.active !== false && user?.role && roles.includes(user.role))
export const isSuperAdmin: Access = ({ req }) => hasRole(userOf(req), ['super-admin'])
export const isAdmin: Access = ({ req }) => hasRole(userOf(req), ['super-admin', 'administrator'])
export const isEditorial: Access = ({ req }) => hasRole(userOf(req), ['super-admin', 'administrator', 'editor'])
export const isAuthenticated: Access = ({ req }) => Boolean(userOf(req)?.active !== false && userOf(req))
export const publicOrAuthenticated: Access = ({ req }) => {
  const user = userOf(req)
  if (hasRole(user, ['super-admin', 'administrator', 'editor'])) return true
  if (user?.role === 'author') return { or: [{ _status: { equals: 'published' } }, { createdBy: { equals: user.id } }] }
  return { _status: { equals: 'published' } }
}
export const authorOwnsDrafts: Access = ({ req }) => {
  const user = userOf(req)
  if (!user) return false
  if (hasRole(user, ['super-admin', 'administrator', 'editor'])) return true
  return { and: [{ createdBy: { equals: user.id } }, { _status: { not_equals: 'published' } }] }
}
export const contentCreate: Access = ({ req }) => hasRole(userOf(req), ['super-admin', 'administrator', 'editor', 'author'])
export const contentDelete: Access = ({ req }) => hasRole(userOf(req), ['super-admin', 'administrator'])
export const publishedFieldAccess: FieldAccess = ({ req }) => hasRole(userOf(req), ['super-admin', 'administrator'])
export const settingsAccess: Access = ({ req }) => hasRole(userOf(req), ['super-admin', 'administrator'])

export function preventPrivilegeEscalation({ req, data, originalDoc }: any) {
  const actor = userOf(req)
  if (!data) return data
  if (data.role === 'super-admin' && originalDoc?.role !== 'super-admin' && actor?.role !== 'super-admin') {
    throw new Error('Only a super-admin may grant the super-admin role.')
  }
  if (originalDoc?.role === 'super-admin' && actor?.role !== 'super-admin' && data.role && data.role !== originalDoc.role) {
    throw new Error('Only a super-admin may modify a super-admin account.')
  }
  return data
}

export function enforceAuthorWorkflow({ req, data, originalDoc }: any) {
  const user = userOf(req)
  if (user?.role === 'author') {
    if (data?._status === 'published' || originalDoc?._status === 'published') throw new Error('Authors cannot publish content.')
    if (data?.editorialStatus === 'approved') throw new Error('Authors cannot approve content.')
  }
  return data
}
