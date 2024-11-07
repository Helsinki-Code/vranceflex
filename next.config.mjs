/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 0,
    },
  },
  // Add this to ensure compatibility with Cloudflare Pages
  output: 'standalone',
  images: {
    unoptimized: true, // Required for Cloudflare Pages
    domains: ['clerk.vranceflex.online'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'clerk.vranceflex.online',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig