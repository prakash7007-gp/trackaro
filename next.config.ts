// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Disable ESLint in Vercel build
  },
};

module.exports = nextConfig; // ✅ Use CommonJS export for Vercel
