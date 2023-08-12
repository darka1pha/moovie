'use client'

import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import HeroSlide from './heroSlide'
import { ListResults } from '@/types'
import { BACKDROP_URL } from '@/lib/urls'

interface Props {
	data: ListResults[]
}

const Hero = ({ data }: Props) => {
	return (
		<Swiper
			className='h-[480px]'
			modules={[Pagination]}
			navigation
			pagination={{ clickable: true }}
			onSlideChange={() => console.log('slide change')}>
			{data.map(
				({
					backdrop_path,
					original_title,
					overview,
					adult,
					media_type,
					id,
				}) => (
					<SwiperSlide className='h-full w-96'>
						<HeroSlide
							id={id}
							mediaType={media_type}
							adult={adult}
							overview={overview}
							imageUrl={BACKDROP_URL({ quality: 'original' }) + backdrop_path}
							name={original_title}
						/>
					</SwiperSlide>
				)
			)}
		</Swiper>
	)
}

export default Hero
