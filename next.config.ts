import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 1. HTTP se HTTPS aur www se non-www redirects (Permanent 301)
      {
        source: '/http://arheatingservice.co.uk/:path*',
        destination: 'https://arheatingservice.co.uk/:path*',
        permanent: true,
      },
      {
        source: '/http://www.arheatingservice.co.uk/:path*',
        destination: 'https://arheatingservice.co.uk/:path*',
        permanent: true,
      },
      {
        source: '/https://www.arheatingservice.co.uk/:path*',
        destination: 'https://arheatingservice.co.uk/:path*',
        permanent: true,
      },
      // 2. Malformed / concatenated internal links fix
      {
        source: '/https:/arheatingservice.co.uk/:path*',
        destination: 'https://arheatingservice.co.uk/:path*',
        permanent: true,
      },
      // 3. Service pages aur old routes
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