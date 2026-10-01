import { describe, expect, it } from 'vitest'
import { signPreview, verifyPreview } from '../src/lib/preview'
describe('preview signatures', () => {
  it('accepts intact short-lived tokens and rejects tampering', () => {
    const claims = { collection: 'insights' as const, slug: 'draft', exp: Math.floor(Date.now() / 1000) + 60 }
    const token = signPreview(claims, 'test-secret')
    expect(verifyPreview(token, 'test-secret')).toEqual(claims)
    expect(verifyPreview(`${token}x`, 'test-secret')).toBeNull()
  })
  it('rejects expired tokens', () => expect(verifyPreview(signPreview({ collection: 'projects', slug: 'old', exp: 1 }, 's'), 's')).toBeNull())
})
