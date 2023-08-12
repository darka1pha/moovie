import { ListResults } from '@/types'
import ItemsCard from './itemsCard'
interface Props {
	data: ListResults[]
}
const Items = ({ data }: Props) => {
	return (
		<div className='flex flex-wrap justify-center'>
			{data?.map(
				({ id, media_type, original_title, vote_average, poster_path, name }) =>
					media_type !== 'person' && (
						<ItemsCard
							original_title={original_title ?? name}
							poster_path={poster_path}
							media_type={media_type}
							vote_average={vote_average}
							id={id}
						/>
					)
			)}
		</div>
	)
}

export default Items
