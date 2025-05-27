import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true, // This is not recommended for production, but can be useful during development
  },
  eslint: {
    ignoreDuringBuilds: true, // This is not recommended for production, but can be useful during development
  },
};

export default nextConfig;
