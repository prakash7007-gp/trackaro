/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Prevent build failure from ESLint
  },
};

module.exports = nextConfig; // ✅ Use CommonJS export
