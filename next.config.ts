import type { NextConfig } from 'next';
const config: NextConfig = {
  poweredByHeader: false,
  images: {
    qualities: [75, 90],
    deviceSizes: [640, 750, 828, 1080, 1200, 1536],
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
};
export default config;
