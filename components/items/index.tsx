import { IPaginatedData, ListResults } from '@/types'
import ItemsCard from './itemsCard'
import { PageCounter } from '..'
import { getDiscovers } from '@/lib/actions/home'
interface Props {
	genreID: string
	mediaType: string
	page: number
}
const Items = async ({ genreID, mediaType, page }: Props) => {
	const {
		page: currentPage,
		results,
		total_pages,
	} = (await getDiscovers({
		genre: genreID,
		mediaType,
		page,
	})) as IPaginatedData<ListResults>
	return (
		<>
			<div className='flex flex-wrap justify-center'>
				{results?.map(
					({ id, original_title, vote_average, poster_path, name }) => (
						<ItemsCard
							original_title={original_title ?? name}
							poster_path={poster_path}
							vote_average={vote_average}
							id={id}
						/>
					)
				)}
			</div>
			<PageCounter
				currentPage={currentPage}
				totalPages={total_pages > 500 ? 500 : total_pages}
			/>
		</>
	)
}

export default Items
