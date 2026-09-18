const LOCAL_SITE_URL = 'http://localhost:8080';

/** The public brand and production origin confirmed for this application. */
export const PUBLIC_BRAND_LABEL = 'Rodent, Inc.';
export const PRODUCTION_SITE_URL = 'https://rodent.co.zw';

/**
 * Resolve the canonical site origin used to construct absolute public URLs.
 * Production must always provide NEXT_PUBLIC_SITE_URL; only local/test runs get
 * a localhost fallback.
 */
export function getSiteUrl(): URL {
  const configuredValue = process.env.NEXT_PUBLIC_SITE_URL;

  if (!configuredValue) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        `NEXT_PUBLIC_SITE_URL is required in production (expected ${PRODUCTION_SITE_URL}).`,
      );
    }

    return new URL(LOCAL_SITE_URL);
  }

  let url: URL;
  try {
    url = new URL(configuredValue);
  } catch {
    throw new Error('NEXT_PUBLIC_SITE_URL must be a valid absolute URL.');
  }

  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('NEXT_PUBLIC_SITE_URL must use the http or https protocol.');
  }

  if (url.username || url.password || url.search || url.hash || url.pathname !== '/') {
    throw new Error(
      'NEXT_PUBLIC_SITE_URL must be an origin without credentials, a path, query parameters, or a fragment.',
    );
  }

  if (process.env.NODE_ENV === 'production' && url.protocol !== 'https:') {
    throw new Error('NEXT_PUBLIC_SITE_URL must use https in production.');
  }

  return url;
}

export function getSiteOrigin(): string {
  return getSiteUrl().origin;
}
