'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Props {
	page: number | string
	active: boolean
}
const PageItem = ({ page, active }: Props) => {
	const router = useRouter()
	// const onPageClick = () => {
	// 	const currentParams = new URLSearchParams(window.location.search)
	// 	currentParams.delete('page')
	// 	currentParams.set('page', page.toString())

	// 	const newSearchParams = currentParams.toString()

	// 	const newPathname = `${window.location.pathname}?${newSearchParams}`

	// 	router.push(newPathname, { scroll: false })
	// }
	return (
		<Link href={`?page=${page}`} scroll={false}>
			<button
				// onClick={onPageClick}
				className={`bg-black ${
					active
						? 'text-fuelYellow border-fuelYellow'
						: 'border-battleGrey text-white'
				} border-[2px] mx-2 p-2 text-xs min-w-[36px] rounded-xl`}>
				{page}
			</button>
		</Link>
	)
}

export default PageItem
