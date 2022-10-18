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
      "chiham-image.s3.ap-northeast-2.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
