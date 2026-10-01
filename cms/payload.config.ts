import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { Categories, Tags, Technologies, Industries, Authors } from './src/collections/Taxonomies'
import { Insights } from './src/collections/Insights'
import { Services } from './src/collections/Services'
import { Projects } from './src/collections/Projects'
import { AuditLogs } from './src/collections/AuditLogs'
import { Homepage, Navigation, SiteSettings } from './src/globals'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const required = (name: 'DATABASE_URL' | 'PAYLOAD_SECRET' | 'BLOB_READ_WRITE_TOKEN') => {
  const value = process.env[name]
  if (!value) throw new Error(`${name} is required. Copy .env.example to .env for local development.`)
  return value
}
const origins = [process.env.CMS_PUBLIC_URL || 'http://localhost:3001', process.env.PUBLIC_SITE_URL || 'http://localhost:3000']
const smtpConfigured = Boolean(process.env.SMTP_HOST && process.env.SMTP_FROM)
const blobToken = required('BLOB_READ_WRITE_TOKEN')

export default buildConfig({
  serverURL: process.env.CMS_PUBLIC_URL || 'http://localhost:3001', secret: required('PAYLOAD_SECRET'),
  admin: { user: Users.slug, meta: { titleSuffix: '— Rodent Lab CMS' } }, routes: { admin: '/admin', api: '/api' }, cors: origins, csrf: origins,
  db: postgresAdapter({ pool: { connectionString: required('DATABASE_URL') }, push: process.env.NODE_ENV !== 'production' }), editor: lexicalEditor(),
  collections: [Users, Media, Insights, Services, Projects, Categories, Tags, Authors, Technologies, Industries, AuditLogs], globals: [SiteSettings, Navigation, Homepage],
  plugins: [vercelBlobStorage({ enabled: true, clientUploads: true, collections: { media: true }, token: blobToken })],
  ...(smtpConfigured ? { email: nodemailerAdapter({ defaultFromAddress: process.env.SMTP_FROM!, defaultFromName: 'Rodent Lab CMS', transportOptions: { host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined } }) } : {}),
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') }, graphQL: { disablePlaygroundInProduction: true },
})
