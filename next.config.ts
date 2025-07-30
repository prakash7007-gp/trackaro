/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // ❌ Don't use output: 'export' if using API routes
};

module.exports = nextConfig;
