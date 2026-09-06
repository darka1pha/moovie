'use client';

import { Genre } from '@/types';
import FilterSelect from '../filters/filterSelect';
import { useState, useTransition } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import updateSearchParams from '@/lib/utils/updateSearchParams';
import { Spinner } from '@/components/ui/spinner';
import { RotateCcw } from 'lucide-react';

interface Props {
  genreData: Genre[];
  mediaType: 'movie' | 'tv';
}

const YEAR_OPTIONS = [
  'All Years',
  '2026',
  '2025',
  '2024',
  '2023',
  '2022',
  '2021',
  '2020',
  '2019',
  '2018',
  '2015',
  '2010',
];

const SORT_OPTIONS: { label: string; value: string }[] = [
  { label: 'Most Popular', value: 'popularity.desc' },
  { label: 'Highest Rated', value: 'vote_average.desc' },
  { label: 'Newest First', value: 'primary_release_date.desc' },
  { label: 'Most Voted', value: 'vote_count.desc' },
];

const RATING_OPTIONS: { label: string; value: string }[] = [
  { label: 'All Ratings', value: '' },
  { label: '8.0+ Exceptional', value: '8' },
  { label: '7.0+ Recommended', value: '7' },
  { label: '6.0+ Good', value: '6' },
];

const EnhancedFilters = ({ genreData, mediaType }: Props) => {
  const genres = ['All Genres', ...genreData.map(({ name }) => name)];
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Read current URL params
  const urlGenre = searchParams.get('genre') ?? 'All Genres';
  const urlYear = searchParams.get('year') ?? 'All Years';
  const urlSort = searchParams.get('sort_by') ?? 'popularity.desc';
  const urlRating = searchParams.get('min_rating') ?? '';

  // Resolve labels
  const currentSortLabel =
    SORT_OPTIONS.find((s) => s.value === urlSort)?.label ?? 'Most Popular';
  const currentRatingLabel =
    RATING_OPTIONS.find((r) => r.value === urlRating)?.label ?? 'All Ratings';

  // Optimistic states for instant 0ms UI update
  const [optimisticGenre, setOptimisticGenre] = useState<string | null>(null);
  const [optimisticYear, setOptimisticYear] = useState<string | null>(null);
  const [optimisticSort, setOptimisticSort] = useState<string | null>(null);
  const [optimisticRating, setOptimisticRating] = useState<string | null>(null);

  const selectedGenre = optimisticGenre ?? urlGenre;
  const selectedYear = optimisticYear ?? urlYear;
  const selectedSort = optimisticSort ?? currentSortLabel;
  const selectedRating = optimisticRating ?? currentRatingLabel;

  // Sync / reset optimistic state once URL catches up
  if (optimisticGenre && optimisticGenre.toLowerCase() === urlGenre.toLowerCase()) {
    setOptimisticGenre(null);
  }
  if (optimisticYear && optimisticYear === urlYear) {
    setOptimisticYear(null);
  }
  if (optimisticSort && optimisticSort === currentSortLabel) {
    setOptimisticSort(null);
  }
  if (optimisticRating && optimisticRating === currentRatingLabel) {
    setOptimisticRating(null);
  }

  const hasActiveFilters =
    (urlGenre && urlGenre !== 'All Genres') ||
    (urlYear && urlYear !== 'All Years') ||
    (urlSort && urlSort !== 'popularity.desc') ||
    Boolean(urlRating);

  const handleFilterChange = (value: string, filterType: 'genre' | 'year' | 'sort' | 'rating') => {
    let paramKey = '';
    let paramValue = '';

    if (filterType === 'genre') {
      setOptimisticGenre(value);
      paramKey = 'genre';
      paramValue = value.toLowerCase() === 'all genres' ? '' : value;
    } else if (filterType === 'year') {
      setOptimisticYear(value);
      paramKey = 'year';
      paramValue = value === 'All Years' ? '' : value;
    } else if (filterType === 'sort') {
      setOptimisticSort(value);
      const matched = SORT_OPTIONS.find((s) => s.label === value);
      paramKey = 'sort_by';
      paramValue = matched ? matched.value : 'popularity.desc';
    } else if (filterType === 'rating') {
      setOptimisticRating(value);
      const matched = RATING_OPTIONS.find((r) => r.label === value);
      paramKey = 'min_rating';
      paramValue = matched ? matched.value : '';
    }

    startTransition(() => {
      router.push(
        updateSearchParams({
          pathname,
          searchParams,
          params: [
            { key: paramKey, value: paramValue },
            { key: 'page', value: '' }, // reset to page 1
          ],
        }),
        { scroll: false }
      );
    });
  };

  const handleReset = () => {
    setOptimisticGenre('All Genres');
    setOptimisticYear('All Years');
    setOptimisticSort('Most Popular');
    setOptimisticRating('All Ratings');

    startTransition(() => {
      router.push(
        updateSearchParams({
          pathname,
          searchParams,
          params: [
            { key: 'genre', value: '' },
            { key: 'year', value: '' },
            { key: 'sort_by', value: '' },
            { key: 'min_rating', value: '' },
            { key: 'page', value: '' },
          ],
        }),
        { scroll: false }
      );
    });
  };

  return (
    <div className="paddings py-6 flex flex-col gap-4 border-b border-white/5 bg-[#121116]/40 backdrop-blur-md relative z-30">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-start gap-4 flex-wrap overflow-visible relative z-30">
          {/* Genre Filter */}
          <FilterSelect
            title="Genre"
            name="genre"
            data={genres}
            onChange={(val) => handleFilterChange(val, 'genre')}
            value={selectedGenre}
          />

          {/* Release Year Filter */}
          <FilterSelect
            title="Year"
            name="year"
            data={YEAR_OPTIONS}
            onChange={(val) => handleFilterChange(val, 'year')}
            value={selectedYear}
          />

          {/* Sort By Filter */}
          <FilterSelect
            title="Sort By"
            name="sort"
            data={SORT_OPTIONS.map((s) => s.label)}
            onChange={(val) => handleFilterChange(val, 'sort')}
            value={selectedSort}
          />

          {/* Minimum Rating Filter */}
          <FilterSelect
            title="Rating"
            name="rating"
            data={RATING_OPTIONS.map((r) => r.label)}
            onChange={(val) => handleFilterChange(val, 'rating')}
            value={selectedRating}
          />
        </div>

        {/* Reset button & Loading spinner */}
        <div className="flex items-center gap-3 self-end sm:self-center mb-1">
          {isPending && (
            <div className="flex items-center gap-2 text-fuelYellow text-xs font-semibold animate-pulse" role="status">
              <Spinner size="sm" aria-hidden="true" />
              <span>Filtering…</span>
            </div>
          )}

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-white/5 hover:bg-fuelYellow hover:text-black text-neutral-300 transition-all active:scale-95 border border-white/10 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow"
            >
              <RotateCcw size={13} aria-hidden="true" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedFilters;
