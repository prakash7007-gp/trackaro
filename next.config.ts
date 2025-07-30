/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Fully disables ESLint during build
  },
};

export default nextConfig;
