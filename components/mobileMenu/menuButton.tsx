'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
	children: React.ReactNode
	route: string
}

const MenuButton = ({ route, children }: Props) => {
	const pathname = usePathname()
	const active = pathname === route
	return (
		<Link href={route}>
			<button
				className={`${
					active ? `text-fuelYellow` : `text-battleGrey`
				} h-[90%] transition-all ease-in-out duration-500`}>
				{children}
			</button>
		</Link>
	)
}

export default MenuButton
