import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/reviews/new",
        destination: "/review",
        permanent: true,
      },
      {
        source: "/feedback",
        destination: "/review",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
