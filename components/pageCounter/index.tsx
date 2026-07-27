// components/pageCounter/index.tsx
'use client';

import usePagination from '@/lib/hooks/usePagination';
import PageItem from './pageItem';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { usePathname, useSearchParams } from 'next/navigation';
import updateSearchParams from '@/lib/utils/updateSearchParams';
import Link from 'next/link';

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

  const NavLink = ({
    direction,
    disabled,
    page,
  }: {
    direction: 'prev' | 'next';
    disabled: boolean;
    page: number;
  }) => {
    const className = `border-battleGrey flex border-[2px] rounded-full p-1 transition-all duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow ${direction === 'prev' ? 'mr-1' : 'ml-1'
      } ${disabled ? 'opacity-40 pointer-events-none cursor-not-allowed' : 'cursor-pointer hover:border-fuelYellow'}`;
    const Icon = direction === 'prev' ? ArrowLeft2 : ArrowRight2;

    if (disabled) {
      return (
        <span aria-disabled="true" aria-label={`${direction === 'prev' ? 'Previous' : 'Next'} page (disabled)`} className={className}>
          <Icon color="white" size={20} aria-hidden="true" />
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
        <Icon color="white" size={20} aria-hidden="true" />
      </Link>
    );
  };

  return (
    <nav aria-label="Pagination" className='flex paddings items-center justify-center flex-wrap'>
      <NavLink direction="prev" disabled={isFirst} page={currentPage - 1} />
      {paginationRange?.map((page, key) => (
        <PageItem
          key={key}
          active={currentPage === page}
          page={typeof page === 'number' ? page : '...'}
        />
      ))}
      <NavLink direction="next" disabled={isLast} page={currentPage + 1} />
    </nav>
  );
};

export default PageCounter;