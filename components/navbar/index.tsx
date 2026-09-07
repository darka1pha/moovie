// components/navbar/index.tsx
import Image from 'next/image';
import Link from 'next/link';
import UserProfile from './userProfile';
import NavLinks from './navLinks';
import SearchTrigger from './searchTrigger';
import RouletteTrigger from '@/components/roulette/rouletteTrigger';

const Navbar = () => {
  return (
    <nav
      aria-label="Main navigation"
      className='h-20 bg-[#0d0c11]/85 border-b border-white/5 w-full flex items-center px-6 sm:px-10 justify-between sticky top-0 z-30 backdrop-blur-xl shadow-xl'
    >
      <div className="flex items-center gap-8">
        <Link href={'/'} aria-label="Moovie home" className="flex items-center transition-transform hover:scale-105 active:scale-95 duration-200">
          <Image
            src={'/icons/gold-icon.png'}
            alt='Moovie'
            width={140}
            height={38}
            priority
            className="w-auto h-9 object-contain"
          />
        </Link>
        <NavLinks />
      </div>
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        <RouletteTrigger />
        <SearchTrigger />
        <UserProfile />
      </div>
    </nav>
  );
};

export default Navbar;