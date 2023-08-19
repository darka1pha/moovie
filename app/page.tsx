import { Filters, Hero, Items, ItemsLoading, PageCounter } from '@/components'
import { getGenres, getTrendigs } from '@/lib/actions/home'
import { Genres, IPaginatedData, ListResults } from '@/types'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const revalidate = 86400 //1Day

export const metadata: Metadata = {
	description: 'Explore the latest movies and tv shows.',
}

export default async function Home({
	searchParams: { page, mediaType, genre },
}: {
	searchParams: { page: number; mediaType: string; genre: string }
}) {
	const { results: bannerData } = (await getTrendigs({
		page: 1,
		mediaType: 'all',
	})) as IPaginatedData<ListResults>

	const { genres } = (await getGenres({
		mediaType: mediaType ?? 'movie',
	})) as Genres

	const genreID =
		genre && genre.toLocaleLowerCase() !== 'all'
			? genres.filter((item) => item.name === genre)[0].id
			: ''

	return (
		<main>
			<Hero data={bannerData.slice(0, 6)} />
			<Filters genreData={genres} />
			{/* <Suspense fallback={<ItemsLoading />}> */}
				<Items genreID={genreID.toString()} mediaType={mediaType} page={page} />
			{/* </Suspense> */}
		</main>
	)
}
