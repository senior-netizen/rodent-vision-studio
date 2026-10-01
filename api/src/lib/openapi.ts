export const openapi = {
  openapi: '3.1.0', info: { title: 'Rodent Lab API', version: '1.0.0', description: 'Published Rodent Lab content and contact API.' },
  servers: [{ url: process.env.PUBLIC_API_URL || 'http://localhost:3002' }],
  tags: [{ name: 'System' }, { name: 'Content' }, { name: 'Contact' }],
  paths: {
    '/health': { get: { tags: ['System'], summary: 'Service health', responses: { '200': { description: 'Healthy' } } } },
    ...Object.fromEntries(['insights', 'services', 'projects', 'categories', 'technologies', 'industries'].map(name => [`/v1/${name}`, { get: { tags: ['Content'], summary: `List published ${name}`, parameters: [
      { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1 } }, { name: 'limit', in: 'query', schema: { type: 'integer', minimum: 1, maximum: 100 } },
      { name: 'category', in: 'query', schema: { type: 'string' } }, { name: 'tag', in: 'query', schema: { type: 'string' } }, { name: 'featured', in: 'query', schema: { type: 'boolean' } }, { name: 'search', in: 'query', schema: { type: 'string', maxLength: 100 } }
    ], responses: { '200': { description: 'Published records' }, '400': { $ref: '#/components/responses/Error' }, '429': { $ref: '#/components/responses/RateLimited' } } } }])),
    ...Object.fromEntries(['insights', 'services', 'projects'].map(name => [`/v1/${name}/{slug}`, { get: { tags: ['Content'], summary: `Get a published ${name.slice(0, -1)}`, parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'Published record' }, '404': { $ref: '#/components/responses/Error' } } } }])),
    '/v1/contact': { post: { tags: ['Contact'], summary: 'Submit a project enquiry', description: 'Limited to five submissions per IP address per hour.', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Contact' } } } }, responses: { '200': { description: 'Accepted' }, '400': { $ref: '#/components/responses/Error' }, '429': { $ref: '#/components/responses/RateLimited' } } } }
  },
  components: {
    securitySchemes: { bearerApiKey: { type: 'http', scheme: 'bearer', description: 'Machine API key. Keys are hashed at rest and scope constrained.' } },
    schemas: { Contact: { type: 'object', additionalProperties: false, required: ['name', 'email', 'organisation', 'message', 'serviceInterest'], properties: { name: { type: 'string' }, email: { type: 'string', format: 'email' }, organisation: { type: 'string' }, message: { type: 'string', maxLength: 5000 }, serviceInterest: { type: 'string' }, phone: { type: 'string' }, projectDetails: { type: 'string' }, website: { type: 'string', maxLength: 0 }, turnstileToken: { type: 'string' } } }, Error: { type: 'object', properties: { error: { type: 'object', properties: { code: { type: 'string' }, message: { type: 'string' } } } } } },
    responses: { Error: { description: 'Error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }, RateLimited: { description: 'Rate limit exceeded', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } } }
  }
} as const
