/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/Add',
  //       destination: '/add/',
  //       permanent: true,
  //     },
  //   ]
  // },
}

module.exports = nextConfig
