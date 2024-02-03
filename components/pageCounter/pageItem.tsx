'use client'
import getUpdatedPath from '@/lib/getUpdatedPath'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Props {
	page: number | string
	active: boolean
}

const PageItem = ({ page, active }: Props) => {
	const router = useRouter()
	const onPageClick = () => {
		router.prefetch(getUpdatedPath({ param: 'page', value: page.toString() }))
		router.push(getUpdatedPath({ param: 'page', value: page.toString() }))
	}
	return page === '...' ? (
		<button
			aria-label='Page Navigation'
			className={`bg-black transition-all ease-in-out duration-500 ${
				active
					? 'text-fuelYellow border-fuelYellow'
					: 'border-battleGrey text-white'
			} border-[2px] mx-2 my-1 p-2 text-xs min-w-[36px] rounded-xl`}>
			{page}
		</button>
	) : (
		<button
			onClick={onPageClick}
			aria-label='Page Navigation'
			className={`bg-black transition-all ease-in-out duration-500 ${
				active
					? 'text-fuelYellow border-fuelYellow'
					: 'border-battleGrey text-white'
			} border-[2px] mx-2 my-1 p-2 text-xs min-w-[36px] rounded-xl`}>
			{page}
		</button>
	)
}

export default PageItem
