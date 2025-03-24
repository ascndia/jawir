import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // This allows images from any domain
      },
    ],
  },
};

export default nextConfig;
