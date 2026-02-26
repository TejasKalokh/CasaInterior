import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow LAN access from other devices on the same network (e.g. phone, tablet)
  allowedDevOrigins: ["192.168.0.101", "192.168.0.*"],

  // Allow remote images from Unsplash (used for demo imagery)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    // Generate correct srcset breakpoints for all viewport widths
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache optimised images for 24 hours to avoid repeated re-processes
    minimumCacheTTL: 86400,
  },

  // Disable strict mode in dev to prevent double-mount RAF accumulation;
  // production builds are always single-mount regardless of this flag.
  reactStrictMode: process.env.NODE_ENV === "production",

  // Compiler options
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Proxy /media/** requests to the Spring Boot backend so uploaded
  // images and videos (stored on the backend disk) are accessible
  // from the frontend origin without CORS issues.
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '')
      || 'http://localhost:8080';
    return [
      {
        source: '/media/:path*',
        destination: `${backendUrl}/media/:path*`,
      },
    ];
  },
};

export default nextConfig;
