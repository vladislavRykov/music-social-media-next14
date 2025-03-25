/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['lh3.googleusercontent.com', 'firebasestorage.googleapis.com','media.kudago.com'],
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
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });
// const ff = withBundleAnalyzer2({
//   enabled: process.env.ANALYZE === 'true',
// });

// export default ff(nextConfig);
export default nextConfig;
