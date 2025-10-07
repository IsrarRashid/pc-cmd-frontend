import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://110.39.184.210:192/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
