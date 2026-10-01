import { NextResponse } from 'next/server'

export type ErrorCode = 'VALIDATION_ERROR' | 'NOT_FOUND' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'RATE_LIMITED' | 'CONFLICT' | 'INTERNAL_ERROR' | 'UPSTREAM_ERROR'

export class ApiError extends Error {
  constructor(public code: ErrorCode, public status: number, message: string) { super(message) }
}

const publicMessages: Record<ErrorCode, string> = {
  VALIDATION_ERROR: 'The request contains invalid data.', NOT_FOUND: 'The requested resource was not found.',
  UNAUTHORIZED: 'Authentication is required.', FORBIDDEN: 'You do not have permission to perform this action.',
  RATE_LIMITED: 'Too many requests. Please try again later.', CONFLICT: 'The request conflicts with the current state.',
  INTERNAL_ERROR: 'An unexpected error occurred.', UPSTREAM_ERROR: 'A required service is temporarily unavailable.'
}

export function errorResponse(error: unknown, requestId: string) {
  const apiError = error instanceof ApiError ? error : new ApiError('INTERNAL_ERROR', 500, publicMessages.INTERNAL_ERROR)
  console.error(JSON.stringify({ level: 'error', requestId, code: apiError.code, status: apiError.status }))
  return NextResponse.json({ error: { code: apiError.code, message: publicMessages[apiError.code] } }, { status: apiError.status, headers: { 'X-Request-ID': requestId, 'Cache-Control': 'no-store' } })
}

export function requestId(request: Request) {
  const supplied = request.headers.get('x-request-id')
  return supplied && /^[A-Za-z0-9._-]{1,100}$/.test(supplied) ? supplied : crypto.randomUUID()
}
