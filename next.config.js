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
      },
      {
        protocol: 'https',
        hostname: 'instalite-social-media.s3.ap-southeast-1.amazonaws.com',
        port: ''
      }
    ]
  }
};

module.exports = nextConfig;
