/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for maximum Docker optimization
  output: "standalone",

  // Optimize for production
  poweredByHeader: false,

  // Experimental optimizations
  experimental: {
    // Your experimental options if any
  },

  // Port/hostname handled by environment variables
};

export default nextConfig;
