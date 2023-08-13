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
	mediaType,
	genre,
}: {
	page: number
	mediaType: string
	genre: string
}) => {
	console.log('URL: ', DISCOVER({ mediaType, genre, pageParam: page }))

	const res = await fetch(
		BASE_URL + DISCOVER({ mediaType, genre, pageParam: page })
	)
	return res.json()
}

export const getMovieGenres = async () => {
	const res = await fetch(BASE_URL + MOVIE_GENRES)
	return res.json()
}
