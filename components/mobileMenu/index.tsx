// components/mobileMenu/index.tsx
import { Home, Film, Tv, Heart, User } from 'lucide-react';
import MenuButton from './menuButton';

const MobileMenu = () => {
	return (
		<nav
			aria-label="Mobile navigation"
			className='fixed bottom-6 inset-x-0 px-3 flex items-center justify-center md:hidden z-30 pointer-events-none'
		>
			<div className='bg-[#16151a]/95 border border-white/10 px-3 py-1.5 justify-around backdrop-blur-2xl w-full max-w-sm rounded-3xl flex shadow-2xl pointer-events-auto shadow-black/80'>
				<MenuButton route='/' label="Home">
					<Home size={20} aria-hidden="true" />
				</MenuButton>
				<MenuButton route='/movies' label="Movies">
					<Film size={20} aria-hidden="true" />
				</MenuButton>
				<MenuButton route='/tv' label="TV Series">
					<Tv size={20} aria-hidden="true" />
				</MenuButton>
				<MenuButton route='/favorites' label="Favorites">
					<Heart size={20} aria-hidden="true" />
				</MenuButton>
				<MenuButton route='/profile' label="Profile">
					<User size={20} aria-hidden="true" />
				</MenuButton>
			</div>
		</nav>
	);
};

export default MobileMenu;