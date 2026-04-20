import { z } from 'zod';

const featureFlagSchema = z.enum(['1', '0', 'true', 'false']).optional();

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  RESEND_API_KEY: z.string().min(1).optional(),
  CONTACT_TO_EMAIL: z.string().email().optional(),
  CONTACT_FROM_EMAIL: z.string().email().optional(),
  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
  FEATURE_ANALYTICS: featureFlagSchema,
  FEATURE_CONTACT_FORM: featureFlagSchema,
  FEATURE_AUTOMATION: featureFlagSchema,
});

export type ServerEnv = {
  nodeEnv: 'development' | 'test' | 'production';
  resendApiKey?: string;
  contactToEmail: string;
  contactFromEmail: string;
  cloudinary: {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
  };
  features: {
    analytics: boolean;
    contactForm: boolean;
    automation: boolean;
  };
};

let cachedEnv: ServerEnv | null = null;

function parseFeatureFlag(value: z.infer<typeof featureFlagSchema>, defaultValue = false): boolean {
  if (!value) return defaultValue;
  return value === '1' || value === 'true';
}

function buildServerEnv(): ServerEnv {
  const parsed = serverEnvSchema.safeParse(process.env);

  if (!parsed.success) {
    const missing = parsed.error.issues
      .map((issue: z.ZodIssue) => issue.path.join('.'))
      .filter(Boolean)
      .join(', ');

    throw new Error(`Invalid server environment configuration: ${missing || parsed.error.message}`);
  }

  const env = parsed.data;

  return {
    nodeEnv: env.NODE_ENV,
    resendApiKey: env.RESEND_API_KEY,
    contactToEmail: env.CONTACT_TO_EMAIL ?? 'you@rodent.co.zw',
    contactFromEmail: env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev',
    cloudinary: {
      cloudName: env.CLOUDINARY_CLOUD_NAME,
      apiKey: env.CLOUDINARY_API_KEY,
      apiSecret: env.CLOUDINARY_API_SECRET,
    },
    features: {
      analytics: parseFeatureFlag(env.FEATURE_ANALYTICS, true),
      contactForm: parseFeatureFlag(env.FEATURE_CONTACT_FORM, true),
      automation: parseFeatureFlag(env.FEATURE_AUTOMATION, false),
    },
  };
}

export function getServerEnv(): ServerEnv {
  if (cachedEnv) return cachedEnv;
  cachedEnv = buildServerEnv();
  return cachedEnv;
}

export function assertProductionEnv(): void {
  const env = getServerEnv();

  if (env.nodeEnv !== 'production') return;

  const requiredInProduction: Array<[key: string, value: string | undefined]> = [
    ['RESEND_API_KEY', env.resendApiKey],
    ['CLOUDINARY_CLOUD_NAME', env.cloudinary.cloudName],
    ['CLOUDINARY_API_KEY', env.cloudinary.apiKey],
    ['CLOUDINARY_API_SECRET', env.cloudinary.apiSecret],
  ];

  const missing = requiredInProduction.filter(([, value]) => !value).map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(`Missing required production environment variables: ${missing.join(', ')}`);
  }
}
