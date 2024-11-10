'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import HeroSlide from './heroSlide';
import { ListResults } from '@/types';
import { BACKDROP_URL } from '@/lib/services/actions/urls';

interface Props {
  data: ListResults[];
}

const Hero = ({ data }: Props) => {
  return (
    <Swiper
      className='h-[60vh] md:h-[100vh]'
      effect={'fade'}
      modules={[Pagination, EffectFade, Autoplay]}
      pagination
      autoplay
    >
      {data.map(
        ({
          backdrop_path,
          original_title,
          overview,
          adult,
          id,
          media_type,
        }) => (
          <SwiperSlide
            key={id}
            className='h-full w-96'
          >
            <HeroSlide
              id={id}
              mediaType={media_type}
              adult={adult}
              overview={overview}
              imageUrl={BACKDROP_URL({ quality: 'w1280' }) + backdrop_path}
              name={original_title}
            />
          </SwiperSlide>
        )
      )}
    </Swiper>
  );
};

export default Hero;
