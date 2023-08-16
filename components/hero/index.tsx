'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Autoplay, Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
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
			effect={'fade'}
			modules={[Pagination, EffectFade, Autoplay]}
			pagination
			autoplay>
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
