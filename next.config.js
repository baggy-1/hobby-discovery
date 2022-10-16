/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  images: {
    domains: [
      "user-images.githubusercontent.com",
      "hobbydiscovery.herokuapp.com",
    ],
  },
};

module.exports = nextConfig;
