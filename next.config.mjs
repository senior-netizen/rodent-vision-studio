/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: true
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
