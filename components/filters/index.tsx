'use client'
import FilterOption from './filterOption'
import { genre } from '@/types'

interface Props {
	data: genre[]
}

const Filters = ({ data }: Props) => {
	return (
		<div className='paddings flex overflow-y-auto'>
			{data.map(({ name, id }) => (
				<FilterOption name={name} id={id} />
			))}
		</div>
	)
}

export default Filters
