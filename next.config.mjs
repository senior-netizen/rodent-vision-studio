/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'dist',
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: true
  }
};

export default nextConfig;
