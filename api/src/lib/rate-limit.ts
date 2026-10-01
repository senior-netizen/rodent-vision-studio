import { ApiError } from './errors'
const local = new Map<string, { count: number; reset: number }>()
export async function rateLimit(key: string, limit: number, windowSeconds: number) {
  const url = process.env.RATE_LIMIT_STORE_URL; const token = process.env.RATE_LIMIT_STORE_TOKEN
  if (url && token) {
    const response = await fetch(`${url.replace(/\/$/, '')}/pipeline`, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify([['INCR', key], ['EXPIRE', key, windowSeconds, 'NX']]), cache: 'no-store' })
    if (!response.ok) throw new ApiError('UPSTREAM_ERROR', 503, 'Rate limiter unavailable')
    const result = await response.json() as Array<{ result: number }>; if (result[0]?.result > limit) throw new ApiError('RATE_LIMITED', 429, 'Limit exceeded'); return
  }
  if (process.env.NODE_ENV === 'production') throw new ApiError('UPSTREAM_ERROR', 503, 'Rate limiter unavailable')
  const now = Date.now(); const entry = local.get(key)
  if (!entry || entry.reset <= now) { local.set(key, { count: 1, reset: now + windowSeconds * 1000 }); return }
  if (++entry.count > limit) throw new ApiError('RATE_LIMITED', 429, 'Limit exceeded')
}
export function resetLocalRateLimits() { local.clear() }
