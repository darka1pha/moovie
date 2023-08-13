import { TRENDINGS, BASE_URL, MOVIE_GENRES, DISCOVER } from '../urls'

export const getTrendigs = async ({
	page,
	mediaType = 'all',
}: {
	page: number
	mediaType: 'all' | 'movie' | 'tv'
}) => {
	const res = await fetch(
		BASE_URL + TRENDINGS({ media_type: mediaType, pageParam: page })
	)
	return res.json()
}

export const getDiscovers = async ({
	page,
	mediaType = 'movie',
	genre,
}: {
	page: number
	mediaType: string
	genre: string
}) => {
	console.log('Media: ', mediaType, ' Genre: ', genre)

	const res = await fetch(
		BASE_URL + DISCOVER({ mediaType, genre, pageParam: page }),
		{ cache: 'no-cache' }
	)
	return res.json()
}

export const getMovieGenres = async () => {
	const res = await fetch(BASE_URL + MOVIE_GENRES)
	return res.json()
}
