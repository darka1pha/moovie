'use client'

import usePagination from '@/lib/hooks/usePagination'
import PageItem from './pageItem'
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react'
import { useUpdateSearchParam } from '@/lib/hooks/useUpdateSearchParam'

interface Props {
	totalPages: number
	currentPage: number
}

const PageCounter = ({ currentPage, totalPages }: Props) => {
	const { setSearchParams } = useUpdateSearchParam()
	const paginationRange = usePagination({
		currentPage,
		totalPages,
		siblingCount: 1,
	})

	const onNextPage = () => {
		if (currentPage + 1 <= totalPages) {
			setSearchParams([{ key: 'page', value: (currentPage + 1).toString() }])
		}
	}
	const onPrevPage = () => {
		if (currentPage - 1 >= 1) {
			setSearchParams([{ key: 'page', value: (currentPage - 1).toString() }])
		}
	}
	return (
		<div className='flex paddings items-center justify-center flex-wrap'>
			<button
				onClick={onPrevPage}
				className={`${
					currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'
				}border-battleGrey flex border-[2px] rounded-full p-1 mr-1`}>
				<ArrowLeft2 className='text-white' size={20} />
			</button>
			{paginationRange?.map((page, key) => (
				<PageItem
					key={key}
					active={currentPage === page}
					page={typeof page === 'number' ? page : '...'}
				/>
			))}
			<button
				onClick={onNextPage}
				className={`${
					currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'
				}border-battleGrey flex border-[2px] rounded-full p-1 ml-1`}>
				<ArrowRight2 className='text-white' size={20} />
			</button>
		</div>
	)
}

export default PageCounter
