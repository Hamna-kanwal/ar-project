// next.config.ts
import type { NextConfig } from 'next';

const r = (source: string, destination: string) => ({
  source,
  destination,
  permanent: true, // Next.js sends 308, which Google treats like a 301
});

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Boiler
      r('/boiler-installation', '/Services/boiler-installation'),
      r('/boiler-repair', '/Services/boiler-breakdown'),
      r('/boiler-repairs', '/Services/boiler-breakdown'),
      r('/boiler-services', '/Services/boiler'),
      r('/boilers', '/Services/boiler'),

      // Heating
      r('/heating-installation', '/Services/heating-installation'),
      r('/heating', '/Services/heating-installation'),
      r('/heating-plumbing', '/Services/heating-installation'),
      r('/central-heating-system-installation', '/Services/central-heating'),
      r('/central', '/Services/central-heating'),
      r('/power-flushing', '/Services/power-flushing'),
      r('/underfloor-heating-system-installation', '/Services/underfloor-heating'),

      // Thermostats
      r('/thermostat-installation', '/Services/thermostat-installation'),
      r('/nest-thermostat-installation', '/Services/nest'),
      r('/hive-thermostat-installation', '/Services/hive'),

      // Megaflo / landlord
      r('/services/megaflo','/Services/megaflo'),
      r('/megaflo-unvented-cylinder-installation', '/Services/megaflo'),
      r('/services/landlord-certificate', '/Services/landlord'),

      // Appliances
      r('/gas-cookers', '/Services/gas-cooker'),
      r('/gas-cookers-installation', '/Services/gas-cooker'),
      r('/dishwasher', '/Services/dishwasher'),
      r('/dishwasher-installation', '/Services/dishwasher'),
      r('/washingmachine', '/Services/washing-machine'),
      r('/washing-machine-installation', '/Services/washing-machine'),
      r('/services/appliance-installation', '/Services/general-installation'),
      r('/general-installation', '/Services/general-installation'),

      // Plumbing / emergency
      r('/general-plumbing-repair', '/Services/general-plumbing'),
      r('/emergency-services', '/Services/emergency-services'),

      // Info pages
      r('/areas-we-cover', '/location'),
      r('/news', '/blogs'),
      r('/safety-tips', '/blogs'),
      r('/heating-tips', '/blogs'),
      r('/why-ar-heating', '/about'),
      r('/index.html', '/'),
      r('/sitemap.html', '/'),
    ];
  },
};

export default nextConfig;