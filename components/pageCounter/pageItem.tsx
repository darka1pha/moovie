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
  return page === '...' ? (
    <span
      aria-label='pages dot'
      className={`bg-black transition-all ease-in-out duration-500 border-battleGrey text-white text-center border-[2px] mx-2 my-1 p-2 text-xs min-w-[36px] rounded-xl`}
    >
      {page}
    </span>
  ) : (
    <Link
      href={updateSearchParams({
        params: [{ key: 'page', value: page.toString() }],
        pathname,
        searchParams,
      })}
      scroll={false}
      aria-label='Page Navigation'
      className={`bg-black text-center transition-all ease-in-out duration-500 ${
        active
          ? 'text-fuelYellow border-fuelYellow'
          : 'border-battleGrey text-white'
      } border-[2px] mx-2 my-1 p-2 text-xs min-w-[36px] rounded-xl`}
    >
      {page}
    </Link>
  );
};

export default PageItem;
