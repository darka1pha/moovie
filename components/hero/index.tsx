"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import HeroSlide from "./heroSlide";
import { BACKDROP_URL } from "@/lib/tmdb/image";
import { ListResults } from "@/types";

interface Props {
	data: ListResults[];
}

const Hero = ({ data }: Props) => {
	if (!data || data.length === 0) return null;

	return (
		<Swiper
			className="h-[60vh] md:h-[80vh] max-h-[800px]"
			effect={"fade"}
			modules={[Pagination, EffectFade, Autoplay]}
			pagination={{ clickable: true }}
			autoplay={{ delay: 6000, disableOnInteraction: false }}
		>
			{data.map(
				({
					backdrop_path,
					original_title,
					name,
					overview,
					adult,
					id,
					media_type,
				}) => {
					const displayTitle = original_title || name || "Untitled";
					const imageUrl = backdrop_path
						? BACKDROP_URL({ quality: "w1280" }) + backdrop_path
						: "/icons/gold-icon.png";

					return (
						<SwiperSlide key={id} className="h-full w-full">
							<HeroSlide
								id={id}
								mediaType={media_type}
								adult={adult}
								overview={overview}
								imageUrl={imageUrl}
								name={displayTitle}
							/>
						</SwiperSlide>
					);
				}
			)}
		</Swiper>
	);
};

export default Hero;