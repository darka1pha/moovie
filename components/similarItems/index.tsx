'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import React from 'react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import { useParams, usePathname } from 'next/navigation'
import { Navigation } from 'swiper/modules'
import ItemsCard from '../items/itemsCard'
import { IPaginatedData, ListResults } from '@/types'

interface Props {
	data: IPaginatedData<ListResults>
}

const SimilarItems: React.FC<Props> = ({ data }) => {
	const { results } = data
	const pathname = usePathname()
	return (
		<div className='flex flex-col mb-10 text-white paddings'>
			<div className='mb-2'>
				<h3 className='font-bold text-3xl sm:text-4xl'>
					Similar {pathname.includes('tv') ? 'Tv Shows' : 'Movies'}
				</h3>
			</div>
			<div className='mt-5'>
				<Swiper
					className='mySwiper'
					modules={[Navigation]}
					navigation={true}
					breakpoints={{
						0: {
							slidesPerView: 1,
							spaceBetween: 10,
						},
						600: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						1100: {
							slidesPerView: 3,
							spaceBetween: 40,
						},
						1280: {
							slidesPerView: 4,
							spaceBetween: 10,
						},
					}}>
					{results?.map(
						({ id, original_title, vote_average, poster_path, name }) => (
							<SwiperSlide>
								<ItemsCard
									margin='mx-auto'
									key={id}
									original_title={original_title ?? name}
									poster_path={poster_path}
									vote_average={vote_average}
									id={id}
								/>
							</SwiperSlide>
						)
					)}
				</Swiper>
			</div>
		</div>
	)
}

export default SimilarItems
