import { ApiError } from './errors'
import type { z } from 'zod'
import type { contactSchema } from './schemas'
type Contact = z.infer<typeof contactSchema>
const escape = (value: string) => value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)
export async function verifyTurnstile(token: string | undefined, ip: string) {
  if (!process.env.TURNSTILE_SECRET) return
  if (!token) throw new ApiError('VALIDATION_ERROR', 400, 'Bot check required')
  const body = new URLSearchParams({ secret: process.env.TURNSTILE_SECRET, response: token, remoteip: ip })
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body, cache: 'no-store' }); const result = await response.json() as { success?: boolean }
  if (!result.success) throw new ApiError('VALIDATION_ERROR', 400, 'Bot check failed')
}
export async function deliverContact(input: Contact) {
  if (process.env.EMAIL_PROVIDER !== 'resend' || !process.env.EMAIL_API_KEY || !process.env.EMAIL_FROM || !process.env.CONTACT_EMAIL) throw new ApiError('UPSTREAM_ERROR', 503, 'Email unavailable')
  const lines = [`Name: ${input.name}`, `Email: ${input.email}`, `Organisation: ${input.organisation}`, `Service: ${input.serviceInterest}`, `Phone: ${input.phone || 'Not supplied'}`, '', input.message, '', input.projectDetails || '']
  const response = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${process.env.EMAIL_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from: process.env.EMAIL_FROM, to: [process.env.CONTACT_EMAIL], reply_to: input.email, subject: `Rodent Lab enquiry from ${input.name}`, html: `<pre>${escape(lines.join('\n'))}</pre>` }), cache: 'no-store' })
  if (!response.ok) throw new ApiError('UPSTREAM_ERROR', 502, 'Email failed')
}
