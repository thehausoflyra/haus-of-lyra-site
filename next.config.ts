import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
  async redirects() {
    return [
      { source: "/weddings/film", destination: "/weddings/videography", permanent: false },
      { source: "/weddings/photography", destination: "/weddings", permanent: false },
    ];
  },
};

export default nextConfig;
