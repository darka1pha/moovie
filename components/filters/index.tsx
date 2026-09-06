'use client';

import { Genre } from '@/types';
import FilterSelect from './filterSelect';
import { useState, useTransition } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import updateSearchParams from '@/lib/utils/updateSearchParams';
import { Spinner } from '@/components/ui/spinner';

interface Props {
  genreData: Genre[];
}

const mediaType = ['movie', 'tv'];

const Filters = ({ genreData }: Props) => {
  const genres = genreData.map(({ name }) => name);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const urlGenre = searchParams.get('genre') ?? 'All';
  const urlMedia = searchParams.get('media_type') ?? 'movie';

  // Optimistic state for immediate 0ms UI response
  const [optimisticGenre, setOptimisticGenre] = useState<string | null>(null);
  const [optimisticMedia, setOptimisticMedia] = useState<string | null>(null);

  const selectedGenre = optimisticGenre ?? urlGenre;
  const selectedMedia = optimisticMedia ?? urlMedia;

  // Reset optimistic overrides once searchParams matches
  if (optimisticGenre !== null && optimisticGenre.toLowerCase() === urlGenre.toLowerCase()) {
    setOptimisticGenre(null);
  }
  if (optimisticMedia !== null && optimisticMedia.toLowerCase() === urlMedia.toLowerCase()) {
    setOptimisticMedia(null);
  }

  const onFilterChange = (value: string, type: string) => {
    if (type === 'media_type') {
      setOptimisticMedia(value);
      setOptimisticGenre('All');
      startTransition(() => {
        router.push(
          updateSearchParams({
            pathname,
            searchParams,
            params: [
              { key: 'media_type', value },
              { key: 'genre', value: '' },
              { key: 'page', value: '' },
            ],
          }),
          { scroll: false }
        );
      });
    } else {
      const normalizedGenre = value.toLowerCase() === 'all' ? 'All' : value;
      setOptimisticGenre(normalizedGenre);
      startTransition(() => {
        router.push(
          updateSearchParams({
            pathname,
            searchParams,
            params: [
              { key: 'genre', value: value.toLowerCase() === 'all' ? '' : value },
              { key: 'page', value: '' },
            ],
          }),
          { scroll: false }
        );
      });
    }
  };

  return (
    <div className='paddings flex items-start gap-4 flex-wrap overflow-visible relative z-30'>
      <FilterSelect
        title='Media Type'
        name='media_type'
        data={mediaType}
        onChange={onFilterChange}
        value={selectedMedia}
      />
      <FilterSelect
        title='Genre'
        name='genre'
        data={['All', ...genres]}
        onChange={onFilterChange}
        value={selectedGenre}
      />
      {isPending && (
        <div className="flex items-center gap-2 text-fuelYellow text-xs self-center mt-6 animate-pulse" role="status">
          <Spinner size="sm" aria-hidden="true" />
          <span>Updating…</span>
        </div>
      )}
    </div>
  );
};

export default Filters;
