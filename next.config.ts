import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://110.39.184.210:192/api/:path*`,
      },
      {
        source: "/upload/:path*",
        destination: `http://110.39.184.210:192/upload/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "110.39.184.210",
        port: "192",
        pathname: "/upload/**",
      },
    ],
  },
};

export default nextConfig;
