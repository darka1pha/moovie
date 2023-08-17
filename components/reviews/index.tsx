'use client'
import { ReviewList } from '@/types'
import ReviewItem from './reviewItem'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown2 } from 'iconsax-react'

interface Props {
	data: ReviewList
}

const Reviews = ({ data }: Props) => {
	const { results } = data
	const [renderCount, setRenderCount] = useState(3)
	const handleLoadMore = () => {
		if (renderCount + 3 <= results.length) {
			setRenderCount((prev) => prev + 3)
		} else {
			const remaining = results.length - renderCount
			setRenderCount((prev) => prev + remaining)
		}
	}

	const handleShowLess = () => {
		setRenderCount(3)
	}
	return (
		<motion.div className='paddings overflow-hidden'>
			<p className='text-white text-3xl mb-5'>Reviews</p>
			<motion.div
				layoutId='list'>
				{results
					.slice(0, renderCount)
					.map(({ author, author_details, content, created_at }, key) => (
						<ReviewItem
							key={key}
							listNumber={key}
							author={author}
							author_details={author_details}
							content={content}
							created_at={created_at}
						/>
					))}
				<div className='flex justify-center items-center'>
					<button
						className='text-white flex'
						onClick={
							renderCount < results.length ? handleLoadMore : handleShowLess
						}>
						<p className='mr-2'>
							{renderCount < results.length ? 'Show More' : 'Show Less'}
						</p>
						<motion.div
							initial={{ rotate: 0 }}
							animate={
								renderCount < results.length ? { rotate: 0 } : { rotate: 180 }
							}>
							<ArrowDown2 className='text-white' size={26} />
						</motion.div>
					</button>
				</div>
			</motion.div>
		</motion.div>
	)
}

export default Reviews
