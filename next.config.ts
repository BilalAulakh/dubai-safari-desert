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
  // Public media filenames aren't hashed, so cache for a week and revalidate in the background
  async headers() {
    const mediaCache = [
      {
        key: "Cache-Control",
        value: "public, max-age=604800, stale-while-revalidate=2592000",
      },
    ];
    return [
      { source: "/images/:path*", headers: mediaCache },
      { source: "/videos/:path*", headers: mediaCache },
    ];
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
      // Tour pages live under /packages; /tours links still land on the right page
      {
        source: "/tours",
        destination: "/packages",
        permanent: true,
      },
      {
        source: "/tours/:slug",
        destination: "/packages/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
