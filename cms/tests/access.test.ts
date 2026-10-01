import { describe, expect, it } from 'vitest'
import { authorOwnsDrafts, enforceAuthorWorkflow, preventPrivilegeEscalation, publicOrAuthenticated } from '../src/access'
import { Users } from '../src/collections/Users'

const req = (role?: string, id = 'user-1') => ({ user: role ? { id, role, active: true } : null }) as any
describe('server-side access policy', () => {
  it('limits anonymous reads to published documents', () => expect(publicOrAuthenticated({ req: req() } as any)).toEqual({ _status: { equals: 'published' } }))
  it('allows published Insights to be represented by the public constraint', () => {
    const constraint: any = publicOrAuthenticated({ req: req() } as any)
    expect(constraint._status.equals).toBe('published')
  })
  it('allows administrators to read drafts', () => expect(publicOrAuthenticated({ req: req('administrator') } as any)).toBe(true))
  it('does not expose users publicly', () => expect((Users.access!.read as any)({ req: req() })).toBe(false))
  it('limits authors to their own documents and prevents editing published content', () => {
    expect(authorOwnsDrafts({ req: req('author', 'a') } as any)).toEqual({ and: [{ createdBy: { equals: 'a' } }, { _status: { not_equals: 'published' } }] })
  })
  it('prevents authors from publishing', () => expect(() => enforceAuthorWorkflow({ req: req('author'), data: { _status: 'published' } })).toThrow(/cannot publish/i))
  it('prevents editors from granting the super-admin role', () => expect(() => preventPrivilegeEscalation({ req: req('editor'), data: { role: 'super-admin' }, originalDoc: { role: 'editor' } })).toThrow(/super-admin/i))
})
