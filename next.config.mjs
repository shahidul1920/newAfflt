/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'longevityreviewed.com',
      },
      {
        protocol: 'https',
        hostname: 'www.longevityreviewed.com',
      },
    ],
  },
};

export default nextConfig;
