'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLinks = () => {
  const pathname = usePathname();

  const links = [
    { name: 'Discover', href: '/', active: pathname === '/' },
    { name: 'Movies', href: '/movies', active: pathname.startsWith('/movies') },
    { name: 'TV Shows', href: '/tv', active: pathname === '/tv' },
    { name: 'Favorites', href: '/favorites', active: pathname === '/favorites' },
  ];

  return (
    <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md shadow-inner">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow ${
            link.active
              ? 'bg-fuelYellow text-black font-bold shadow-md shadow-fuelYellow/20 scale-105'
              : 'text-neutral-300 hover:text-white hover:bg-white/10'
          }`}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
