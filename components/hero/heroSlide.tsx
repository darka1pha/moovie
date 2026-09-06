import Image from "next/image";
import Link from "next/link";
import { Play } from "iconsax-react";

interface Props {
	imageUrl: string;
	name: string;
	overview: string;
	adult: boolean;
	mediaType: "tv" | "movie" | "person" | undefined;
	id: number;
}

const HeroSlide = ({
	imageUrl,
	name,
	overview,
	adult,
	mediaType,
	id,
}: Props) => {
	const destination = mediaType === "tv" ? `/tv/${id}` : `/movie/${id}`;

	return (
		<div className="relative w-full h-full overflow-hidden">
			<Image
				priority
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
				fill
				className="object-cover transition-transform duration-1000 ease-out scale-100 hover:scale-105"
				src={imageUrl}
				alt={name ?? `${id} backdrop`}
			/>
			{/* Multi-layered cinematic gradient overlays */}
			<div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black/95 via-black/65 to-transparent z-20" />
			<div className="absolute inset-0 w-full h-full bg-gradient-to-t from-[#0d0c11] via-transparent to-black/40 z-20" />

			<div className="relative z-30 flex flex-col justify-center h-full px-8 sm:px-14 md:px-20 max-w-2xl animate-fade-in">
				<h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight line-clamp-2 drop-shadow-md">
					{name}
				</h1>
				{adult && (
					<div className="rounded-full mt-3 border border-red-500/80 bg-red-500/10 w-12 flex items-center justify-center py-0.5">
						<span className="text-xs font-bold text-red-400">+18</span>
					</div>
				)}
				<div className="mt-4">
					<p className="text-sm sm:text-base leading-relaxed text-neutral-300 line-clamp-3 md:line-clamp-4 drop-shadow">
						{overview}
					</p>
				</div>
				<div className="mt-7 flex items-center gap-4">
					<Link
						href={destination}
						aria-label={`Watch ${name} now`}
						className="inline-flex items-center justify-center gap-2 bg-fuelYellow text-black font-bold text-xs sm:text-sm rounded-xl py-3 px-7 hover:bg-fuelYellow/90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl shadow-fuelYellow/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white group"
					>
						<Play size={16} variant="Bold" color="black" aria-hidden="true" className="transition-transform group-hover:scale-110" />
						<span>Watch now</span>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default HeroSlide;
