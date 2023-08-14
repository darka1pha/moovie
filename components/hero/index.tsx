'use client'

import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCreative } from 'swiper/modules'

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
			className='h-[60vh] md:h-[100vh]'
			effect={'creative'}
			creativeEffect={{
				prev: {
					shadow: true,
					translate: [0, 0, -400],
				},
				next: {
					translate: ['100%', 0, 0],
				},
			}}
			modules={[Pagination, EffectCreative]}
			navigation
			pagination={{ clickable: true }}
			onSlideChange={() => console.log('slide change')}>
			{data.map(
				({
					backdrop_path,
					original_title,
					overview,
					adult,
					id,
					media_type,
				}) => (
					<SwiperSlide className='h-full w-96'>
						<HeroSlide
							key={id}
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
