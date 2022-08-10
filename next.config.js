/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'localhost',
      'lari-dada.art',
    ],
  },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
};

module.exports = nextConfig;
