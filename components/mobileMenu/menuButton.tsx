// components/mobileMenu/menuButton.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
	children: React.ReactNode;
	route: string;
	label: string;
}

const MenuButton = ({ route, children, label }: Props) => {
	const pathname = usePathname();
	const active = route === '/' ? pathname === '/' : pathname.startsWith(route);

	return (
		<Link
			href={route}
			aria-label={label}
			aria-current={active ? "page" : undefined}
			className={`flex flex-col items-center justify-center py-1 px-2.5 transition-all ease-out duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow rounded-2xl relative ${
				active ? "text-fuelYellow scale-105" : "text-neutral-400 hover:text-white"
			}`}
		>
			<div className={`p-1.5 rounded-xl transition-all duration-300 ${active ? "bg-fuelYellow/15 shadow-md shadow-fuelYellow/10" : "hover:bg-white/5"}`}>
				{children}
			</div>
			<span className="text-[10px] font-medium tracking-tight mt-0.5">{label}</span>
			{active && (
				<span className="absolute -bottom-1 h-1 w-3 bg-fuelYellow rounded-full shadow-[0_0_8px_rgba(239,174,40,0.8)]" />
			)}
		</Link>
	);
};

export default MenuButton;