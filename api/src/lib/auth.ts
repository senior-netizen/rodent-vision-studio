import { createHash, timingSafeEqual } from 'node:crypto'
import { ApiError } from './errors'
export const scopes = ['content:read', 'projects:read', 'services:read', 'insights:read', 'webhooks:write', 'internal:read'] as const
export type Scope = typeof scopes[number]
export type ApiKeyRecord = { id: string; name: string; hash: string; prefix: string; scopes: Scope[]; enabled: boolean; createdAt: string; expiresAt?: string; lastUsedAt?: string }
export function hashApiKey(key: string, pepper = process.env.API_KEY_PEPPER || '') { return createHash('sha256').update(`${pepper}:${key}`).digest('hex') }
export function authenticateApiKey(request: Request, required: Scope[], records?: ApiKeyRecord[]) {
  const token = request.headers.get('authorization')?.match(/^Bearer ([A-Za-z0-9_-]{20,})$/)?.[1]
  if (!token) throw new ApiError('UNAUTHORIZED', 401, 'Missing API key')
  const keys = records ?? JSON.parse(process.env.API_KEYS_JSON || '[]') as ApiKeyRecord[]; const hash = hashApiKey(token)
  const record = keys.find(k => k.enabled && (!k.expiresAt || new Date(k.expiresAt) > new Date()) && k.hash.length === hash.length && timingSafeEqual(Buffer.from(k.hash), Buffer.from(hash)))
  if (!record) throw new ApiError('UNAUTHORIZED', 401, 'Invalid API key')
  if (!required.every(scope => record.scopes.includes(scope))) throw new ApiError('FORBIDDEN', 403, 'Missing scope')
  return record
}
