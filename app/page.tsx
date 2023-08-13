import { Filters, Hero, Items, PageCounter } from '@/components'
import { getDiscovers, getMovieGenres, getTrendigs } from '@/lib/actions/home'
import { Genres, IPaginatedData, ListResults } from '@/types'

export default async function Home({
	searchParams: { page, mediaType, genre },
}: {
	searchParams: { page: number; mediaType: string; genre: string }
}) {
	const {
		page: currentPage,
		results,
		total_pages,
	} = mediaType === 'All' || !mediaType
		? ((await getTrendigs({
				page,
				mediaType: 'all',
		  })) as IPaginatedData<ListResults>)
		: ((await getDiscovers({
				genre,
				mediaType,
				page,
		  })) as IPaginatedData<ListResults>)

	const { results: bannerData } = (await getTrendigs({
		page: 1,
		mediaType: 'all',
	})) as IPaginatedData<ListResults>

	const { genres } = (await getMovieGenres()) as Genres

	return (
		<main>
			<Hero data={bannerData.slice(0, 6)} />
			<Filters genreData={genres} />
			<Items data={results} />
			<PageCounter
				currentPage={currentPage}
				totalPages={total_pages > 500 ? 500 : total_pages}
			/>
		</main>
	)
}
