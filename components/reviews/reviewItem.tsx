'use client';

import { Review } from '@/types';
import { motion } from 'motion/react';
import { ChevronDown, Star, Quote, User } from 'lucide-react';
import { useId, useState } from 'react';
import DOMPurifyContent from '../dompurifyContent';
import Image from 'next/image';
import { getReviewerAvatarUrl } from '@/lib/tmdb/image';

const ReviewItem = ({
  author,
  author_details,
  content,
  created_at,
  delay = 0,
}: Review) => {
  const { name, rating, username, avatar_path } = author_details || {};
  const [isOpen, setIsOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const contentId = useId();

  const displayName = name || author || 'Community Reviewer';
  const displayUsername = username || author?.toLowerCase().replace(/\s+/g, '');
  const avatarUrl = getReviewerAvatarUrl(avatar_path);

  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'U';

  const formattedDate = created_at
    ? new Date(created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  // Check if review is long enough to warrant a toggle button
  const isLongReview = content && content.length > 280;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3, delay }}
      className="relative flex flex-col p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#181720]/90 to-[#111016]/90 border border-white/10 hover:border-white/15 backdrop-blur-xl shadow-xl transition-all group overflow-hidden mb-4"
    >
      {/* Subtle Background Watermark Quote */}
      <Quote
        size={80}
        aria-hidden="true"
        className="absolute -top-3 -right-3 text-white/[0.03] group-hover:text-fuelYellow/[0.05] transition-colors pointer-events-none rotate-12"
      />

      {/* Header: Reviewer Info & Rating */}
      <div className="flex items-start justify-between gap-4 mb-4 relative z-10">
        <div className="flex items-center gap-3">
          {/* Avatar with fallback */}
          <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 bg-balasticSea border border-white/10 shadow-sm flex items-center justify-center">
            {avatarUrl && !avatarError ? (
              <Image
                src={avatarUrl}
                alt={displayName}
                fill
                sizes="44px"
                className="object-cover"
                onError={() => setAvatarError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-fuelYellow/30 to-white/10 flex items-center justify-center text-fuelYellow font-bold text-xs tracking-wider">
                {initials}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-white font-bold text-sm sm:text-base tracking-tight">
                {displayName}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-400 mt-0.5">
              {displayUsername && <span>@{displayUsername}</span>}
              {displayUsername && formattedDate && <span className="text-neutral-600">•</span>}
              {formattedDate && <span>{formattedDate}</span>}
            </div>
          </div>
        </div>

        {/* Rating Badge */}
        {typeof rating === 'number' && rating > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-fuelYellow/10 border border-fuelYellow/25 text-fuelYellow shadow-sm flex-shrink-0">
            <Star size={13} fill="currentColor" className="text-fuelYellow" aria-hidden="true" />
            <span className="text-xs font-bold tracking-tight">
              <span className="sr-only">Rating: </span>
              {rating.toFixed(1)}
              <span className="text-[10px] text-neutral-400 font-normal ml-0.5">/ 10</span>
            </span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="relative relative z-10">
        <div
          id={contentId}
          className={`text-neutral-300 text-sm leading-relaxed transition-all duration-300 ${
            !isOpen && isLongReview ? 'line-clamp-3 sm:line-clamp-4' : ''
          }`}
        >
          <DOMPurifyContent content={content} />
        </div>

        {/* Bottom Fade Gradient for collapsed long reviews */}
        {!isOpen && isLongReview && (
          <div className="absolute -bottom-1 left-0 right-0 h-10 bg-gradient-to-t from-[#121117] to-transparent pointer-events-none" />
        )}
      </div>

      {/* Read More / Show Less Button */}
      {isLongReview && (
        <div className="mt-3 pt-3 border-t border-white/5 flex justify-start relative z-10">
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls={contentId}
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-fuelYellow hover:text-white transition-colors cursor-pointer py-1 px-2 rounded-lg hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow"
          >
            <span>{isOpen ? 'Show less' : 'Read full review'}</span>
            <ChevronDown
              size={14}
              aria-hidden="true"
              className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      )}
    </motion.article>
  );
};

export default ReviewItem;