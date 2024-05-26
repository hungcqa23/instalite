/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'scontent.cdninstagram.com',
        port: ''
      }
    ]
  }
};

module.exports = nextConfig;
