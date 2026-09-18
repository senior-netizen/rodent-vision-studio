/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: false
  },
  async redirects() {
    return [
      {
        source: '/projects/jofe-platform',
        destination: '/projects/job-opportunities-for-everyone-platform',
        permanent: true,
      },
      {
        source: '/projects/feel-home',
        destination: '/projects/feel-at-home',
        permanent: true,
      },
      {
        source: '/projects/ar-experience',
        destination: '/projects/ar-by-rodent',
        permanent: true,
      },
      {
        source: '/projects/precise-locations-lib',
        destination: '/projects/precise-locations',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
