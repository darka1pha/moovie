'use client'

import usePagination from '@/hooks/usePagination'
import PageItem from './pageItem'
import { ArrowLeft2, ArrowRight2, Link } from 'iconsax-react'
import { useRouter } from 'next/navigation'

interface Props {
	totalPages: number
	currentPage: number
}

const PageCounter = ({ currentPage, totalPages }: Props) => {
	const router = useRouter()
	const paginationRange = usePagination({
		currentPage,
		totalPages,
		siblingCount: 1,
	})

	const addNewParams = ({ param }: { param: string | number }) => {
		const currentParams = new URLSearchParams(window.location.search)
		currentParams.delete('page')
		currentParams.set('page', param.toString())

		const newSearchParams = currentParams.toString()

		const newPathname = `${window.location.pathname}?${newSearchParams}`

		router.push(newPathname, { scroll: false })
	}

	const onNextPage = () => {
		if (currentPage + 1 <= totalPages) {
			addNewParams({ param: currentPage + 1 })
		}
	}
	const onPrevPage = () => {
		if (currentPage - 1 >= 1) {
			addNewParams({ param: currentPage - 1 })
		}
	}
	return (
		<div className='flex paddings items-center justify-center'>
			<button
				onClick={onPrevPage}
				className={`${
					currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'
				}border-battleGrey flex border-[2px] rounded-full p-1 mr-1`}>
				<ArrowLeft2 className='text-white' size={20} />
			</button>
			{paginationRange?.map((page) => (
				<PageItem
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
