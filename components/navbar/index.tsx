import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
	return (
		<div className='h-20 bg-black/30 w-full flex items-center px-10 justify-between'>
			<Link href={'/'}>
				<div className='w-48'>
					<Image
						className='w-full h-auto'
						src={'/icons/gold-icon.png'}
						height={64}
						width={192}
						alt='icon'
					/>
				</div>
			</Link>
		</div>
	)
}

export default Navbar
