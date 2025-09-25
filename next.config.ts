import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    devIndicators: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "tech-challenge-fase-3.vercel.app",
                pathname: "/api/uploads/**",
            },
            {
                protocol: "http",
                hostname: "localhost",
                pathname: "/api/uploads/**",
            },
        ],
    },
};

export default nextConfig;
