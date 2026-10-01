import { beforeEach, describe, expect, it, vi } from 'vitest'
import { hashApiKey, authenticateApiKey, type ApiKeyRecord } from '../src/lib/auth'
import { toPublicDto } from '../src/lib/cms'
import { errorResponse, ApiError } from '../src/lib/errors'
import { contactSchema, querySchema } from '../src/lib/schemas'
import { rateLimit, resetLocalRateLimits } from '../src/lib/rate-limit'
import { validSignature } from '../src/lib/webhook'
import { createHmac } from 'node:crypto'

describe('security foundation', () => {
  beforeEach(() => { resetLocalRateLimits(); delete process.env.RATE_LIMIT_STORE_URL; delete process.env.RATE_LIMIT_STORE_TOKEN; vi.stubEnv('NODE_ENV', 'test') })
  it('validates content queries and limits pagination', () => { expect(querySchema.safeParse({ limit: '101' }).success).toBe(false); expect(querySchema.safeParse({ unknown: 'x' }).success).toBe(false) })
  it('validates contacts and catches honeypots', () => { const base = { name: 'Ada Doe', email: 'ada@example.com', organisation: 'Rodent', message: 'A sufficiently long message', serviceInterest: 'API' }; expect(contactSchema.safeParse(base).success).toBe(true); expect(contactSchema.safeParse({ ...base, website: 'spam' }).success).toBe(false) })
  it('enforces local development rate limits', async () => { await rateLimit('test', 1, 10); await expect(rateLimit('test', 1, 10)).rejects.toMatchObject({ code: 'RATE_LIMITED' }) })
  it('validates CMS HMAC signatures', () => { const body = '{"id":"1"}', secret = 'secret'; const signature = createHmac('sha256', secret).update(body).digest('hex'); expect(validSignature(body, `sha256=${signature}`, secret)).toBe(true); expect(validSignature(body, 'bad', secret)).toBe(false) })
  it('hashes API keys and enforces scopes', () => { const token = 'rk_abcdefghijklmnopqrstuvwxyz'; process.env.API_KEY_PEPPER = 'pepper'; const record: ApiKeyRecord = { id: '1', name: 'test', prefix: 'rk_ab', hash: hashApiKey(token), scopes: ['content:read'], enabled: true, createdAt: new Date().toISOString() }; const request = new Request('http://test', { headers: { authorization: `Bearer ${token}` } }); expect(authenticateApiKey(request, ['content:read'], [record]).id).toBe('1'); expect(() => authenticateApiKey(request, ['internal:read'], [record])).toThrowError(ApiError) })
  it('does not leak CMS admin fields', () => { const result = toPublicDto('insights', { id: 1, title: 'Published', slug: 'published', _status: 'published', createdBy: { email: 'admin@example.com' }, password: 'secret', content: {} }); expect(result).not.toHaveProperty('_status'); expect(result).not.toHaveProperty('createdBy'); expect(result).not.toHaveProperty('password') })
  it('sanitises internal errors', async () => { vi.spyOn(console, 'error').mockImplementation(() => {}); const response = errorResponse(new Error('database password leaked'), 'id'); expect(response.status).toBe(500); expect(await response.text()).not.toContain('database password leaked') })
})
