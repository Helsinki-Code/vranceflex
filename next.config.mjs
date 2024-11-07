/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 0,
    },
  },
  output: 'standalone', // Add this for Cloudflare Pages
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
