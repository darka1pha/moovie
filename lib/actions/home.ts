import { TRENDINGS, BASE_URL, MOVIE_GENRES, DISCOVER, TV_GENRES } from '../urls'

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
	try {
		const res = await fetch(
			BASE_URL + DISCOVER({ mediaType, genre, pageParam: page })
		)

		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}

		return res.json()
	} catch (error) {
		throw new Error('Failed to fetch data')
	}
}

export const getGenres = async ({ mediaType }: { mediaType: string }) => {
	const GENRE_URL =
		mediaType.toLocaleLowerCase() === 'tv' ? TV_GENRES : MOVIE_GENRES
	const res = await fetch(BASE_URL + GENRE_URL)
	return res.json()
}
