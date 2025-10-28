/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // patrón general para buckets de S3 (us-east-1)
      { protocol: 'https', hostname: '*.s3.amazonaws.com' },
      { protocol: 'https', hostname: '*.s3.*.amazonaws.com' },
      // tu bucket directo (opcional, pero suma)
      { protocol: 'https', hostname: 'nuvion-logos.s3.us-east-1.amazonaws.com' },
    ],
  },
};

module.exports = nextConfig;
