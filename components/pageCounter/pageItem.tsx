import Link from 'next/link'

interface Props {
	page: number | string
	active: boolean
}

const getUpdatedPath = ({ param, value }: { param: string; value: string }) => {
	const currentParams = new URLSearchParams(window.location.search)
	currentParams.delete(param)
	currentParams.append(param, value)

	const newSearchParams = currentParams.toString()
	const newPathname = `/?${newSearchParams}`

	return newPathname
}

const PageItem = ({ page, active }: Props) => {
	const newPath = getUpdatedPath({ param: 'page', value: page.toString() })
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
