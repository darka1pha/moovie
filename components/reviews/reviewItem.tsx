'use client';
import { Review } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown2, Star1 } from 'iconsax-react';
import { useState } from 'react';
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
  const toggleHandler = () => setIsOpen(!isOpen);

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
                <Star1
                  color='rgb(239, 174, 40)'
                  size={16}
                />
                <p className='text-yellow-500 text-sm ml-1 font-semibold'>
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
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        // animate={isOpen ? { height: 'auto' } : { height: '2rem' }}
        className={`overflow-hidden text-white text-sm leading-relaxed ${
          isOpen ? '' : 'line-clamp-1'
        }`}
        // transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
      >
        <DOMPurifyContent content={content} />
      </motion.div>
      <div className='border-t border-t-battleGrey mt-3 flex justify-center pt-2'>
        <motion.button
          aria-label='Toggle Review Content'
          onClick={toggleHandler}
          className='flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition-all duration-200'
        >
          <p>{!isOpen ? 'show' : 'hide'}</p>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ReviewItem;
