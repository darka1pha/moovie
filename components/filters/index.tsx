'use client'
import { genre } from '@/types'
import FilterSelect from './filterSelect'
import { useState } from 'react'
import { useUpdateSearchParam } from '@/lib/hooks/useUpdateSearchParam'
import { useSearchParams } from 'next/navigation'

interface Props {
	genreData: genre[]
}

const mediaType = ['Movie', 'Tv']

const Filters = ({ genreData }: Props) => {
	const genres = genreData.map(({ name }) => name)
	const searchParams = useSearchParams()
	const { setSearchParams, deleteSearchParam } = useUpdateSearchParam()
	const [selectedGenre, setSelectedGenre] = useState(
		searchParams.get('genre') ?? 'All'
	)
	const [selectedMedia, setSelectedMedia] = useState(
		searchParams.get('mediaType') ?? 'Movie'
	)

	const onFilterChange = (value: string, type: 'mediaType' | 'genre') => {
		if (type === 'mediaType') {
			setSelectedMedia(value)
			deleteSearchParam({ param: 'genre' })
			// setSearchParams([{ key: 'mediaType', value: value }])
			setSelectedGenre('All')
		} else {
			setSelectedGenre(value)
			// setSearchParams([{ key: 'genre', value: value }])
		}
		setSearchParams([
			{ key: type, value },
			{ key: 'page', value: '1' },
		])
	}

	return (
		<div className='paddings flex overflow-y-auto'>
			<FilterSelect
				name='mediaType'
				data={mediaType}
				onChange={onFilterChange}
				value={selectedMedia}
			/>
			<FilterSelect
				className='ml-4'
				name='genre'
				data={['All', ...genres]}
				onChange={onFilterChange}
				value={selectedGenre}
			/>
		</div>
	)
}

export default Filters
