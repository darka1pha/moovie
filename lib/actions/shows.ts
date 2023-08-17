import {
	BASE_URL,
	MOVIE_CREDITS,
	MOVIE_DETAILS,
	MOVIE_REVIEWS,
	MOVIE_SIMILARS,
	TV_CREDITS,
	TV_DETAILS,
	TV_REVIEWS,
	TV_SIMILARS,
} from '../urls'

export const getTvDetails = async ({ id }: { id: string }) => {
	try {
		const res = await fetch(BASE_URL + TV_DETAILS(id))

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
		const res = await fetch(BASE_URL + MOVIE_DETAILS(id))

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
		const res = await fetch(BASE_URL + MOVIE_CREDITS(id))

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
		const res = await fetch(BASE_URL + TV_CREDITS(id))

		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}

		return res.json()
	} catch (error) {
		throw new Error('Failed to fetch data')
	}
}

export const getMovieReviews = async ({ id }: { id: string }) => {
	try {
		const res = await fetch(BASE_URL + MOVIE_REVIEWS(id))

		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}

		return res.json()
	} catch (error) {
		throw new Error('Failed to fetch data')
	}
}

export const getTvReviews = async ({ id }: { id: string }) => {
	try {
		const res = await fetch(BASE_URL + TV_REVIEWS(id))

		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}

		return res.json()
	} catch (error) {
		throw new Error('Failed to fetch data')
	}
}
export const getSimilarTvs = async ({ id }: { id: string }) => {
	try {
		const res = await fetch(BASE_URL + TV_SIMILARS(id))

		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}

		return res.json()
	} catch (error) {
		throw new Error('Failed to fetch data')
	}
}

export const getSimilarMovies = async ({ id }: { id: string }) => {
	try {
		const res = await fetch(BASE_URL + MOVIE_SIMILARS(id))

		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}

		return res.json()
	} catch (error) {
		throw new Error('Failed to fetch data')
	}
}
