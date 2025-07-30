/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable strict mode for React
  reactStrictMode: true,

  // Enable SWC minification for better performance
  swcMinify: true,

  // Ignore ESLint during production build (optional)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Allow images from external domains (update as needed)
  images: {
    domains: ["yourdomain.com", "images.unsplash.com"],
  },

  // Uncomment this if using a subdirectory (optional)
  // basePath: '/your-base-path',

  // Uncomment if deploying as static site (not needed for full Next.js apps on Vercel)
  // output: 'export',
};

module.exports = nextConfig;
