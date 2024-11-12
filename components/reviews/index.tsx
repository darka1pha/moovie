'use client';
import { ReviewList } from '@/types';
import ReviewItem from './reviewItem';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown2 } from 'iconsax-react';

interface Props {
  data: ReviewList;
}

const Reviews = ({ data }: Props) => {
  const { results } = data;
  const [renderCount, setRenderCount] = useState(3);

  // Increase render count by a specified number or until all items are shown
  const handleLoadMore = () => {
    setRenderCount((prevCount) => Math.min(prevCount + 3, results.length));
  };

  // Reset render count to show only the initial items
  const handleShowLess = () => {
    setRenderCount(3);
  };

  // Determine if "Show More" or "Show Less" button should display
  const isMoreToShow = renderCount < results.length;

  return (
    <div className='paddings overflow-hidden'>
      <h2 className='font-bold text-3xl sm:text-4xl mb-5 text-white'>
        Reviews
      </h2>
      <motion.div>
        <AnimatePresence>
          {results.slice(0, renderCount).map((review, index) => (
            <ReviewItem
              key={index} // Prefer unique IDs if available
              delay={(index % 3) * 0.4}
              author={review.author}
              author_details={review.author_details}
              content={review.content}
              created_at={review.created_at}
            />
          ))}
        </AnimatePresence>

        {renderCount !== results.length && (
          <div className='flex justify-center items-center mt-5'>
            <button
              aria-label={isMoreToShow ? 'Load More' : 'Show Less'}
              className='text-white flex items-center'
              onClick={isMoreToShow ? handleLoadMore : handleShowLess}
            >
              <span className='mr-2'>
                {isMoreToShow ? 'Show More' : 'Show Less'}
              </span>
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: isMoreToShow ? 0 : 180 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowDown2
                  color='white'
                  size={26}
                />
              </motion.div>
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Reviews;
