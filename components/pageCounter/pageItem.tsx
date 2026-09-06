// components/pageCounter/pageItem.tsx
'use client';
import updateSearchParams from '@/lib/utils/updateSearchParams';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface Props {
  page: number | string;
  active: boolean;
}

const PageItem = ({ page, active }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (page === '...') {
    return (
      <span
        aria-hidden="true"
        className="text-neutral-500 font-bold px-2.5 py-1 select-none flex items-center justify-center text-xs tracking-widest"
      >
        •••
      </span>
    );
  }

  return (
    <Link
      href={updateSearchParams({
        params: [{ key: 'page', value: page.toString() }],
        pathname,
        searchParams,
      })}
      scroll={false}
      aria-label={`Go to page ${page}`}
      aria-current={active ? 'page' : undefined}
      className={`h-10 min-w-[40px] px-3.5 flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow ${
        active
          ? 'bg-fuelYellow text-black font-bold shadow-lg shadow-fuelYellow/25 scale-105 border border-fuelYellow'
          : 'bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white border border-white/5 hover:border-white/20 active:scale-95'
      }`}
    >
      {page}
    </Link>
  );
};

export default PageItem;