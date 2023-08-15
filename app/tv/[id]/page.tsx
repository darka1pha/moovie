import { Tvs } from '@/components'
import Credits from '@/components/show/credits'
import { getTvCredits, getTvDetails } from '@/lib/actions/shows'
import { CreditsProps, TvDetails } from '@/types'

const TvPage = async ({ params: { id } }: { params: { id: string } }) => {
	const data = (await getTvDetails({ id })) as TvDetails
	const credits = (await getTvCredits({ id })) as CreditsProps
	return (
		<div>
			<Tvs data={data} />
			<Credits data={credits} />
		</div>
	)
}

export default TvPage
