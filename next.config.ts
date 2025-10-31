import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '250mb', // Allow up to 250MB for file uploads
    },
  },
};

export default nextConfig;
