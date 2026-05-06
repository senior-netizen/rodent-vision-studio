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
        source: '/projects/job-opportunities-for-everyone-platform',
        destination: '/projects/jofe-platform',
        permanent: true,
      },
      {
        source: '/projects/feel-at-home',
        destination: '/projects/feel-home',
        permanent: true,
      },
      {
        source: '/projects/shedsense',
        destination: '/projects/shedsense-grid',
        permanent: true,
      },
      {
        source: '/projects/ar-by-rodent',
        destination: '/projects/ar-experience',
        permanent: true,
      },
      {
        source: '/projects/precise-locations',
        destination: '/projects/precise-locations-lib',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
