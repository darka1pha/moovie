'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Clapperboard, Sparkles } from 'lucide-react';
import ItemsCard from '../items/itemsCard';
import { IPaginatedData, ListResults } from '@/types';

interface Props {
  data: IPaginatedData<ListResults>;
}

const SimilarItems: React.FC<Props> = ({ data }) => {
  const results = useMemo(() => data?.results || [], [data?.results]);
  const pathname = usePathname();
  const isTv = pathname.includes('/tv');
  const media = isTv ? 'tv' : 'movie';

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScrollButtons();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener('scroll', checkScrollButtons, { passive: true });
    window.addEventListener('resize', checkScrollButtons);
    return () => {
      el.removeEventListener('scroll', checkScrollButtons);
      window.removeEventListener('resize', checkScrollButtons);
    };
  }, [results]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === 'left' ? -600 : 600;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  if (results.length === 0) return null;

  const sectionTitle = isTv ? 'Similar TV Series' : 'Similar Movies';
  const exploreHref = isTv ? '/tv' : '/movies';

  return (
    <section className="paddings py-8 mb-8 text-white w-full" aria-labelledby="similar-heading">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-fuelYellow/10 text-fuelYellow text-xs font-semibold border border-fuelYellow/20 mb-2.5">
            <Sparkles size={13} aria-hidden="true" />
            <span>More Like This</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-fuelYellow hidden sm:flex items-center justify-center">
              <Clapperboard size={20} aria-hidden="true" />
            </div>
            <div>
              <h2 id="similar-heading" className="font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                {sectionTitle}
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Curated recommendations based on this {isTv ? 'series' : 'film'}
              </p>
            </div>
            <span className="text-xs font-medium text-neutral-400 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full ml-1">
              {results.length} Titles
            </span>
          </div>
        </div>

        {/* Explore All & Carousel Navigation */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <Link
            href={exploreHref}
            className="text-xs font-semibold text-neutral-400 hover:text-fuelYellow transition-colors flex items-center gap-1 group py-1.5 px-3 rounded-xl bg-white/5 border border-white/10 hover:border-fuelYellow/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow"
          >
            <span>Explore All {isTv ? 'TV' : 'Movies'}</span>
            <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </Link>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label={`Scroll ${sectionTitle} left`}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white transition-all hover:bg-fuelYellow hover:border-fuelYellow hover:text-black active:scale-95 disabled:opacity-30 disabled:pointer-events-none cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow shadow-sm"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label={`Scroll ${sectionTitle} right`}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white transition-all hover:bg-fuelYellow hover:border-fuelYellow hover:text-black active:scale-95 disabled:opacity-30 disabled:pointer-events-none cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow shadow-sm"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Row */}
      <div
        ref={scrollRef}
        className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-1 -mx-2 px-2"
        tabIndex={0}
        aria-label={`${sectionTitle} carousel`}
      >
        {results.map(({ id, original_title, vote_average, poster_path, name }) => (
          <div key={id} className="shrink-0">
            <ItemsCard
              margin="m-2"
              original_title={original_title || name || 'Untitled'}
              poster_path={poster_path}
              vote_average={vote_average}
              id={id}
              media={media}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SimilarItems;