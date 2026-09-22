import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/Services/:slug*',
        destination: '/services/:slug*',
      },
    ];
  },
};

export default nextConfig;