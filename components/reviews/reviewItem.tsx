// components/reviews/reviewItem.tsx
'use client';
import { Review } from '@/types';
import { motion } from 'motion/react';
import { ArrowDown2, Star1 } from 'iconsax-react';
import { useId, useState } from 'react';
import DOMPurifyContent from '../dumpurifyContent';

const ReviewItem = ({
  author,
  author_details,
  content,
  created_at,
  delay,
}: Review) => {
  const { name, rating, username } = author_details;
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();
  const toggleHandler = () => setIsOpen((prev) => !prev);

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -200 }}
      transition={{ duration: 0.3, delay }}
      className='flex flex-col px-4 py-3 border-2 border-battleGrey rounded-lg my-5 bg-darkGrey shadow-lg'
    >
      <div className='flex items-start justify-between w-full mb-3'>
        <div>
          <div className='flex items-center'>
            <p className='text-white font-medium text-base mr-2'>
              {name || author}
            </p>
            {rating && (
              <div className='flex items-center bg-yellow-600/10 px-2 py-1 rounded-md ml-2'>
                <Star1 color='rgb(239, 174, 40)' size={16} aria-hidden="true" />
                <p className='text-yellow-500 text-sm ml-1 font-semibold'>
                  <span className="sr-only">Rating: </span>
                  {rating}/10
                </p>
              </div>
            )}
          </div>
          {username && <p className='text-battleGrey text-sm'>@{username}</p>}
        </div>
        <p className='text-white text-sm opacity-75'>
          {new Date(created_at).toLocaleDateString('en-US', {
            dateStyle: 'long',
          })}
        </p>
      </div>
      <motion.div
        id={contentId}
        initial={false}
        animate={{ opacity: 1, height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className={`overflow-hidden text-white text-sm leading-relaxed ${isOpen ? '' : 'line-clamp-1'
          }`}
      >
        <DOMPurifyContent content={content} />
      </motion.div>
      <div className='border-t border-t-battleGrey mt-3 flex justify-center pt-2'>
        <motion.button
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={toggleHandler}
          whileTap={{ scale: 0.95 }}
          className='flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow'
        >
          <span className='mr-2 text-white'>
            {!isOpen ? 'Show more' : 'Show less'}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowDown2 color='white' size={26} aria-hidden="true" />
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ReviewItem;