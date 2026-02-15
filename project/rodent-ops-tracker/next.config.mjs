const basePath = process.env.TRACKER_BASE_PATH || '/tracker';
const staticExport = process.env.STATIC_EXPORT === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
  assetPrefix: `${basePath}/`,
  output: staticExport ? 'export' : 'standalone',
  trailingSlash: staticExport,
  images: {
    unoptimized: staticExport
  }
};

export default nextConfig;
