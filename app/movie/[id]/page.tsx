import { Movies, Reviews, SimilarItems } from '@/components'
import Credits from '@/components/show/credits'
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
