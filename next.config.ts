/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  sassOptions: {
    includePaths: ['./src/styles'],
    prependData: `
      @import "variables";
      @import "mixins";
      @import "effects";
    `,
  },
};

module.exports = nextConfig;