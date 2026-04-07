/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: false
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
