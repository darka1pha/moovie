import { Movies, Reviews, SimilarItems } from '@/components'
import Credits from '@/components/show/credits'
import { getDiscovers } from '@/lib/actions/home'
import {
	getMovieCredits,
	getMovieDetails,
	getMovieReviews,
	getSimilarMovies,
} from '@/lib/actions/shows'
import {
	CreditsProps,
	IPaginatedData,
	ListResults,
	MovieDetails,
	ReviewList,
} from '@/types'

interface MetadataProps {
	params: { id: string }
}

export const generateMetadata = async ({ params: { id } }: MetadataProps) => {
	const data = (await getMovieDetails({ id })) as MovieDetails
	return {
		title: data.original_title,
		description: data.overview,
		alternates: {
			canonical: `/movie/${id}`,
		},
	}
}

export const generateStaticParams = async () => {
	const { results } = (await getDiscovers({
		genre: '',
		mediaType: 'movie',
		page: 1,
	})) as IPaginatedData<ListResults>

	if (!results) return []

	return results.map(({ id }) => ({
		id: id.toString(),
	}))
}

const MoviePage = async ({ params: { id } }: { params: { id: string } }) => {
	const data = (await getMovieDetails({ id })) as MovieDetails
	const credits = (await getMovieCredits({ id })) as CreditsProps
	const reviews = (await getMovieReviews({ id })) as ReviewList
	const similars = (await getSimilarMovies({
		id,
	})) as IPaginatedData<ListResults>
	return (
		<div>
			<Movies data={data} />
			<Credits data={credits} />
			{reviews.results.length > 0 && <Reviews data={reviews} />}
			<SimilarItems data={similars} />
		</div>
	)
}

export default MoviePage
