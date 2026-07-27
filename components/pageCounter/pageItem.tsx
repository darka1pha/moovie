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
        className="bg-black border-battleGrey text-white text-center border-[2px] mx-2 my-1 p-2 text-xs min-w-[36px] rounded-xl"
      >
        {page}
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
      className={`bg-black text-center transition-all ease-in-out duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow ${active
        ? 'text-fuelYellow border-fuelYellow'
        : 'border-battleGrey text-white'
        } border-[2px] mx-2 my-1 p-2 text-xs min-w-[36px] rounded-xl`}
    >
      {page}
    </Link>
  );
};

export default PageItem;