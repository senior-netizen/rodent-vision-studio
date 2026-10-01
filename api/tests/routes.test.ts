import { describe, expect, it, vi } from 'vitest'
vi.mock('next/server', async () => ({ NextResponse: { json: (body: unknown, init?: ResponseInit) => Response.json(body, init) } }))
import { GET as health } from '../src/app/health/route'
describe('routes', () => { it('returns minimal health status', async () => { const response = await health(new Request('http://localhost/health')); expect(response.status).toBe(200); expect(await response.json()).toEqual({ status: 'ok' }) }) })
