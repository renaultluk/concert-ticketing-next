/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        child_process: false,
        net: false,
        tls: false,
      }
    }
    return config
  },
}

module.exports = nextConfig
