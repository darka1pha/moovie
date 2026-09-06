'use client';

import { ReviewList, Review } from '@/types';
import ReviewItem from './reviewItem';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageSquareQuote, Star, Sparkles, Filter } from 'lucide-react';

interface Props {
  data?: ReviewList;
}

type ReviewFilter = 'all' | 'highest' | 'rated';

const Reviews = ({ data }: Props) => {
  const results = useMemo(() => data?.results || [], [data]);
  const [renderCount, setRenderCount] = useState(3);
  const [activeFilter, setActiveFilter] = useState<ReviewFilter>('all');

  // Filter calculations
  const reviewsWithRating = useMemo(
    () =>
      results.filter(
        (r) =>
          typeof r.author_details?.rating === 'number' &&
          r.author_details.rating > 0
      ),
    [results]
  );

  const avgRating = useMemo(() => {
    if (reviewsWithRating.length === 0) return null;
    const sum = reviewsWithRating.reduce(
      (acc, r) => acc + (r.author_details?.rating || 0),
      0
    );
    return (sum / reviewsWithRating.length).toFixed(1);
  }, [reviewsWithRating]);

  // Filtered list based on tab
  const filteredReviews = useMemo(() => {
    if (activeFilter === 'highest') {
      return [...results].sort(
        (a, b) => (b.author_details?.rating || 0) - (a.author_details?.rating || 0)
      );
    }
    if (activeFilter === 'rated') {
      return reviewsWithRating;
    }
    return results;
  }, [results, activeFilter, reviewsWithRating]);

  if (results.length === 0) return null;

  const handleLoadMore = () => {
    setRenderCount((prev) => Math.min(prev + 3, filteredReviews.length));
  };

  const handleShowLess = () => {
    setRenderCount(3);
  };

  const isMoreToShow = renderCount < filteredReviews.length;
  const remainingCount = filteredReviews.length - renderCount;

  return (
    <section className="paddings py-8" aria-labelledby="reviews-heading">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-fuelYellow/10 text-fuelYellow text-xs font-semibold border border-fuelYellow/20 mb-2.5">
            <MessageSquareQuote size={13} aria-hidden="true" />
            <span>Community Feedback</span>
          </div>
          <div className="flex items-center gap-3">
            <h2 id="reviews-heading" className="font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Audience Reviews
            </h2>
            <span className="text-xs font-medium text-neutral-400 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
              {results.length} Total
            </span>
          </div>
        </div>

        {/* Community Score Card & Filter Tabs */}
        <div className="flex items-center gap-3 flex-wrap">
          {avgRating && (
            <div className="flex items-center gap-2 bg-gradient-to-r from-fuelYellow/15 to-transparent border border-fuelYellow/25 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-fuelYellow shadow-sm">
              <Star size={14} className="fill-fuelYellow text-fuelYellow" aria-hidden="true" />
              <span>Avg Score: <strong>{avgRating}</strong> / 10</span>
              <span className="text-[10px] text-neutral-400 font-normal">({reviewsWithRating.length} rated)</span>
            </div>
          )}

          {/* Quick Filter Tabs (if multiple reviews) */}
          {results.length > 2 && (
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => {
                  setActiveFilter('all');
                  setRenderCount(3);
                }}
                className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-fuelYellow text-black font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                All ({results.length})
              </button>
              {reviewsWithRating.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveFilter('highest');
                    setRenderCount(3);
                  }}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                    activeFilter === 'highest'
                      ? 'bg-fuelYellow text-black font-bold shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Highest Rated
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          <div key={activeFilter} className="space-y-4">
            {filteredReviews.slice(0, renderCount).map((review, index) => (
              <ReviewItem
                key={`${review.author}-${review.created_at}-${index}`}
                delay={(index % 3) * 0.1}
                author={review.author}
                author_details={review.author_details}
                content={review.content}
                created_at={review.created_at}
              />
            ))}
          </div>
        </AnimatePresence>

        {/* Load More / Show Less Controls */}
        {filteredReviews.length > 3 && (
          <div className="flex justify-center items-center pt-4">
            <button
              type="button"
              aria-label={isMoreToShow ? 'Load more reviews' : 'Show fewer reviews'}
              onClick={isMoreToShow ? handleLoadMore : handleShowLess}
              className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-balasticSea border border-white/10 text-white text-xs font-semibold hover:border-fuelYellow/50 hover:bg-white/5 hover:text-fuelYellow transition-all active:scale-95 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow shadow-lg"
            >
              <span>
                {isMoreToShow
                  ? `Show More Reviews (${remainingCount} remaining)`
                  : 'Show Fewer Reviews'}
              </span>
              <ChevronDown
                size={16}
                aria-hidden="true"
                className={`transition-transform duration-200 ${
                  isMoreToShow ? '' : 'rotate-180'
                }`}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
