import { getDiscovers } from '@/lib/actions/home'
import { IPaginatedData, ListResults } from '@/types'

const URL = 'https://moovie.vercel.app'

export default async function sitemap() {
	const { results: movies } = (await getDiscovers({
		genre: '',
		page: 1,
		mediaType: 'movie',
	})) as IPaginatedData<ListResults>

	const { results: tvs } = (await getDiscovers({
		genre: '',
		page: 1,
		mediaType: 'tv',
	})) as IPaginatedData<ListResults>

	const posts = [
		...movies.map(({ id }) => ({
			url: `${URL}/movie/${id}`,
			lastModified: new Date().toISOString(),
		})),
		...tvs.map(({ id }) => ({
			url: `${URL}/tv/${id}`,
			lastModified: new Date().toISOString(),
		})),
	]

	const routes = [''].map((route) => ({
		url: `${URL}${route}`,
		lastModified: new Date().toISOString(),
	}))

	return [...routes, ...posts]
}
