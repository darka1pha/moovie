'use client'

import Image from 'next/image'
import Link from 'next/link'


const Navbar = () => {
	return (
		<div className='h-20 bg-black/30 w-full flex items-center px-10 justify-between'>
			<Link href={'/'}>
				<Image src={'/icons/icon.png'} height={64} width={200} alt='icon' />
			</Link>
		</div>
	)
}

export default Navbar
