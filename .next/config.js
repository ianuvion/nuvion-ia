/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nuvion-logos.s3.us-east-1.amazonaws.com',
        pathname: '/logos/**',
      },
    ],
  },
};

module.exports = nextConfig;
