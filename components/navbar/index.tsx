// components/navbar/index.tsx
import Image from 'next/image';
import Link from 'next/link';
import UserProfile from './userProfile';

const Navbar = () => {
  return (
    <nav
      aria-label="Main navigation"
      className='h-20 bg-black/30 w-full flex items-center px-10 justify-between sticky top-0 z-30 backdrop-blur-md'
    >
      <Link href={'/'} aria-label="Moovie home">
        <div className='w-48'>
          <Image
            src={'/icons/gold-icon.png'}
            alt='Moovie'
            priority
          />
        </div>
      </Link>
      <UserProfile />
    </nav>
  );
};

export default Navbar;