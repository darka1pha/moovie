import { Reviews, SimilarItems, Tvs } from '@/components'
import Credits from '@/components/show/credits'
import { getDiscovers } from '@/lib/actions/home'
import {
	getSimilarTvs,
	getTvCredits,
	getTvDetails,
	getTvReviews,
} from '@/lib/actions/shows'
import {
	CreditsProps,
	IPaginatedData,
	ListResults,
	ReviewList,
	TvDetails,
} from '@/types'

interface MetadataProps {
	params: { id: string }
}

export const generateMetadata = async ({ params: { id } }: MetadataProps) => {
	const data = (await getTvDetails({ id })) as TvDetails
	return {
		title: data.original_name,
		description: data.overview,
		alternates: {
			canonical: `/tv/${id}`,
		},
	}
}

export const generateStaticParams = async () => {
	const { results } = (await getDiscovers({
		genre: '',
		mediaType: 'tv',
		page: 1,
	})) as IPaginatedData<ListResults>

	if (!results) return []

	return results.map(({ id }) => ({
		id: id.toString(),
	}))
}

const TvPage = async ({ params: { id } }: { params: { id: string } }) => {
	const data = (await getTvDetails({ id })) as TvDetails
	const credits = (await getTvCredits({ id })) as CreditsProps
	const reviews = (await getTvReviews({ id })) as ReviewList
	const similars = (await getSimilarTvs({
		id,
	})) as IPaginatedData<ListResults>
	return (
		<div>
			<Tvs data={data} />
			<Credits data={credits} />
			{reviews.results.length > 0 && <Reviews data={reviews} />}
			<SimilarItems data={similars} />
		</div>
	)
}

export default TvPage
