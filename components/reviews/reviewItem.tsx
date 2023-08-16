'use client'
import { Review } from '@/types'
import { motion } from 'framer-motion'
import { ArrowDown2, Star1 } from 'iconsax-react'
import { useState } from 'react'
const ReviewItem = ({
	author,
	author_details,
	content,
	created_at,
}: Review) => {
	const { name, rating, username } = author_details
	const [isOpen, setIsOpen] = useState(false)
	const togglehandler = () => setIsOpen(!isOpen)
	return (
		<div className='flex flex-col px-2 border-[2px] border-battleGrey rounded-xl my-4'>
			<div className='flex p-4'>
				<div>
					<div className='flex'>
						<p className='text-white text-sm'>{name ?? author}</p>
						{rating && (
							<div className='flex items-center justify-center ml-2'>
								<Star1 className='text-fuelYellow' size={18} />
								<p className='text-white text-xs ml-1'>{rating + `/10`}</p>
							</div>
						)}
					</div>
					<p className='text-battleGrey text-xs mt-1'>@{username}</p>
				</div>
			</div>
			<motion.div
				initial={{ height: 0 }}
				animate={isOpen ? { height: 'auto' } : { height: 0 }}
				className='flex w-full overflow-hidden'>
				<p className='text-white text-sm p-2'>{content}</p>
			</motion.div>
			<div className='m-2 border-t-[1px] border-t-battleGrey flex items-center justify-center py-3'>
				<motion.button
					onClick={togglehandler}
					initial={{ rotate: 0 }}
					animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
					className='h-12 w-12 rounded-full flex items-center justify-center hover:bg-white/10 transition-all ease-out duration-300'>
					<ArrowDown2 className='text-battleGrey' size={26} />
				</motion.button>
			</div>
		</div>
	)
}

export default ReviewItem
