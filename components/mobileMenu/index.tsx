// components/mobileMenu/index.tsx
import { Home2, Heart, Profile } from 'iconsax-react'
import MenuButton from './menuButton'

const MobileMenu = () => {
	return (
		<nav
			aria-label="Mobile navigation"
			className='fixed h-20 w-full px-4 bottom-10 flex items-center justify-center md:hidden z-30'
		>
			<div className='bg-white/10 px-5 justify-between backdrop-blur-lg w-full h-full rounded-3xl flex'>
				<MenuButton route='/' label="Home">
					<Home2 size='32' aria-hidden="true" />
				</MenuButton>
				<MenuButton route='/favorites' label="Favorites">
					<Heart size='32' aria-hidden="true" />
				</MenuButton>
				<MenuButton route='/profile' label="Profile">
					<Profile size='32' aria-hidden="true" />
				</MenuButton>
			</div>
		</nav>
	)
}

export default MobileMenu