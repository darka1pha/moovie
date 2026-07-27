// components/mobileMenu/menuButton.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
	children: React.ReactNode
	route: string
	label: string
}

const MenuButton = ({ route, children, label }: Props) => {
	const pathname = usePathname()
	const active = pathname === route
	return (
		<Link href={route} aria-label={label} aria-current={active ? 'page' : undefined}>
			<button
				className={`${active ? `text-fuelYellow scale-110` : `text-battleGrey`
					} h-[90%] transition-all ease-in-out duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow rounded-full`}>
				{children}
			</button>
		</Link>
	)
}

export default MenuButton