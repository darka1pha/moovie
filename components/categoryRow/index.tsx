'use client';

import { ListResults } from '@/types';
import ItemsCard from '../items/itemsCard';
import Link from 'next/link';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { useRef } from 'react';

interface Props {
  title: string;
  items: ListResults[];
  mediaType: 'movie' | 'tv';
  viewAllHref?: string;
  icon?: React.ReactNode;
  badge?: string;
}

const CategoryRow = ({
  title,
  items,
  mediaType,
  viewAllHref,
  icon,
  badge,
}: Props) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (!items || items.length === 0) return null;

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="paddings py-6 w-full">
      {/* Category Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="p-2 rounded-xl bg-fuelYellow/10 text-fuelYellow border border-fuelYellow/20">
              {icon}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {title}
              </h2>
              {badge && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-fuelYellow border border-fuelYellow/20">
                  {badge}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* View All Link & Arrows */}
        <div className="flex items-center gap-3">
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="text-xs sm:text-sm font-semibold text-neutral-400 hover:text-fuelYellow transition-colors flex items-center gap-1 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow rounded-md px-2 py-1"
            >
              <span>Explore All</span>
              <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
            </Link>
          )}

          {/* Desktop Arrow Controls */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              aria-label={`Scroll ${title} left`}
              className="h-9 w-9 rounded-xl bg-white/5 hover:bg-fuelYellow hover:text-black border border-white/10 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow"
            >
              <ArrowLeft2 size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              aria-label={`Scroll ${title} right`}
              className="h-9 w-9 rounded-xl bg-white/5 hover:bg-fuelYellow hover:text-black border border-white/10 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow"
            >
              <ArrowRight2 size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Row */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-1"
      >
        {items.map((item) => (
          <div key={item.id} className="shrink-0">
            <ItemsCard
              id={item.id}
              original_title={item.title ?? (item as any).name ?? 'Untitled'}
              poster_path={item.poster_path}
              vote_average={item.vote_average}
              media={item.media_type ?? mediaType}
              margin="m-2"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryRow;
