import { Movies } from '@/components'
import Credits from '@/components/show/credits'
import { getMovieCredits, getMovieDetails } from '@/lib/actions/shows'
import { CreditsProps, MovieDetails } from '@/types'

const MoviePage = async ({ params: { id } }: { params: { id: string } }) => {
	const data = (await getMovieDetails({ id })) as MovieDetails
	const credits = (await getMovieCredits({ id })) as CreditsProps
	return (
		<div>
			<Movies data={data} />
			<Credits data={credits} />
		</div>
	)
}

export default MoviePage
