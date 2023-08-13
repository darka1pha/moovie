import { Filters, Hero, Items, PageCounter } from '@/components'
import { getDiscovers, getMovieGenres, getTrendigs } from '@/lib/actions/home'
import { Genres, IPaginatedData, ListResults } from '@/types'

export default async function Home({
	searchParams: { page, mediaType, genre },
}: {
	searchParams: { page: number; mediaType: string; genre: string }
}) {
	const { results: bannerData } = (await getTrendigs({
		page: 1,
		mediaType: 'all',
	})) as IPaginatedData<ListResults>

	const { genres } = (await getMovieGenres()) as Genres

	const genreID = genre
		? genres.filter((item) => item.name === genre)[0].id
		: ''

	const {
		page: currentPage,
		results,
		total_pages,
	} = (await getDiscovers({
		genre: genreID.toString(),
		mediaType,
		page,
	})) as IPaginatedData<ListResults>

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
