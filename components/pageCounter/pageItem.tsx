'use client'
import { useUpdateSearchParam } from '@/lib/hooks/useUpdateSearchParam'
import Link from 'next/link'

interface Props {
	page: number | string
	active: boolean
}

const PageItem = ({ page, active }: Props) => {
	const { getUpdatedPath } = useUpdateSearchParam()
	const newPath = getUpdatedPath({ param: 'page', value: page.toString() })
	return (
		<Link href={newPath} scroll={false}>
			<button
				aria-label='Page Navigation'
				className={`bg-black transition-all ease-in-out duration-500 ${
					active
						? 'text-fuelYellow border-fuelYellow'
						: 'border-battleGrey text-white'
				} border-[2px] mx-2 my-1 p-2 text-xs min-w-[36px] rounded-xl`}>
				{page}
			</button>
		</Link>
	)
}

export default PageItem
