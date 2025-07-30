/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  // Optional: Add trailing slashes to all routes (e.g., /about -> /about/)
  trailingSlash: true,

  // Optional: Output directory (default is 'out')
  distDir: "dist",
};

module.exports = nextConfig;
