/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['lh3.googleusercontent.com', 'firebasestorage.googleapis.com', 'media.kudago.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
