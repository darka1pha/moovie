import { TRENDINGS, BASE_URL, MOVIE_GENRES } from '../urls'

export const getTrendigs = async ({ page }: { page: number }) => {
	const res = await fetch(
		BASE_URL + TRENDINGS({ media_type: 'all', pageParam: page })
	)
	return res.json()
}

export const getMovieGenres = async () => {
	const res = await fetch(BASE_URL + MOVIE_GENRES)
	return res.json()
}
