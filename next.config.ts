import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 1. Sirf apne internal page redirects yahan rakhein (Domain redirects Vercel handle karega)
      {
        source: '/megaflo',
        destination: '/services/megaflo',
        permanent: true,
      },
      {
        source: '/Services/appliance-installation',
        destination: '/services/appliance-installation',
        permanent: true,
      },
      {
        source: '/Services/landlord-certificate',
        destination: '/services/landlord-certificate',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/Services/centeral-heating',
        destination: '/services/central-heating', // Spelling correction
      },
      {
        source: '/Services/underfloor-installation',
        destination: '/services/underfloor-installation',
      },
    ];
  },
};

export default nextConfig;