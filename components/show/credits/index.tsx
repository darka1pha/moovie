'use client';

import { CreditsProps } from '@/types';
import CastItem from './CastItem';
import { useRef, useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';

interface CreditComponentProps {
  data?: CreditsProps;
}

const Credits = ({ data }: CreditComponentProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const cast = useMemo(() => data?.cast || [], [data?.cast]);

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
  }, [cast]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === 'left' ? -500 : 500;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  if (!cast || cast.length === 0) return null;

  const displayCast = cast.slice(0, 20);

  return (
    <section className="paddings py-8" aria-labelledby="top-cast-heading">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-5 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-fuelYellow/10 text-fuelYellow text-xs font-semibold border border-fuelYellow/20 mb-2.5">
            <Users size={13} aria-hidden="true" />
            <span>Cast & Characters</span>
          </div>
          <div className="flex items-center gap-3">
            <h2 id="top-cast-heading" className="font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Top Cast
            </h2>
            <span className="text-xs font-medium text-neutral-400 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
              {cast.length} Actors
            </span>
          </div>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll cast left"
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white transition-all hover:bg-fuelYellow hover:border-fuelYellow hover:text-black active:scale-95 disabled:opacity-30 disabled:pointer-events-none cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow shadow-sm"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll cast right"
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white transition-all hover:bg-fuelYellow hover:border-fuelYellow hover:text-black active:scale-95 disabled:opacity-30 disabled:pointer-events-none cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow shadow-sm"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Horizontal Cast Scroller */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-4 overflow-x-auto no-scrollbar scroll-smooth py-2 -my-2"
        tabIndex={0}
        aria-label="Top cast carousel"
      >
        {displayCast.map((person, index) => (
          <CastItem
            key={`${person.name}-${person.character}-${index}`}
            character={person.character}
            name={person.name}
            profile_path={person.profile_path}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default Credits;
