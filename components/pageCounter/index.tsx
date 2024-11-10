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
  return (
    <div className='flex paddings items-center justify-center flex-wrap'>
      <Link
        href={updateSearchParams({
          params: [{ key: 'page', value: (currentPage - 1).toString() }],
          pathname,
          searchParams,
        })}
        aria-label='Prev Page'
        scroll={false}
        className={`${
          currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'
        }border-battleGrey flex border-[2px] rounded-full p-1 mr-1`}
      >
        <ArrowLeft2
          color='white'
          size={20}
        />
      </Link>
      {paginationRange?.map((page, key) => (
        <PageItem
          key={key}
          active={currentPage === page}
          page={typeof page === 'number' ? page : '...'}
        />
      ))}
      <Link
        href={updateSearchParams({
          params: [{ key: 'page', value: (currentPage + 1).toString() }],
          pathname,
          searchParams,
        })}
        aria-label='Next Page'
        scroll={false}
        className={`${
          currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'
        }border-battleGrey flex border-[2px] rounded-full p-1 ml-1`}
      >
        <ArrowRight2
          color='white'
          size={20}
        />
      </Link>
    </div>
  );
};

export default PageCounter;
