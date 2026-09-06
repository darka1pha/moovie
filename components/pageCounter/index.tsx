// components/pageCounter/index.tsx
'use client';

import usePagination from '@/lib/hooks/usePagination';
import PageItem from './pageItem';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { usePathname, useSearchParams } from 'next/navigation';
import updateSearchParams from '@/lib/utils/updateSearchParams';
import Link from 'next/link';

interface NavLinkProps {
  direction: 'prev' | 'next';
  disabled: boolean;
  page: number;
  pathname: string;
  searchParams: ReturnType<typeof useSearchParams>;
}

const NavLink = ({
  direction,
  disabled,
  page,
  pathname,
  searchParams,
}: NavLinkProps) => {
  const className = `h-10 w-10 flex items-center justify-center rounded-xl border border-white/10 transition-all duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow ${
    disabled
      ? 'opacity-25 pointer-events-none cursor-not-allowed bg-white/5 text-neutral-500'
      : 'cursor-pointer bg-white/5 hover:bg-fuelYellow hover:text-black hover:border-fuelYellow text-white hover:scale-105 active:scale-95 shadow-md'
  }`;
  const Icon = direction === 'prev' ? ArrowLeft2 : ArrowRight2;

  if (disabled) {
    return (
      <span aria-disabled="true" aria-label={`${direction === 'prev' ? 'Previous' : 'Next'} page (disabled)`} className={className}>
        <Icon size={18} aria-hidden="true" />
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
      aria-label={direction === 'prev' ? 'Go to previous page' : 'Go to next page'}
      scroll={false}
      className={className}
    >
      <Icon size={18} aria-hidden="true" />
    </Link>
  );
};

interface Props {
  totalPages: number;
  currentPage: number;
}

const PageCounter = ({ currentPage, totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paginationRange = usePagination({
    currentPage,
    totalPages,
    siblingCount: 1,
  });

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <div className="flex flex-col items-center justify-center gap-3 my-12 paddings">
      <nav
        aria-label="Pagination"
        className="flex items-center gap-1.5 p-2 rounded-2xl bg-[#16151a]/90 backdrop-blur-xl border border-white/10 shadow-2xl flex-wrap justify-center"
      >
        <NavLink direction="prev" disabled={isFirst} page={currentPage - 1} pathname={pathname} searchParams={searchParams} />
        {paginationRange?.map((page, key) => (
          <PageItem
            key={key}
            active={currentPage === page}
            page={typeof page === 'number' ? page : '...'}
          />
        ))}
        <NavLink direction="next" disabled={isLast} page={currentPage + 1} pathname={pathname} searchParams={searchParams} />
      </nav>
      <p className="text-xs text-neutral-500 font-medium tracking-wide">
        Page <span className="text-neutral-300 font-semibold">{currentPage}</span> of{' '}
        <span className="text-neutral-300 font-semibold">{totalPages}</span>
      </p>
    </div>
  );
};

export default PageCounter;