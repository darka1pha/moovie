/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< HEAD
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
=======
  experimental: {
    ppr: true,
  },
  images: {
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'zdpoxenubhhhhbcgygng.supabase.co',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
>>>>>>> 9c0b93ef198e6e853e954ec2cfbbc33641daa190
};

module.exports = nextConfig;
