/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/add',
        destination: '/Add',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
