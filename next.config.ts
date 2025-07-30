/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Must be set
  },
};

module.exports = nextConfig; // ✅ CommonJS, not export default
