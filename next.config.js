/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
	experimental: {
		ppr: true,
	},
	images: {
		minimumCacheTTL: 31536000,
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

module.exports = withBundleAnalyzer(nextConfig);
