/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['image.tmdb.org', 'poblslcgnztbjyudaycw.supabase.co'],
	},
	experimental: {
		serverActions: true,
	},
}

module.exports = nextConfig
