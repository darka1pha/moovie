import { Home2, Heart, Profile } from 'iconsax-react'
import MenuButton from './menuButton'

const MobileMenu = () => {
	return (
		<div className='fixed h-20 w-full px-4 bottom-10 flex items-center justify-center md:hidden'>
			<div className='bg-white/10 px-5 justify-between backdrop-blur-lg w-full h-full rounded-3xl flex'>
				<MenuButton route='/'>
					<Home2 size='32' />
				</MenuButton>
				<MenuButton route='/favorites'>
					<Heart size='32' />
				</MenuButton>
				<MenuButton route='/profile'>
					<Profile size='32' />
				</MenuButton>
			</div>
		</div>
	)
}

export default MobileMenu
