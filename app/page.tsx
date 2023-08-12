import { Filters, Hero, Items, PageCounter } from '@/components'
import { getMovieGenres, getTrendigs } from '@/lib/actions/home'
import { Genres, IPaginatedData, ListResults } from '@/types'

export default async function Home({
	searchParams: { page },
}: {
	searchParams: { page: number }
}) {
	const {
		page: currentPage,
		results,
		total_pages,
	} = (await getTrendigs({ page })) as IPaginatedData<ListResults>
	const { results: bannerData } = (await getTrendigs({
		page: 1,
	})) as IPaginatedData<ListResults>
	const { genres } = (await getMovieGenres()) as Genres
	return (
		<main>
			<Hero data={bannerData.slice(0, 6)} />
			<Filters data={genres} />
			<Items data={results} />
			<PageCounter
				currentPage={currentPage}
				totalPages={total_pages > 500 ? 500 : total_pages}
			/>
		</main>
	)
}
