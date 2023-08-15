import {
	BASE_URL,
	MOVIE_CREDITS,
	MOVIE_DETAILS,
	TV_CREDITS,
	TV_DETAILS,
} from '../urls'

export const getTvDetails = async ({ id }: { id: string }) => {
	try {
		const res = await fetch(BASE_URL + TV_DETAILS(id), { cache: 'force-cache' })

		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}

		return res.json()
	} catch (error) {
		throw new Error('Failed to fetch data')
	}
}

export const getMovieDetails = async ({ id }: { id: string }) => {
	try {
		const res = await fetch(BASE_URL + MOVIE_DETAILS(id), {
			cache: 'force-cache',
		})

		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}

		return res.json()
	} catch (error) {
		throw new Error('Failed to fetch data')
	}
}

export const getMovieCredits = async ({ id }: { id: string }) => {
	console.log(BASE_URL + MOVIE_CREDITS(id))
	try {
		const res = await fetch(BASE_URL + MOVIE_CREDITS(id), {
			cache: 'force-cache',
		})

		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}

		return res.json()
	} catch (error) {
		throw new Error('Failed to fetch data')
	}
}

export const getTvCredits = async ({ id }: { id: string }) => {
	try {
		const res = await fetch(BASE_URL + TV_CREDITS(id), {
			cache: 'force-cache',
		})

		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}

		return res.json()
	} catch (error) {
		throw new Error('Failed to fetch data')
	}
}
