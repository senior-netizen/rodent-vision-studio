import { z } from 'zod'

export const querySchema = z.object({
  page: z.coerce.number().int().min(1).default(1), limit: z.coerce.number().int().min(1).max(100).default(20),
  category: z.string().trim().min(1).max(100).optional(), tag: z.string().trim().min(1).max(100).optional(),
  featured: z.enum(['true', 'false']).transform(v => v === 'true').optional(), search: z.string().trim().min(1).max(100).optional()
}).strict()
export const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(120)
export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100), email: z.string().trim().email().max(254), organisation: z.string().trim().min(2).max(150),
  message: z.string().trim().min(10).max(5000), serviceInterest: z.string().trim().min(2).max(120),
  phone: z.string().trim().max(40).optional(), projectDetails: z.string().trim().max(3000).optional(),
  website: z.string().max(0).optional(), turnstileToken: z.string().max(2048).optional()
}).strict()
export const webhookSchema = z.object({
  id: z.string().min(1).max(200), event: z.enum(['insight.published', 'insight.updated', 'service.published', 'service.updated', 'project.published', 'project.updated', 'content.unpublished']),
  collection: z.enum(['insights', 'services', 'projects', 'categories', 'technologies', 'industries']).optional(), slug: slugSchema.optional()
}).strict()
