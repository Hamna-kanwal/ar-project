import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/Services/appliance-installation',
        destination: '/Services/appliance-installation',
      },
      {
        source: '/Services/landlord-certificate',
        destination: '/Services/landlord-certificate',
      },
      {
        source: '/Services/centeral-heating',
        destination: '/Services/centeral-heating',
      },
      {
        source: '/Services/underfloor-installation',
        destination: '/Services/underfloor-installation',
      },
      {
        source: '/megaflo',
        destination: '/megaflo',
      },
    ];
  },
};

export default nextConfig;