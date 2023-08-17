'use client'

import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

import { CreditsProps } from '@/types'
import CastItem from './CastItem'

interface CreditCopmonentProps {
	data: CreditsProps
}

const Credits = ({ data }: CreditCopmonentProps) => {
	return (
		<div className='paddings'>
			<p className='font-bold text-3xl sm:text-4xl mb-5 text-white'>Credits</p>
			<Swiper
				modules={[Navigation]}
				navigation={true}
				breakpoints={{
					0: {
						slidesPerView: 2,
						spaceBetween: 10,
					},
					600: {
						slidesPerView: 3,
						spaceBetween: 20,
					},
					1100: {
						slidesPerView: 4,
						spaceBetween: 40,
					},
					1280: {
						slidesPerView: 6,
						spaceBetween: 10,
					},
				}}>
				{data.cast
					.slice(0, 15)
					.map(({ character, name, orginal_name, profile_path }, key) => (
						<SwiperSlide key={key}>
							<CastItem
								character={character}
								name={name}
								orginal_name={orginal_name}
								profile_path={profile_path}
							/>
						</SwiperSlide>
					))}
			</Swiper>
		</div>
	)
}

export default Credits
