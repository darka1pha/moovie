import { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";
import path from "path";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  images: {
    minimumCacheTTL: 31536000,
    qualities: [75, 80],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "zdpoxenubhhhhbcgygng.supabase.co",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);