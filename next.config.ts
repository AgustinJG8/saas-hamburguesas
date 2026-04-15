import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "azaexskhbjkrbdsvjewr.supabase.co",
      },
    ],
  },
};

export default nextConfig;
