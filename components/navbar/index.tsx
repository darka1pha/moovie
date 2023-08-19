import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
	return (
		<div className='h-20 bg-black/30 w-full flex items-center px-10 justify-between'>
			<p className='text-3xl text-fuelYellow font-bold'>پری خفه</p>
			<Link href={'/'}>
				<Image
					src={'/icons/gold-icon.png'}
					height={64}
					width={200}
					alt='icon'
				/>
			</Link>
		</div>
	)
}

export default Navbar
