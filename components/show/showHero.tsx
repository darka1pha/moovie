import Image from "next/image";
import Details from "./details";
import { BACKDROP_URL, POSTER_URL } from "@/lib/tmdb/image";
import { VideosResponse } from "@/types";
import WatchTrailerButton from "@/components/trailerModal/watchTrailerButton";

interface ShowHeroProps {
	id: string;
	mediaType: "movie" | "tv";
	title: string;
	overview: string;
	posterPath: string | null;
	backdropPath: string | null;
	voteAverage: number;
	duration?: number;
	genres: Array<{ name: string }>;
	videos?: VideosResponse | null;
}

const ShowHero = async ({
	id,
	mediaType,
	title,
	overview,
	posterPath,
	backdropPath,
	voteAverage,
	duration,
	genres,
	videos,
}: ShowHeroProps) => {
	const backdropUrl = backdropPath
		? `${BACKDROP_URL({ quality: "w1280" })}${backdropPath}`
		: undefined;

	return (
		<div className="flex flex-col relative p-6 sm:p-10 md:p-16 overflow-hidden">
			{/* Backdrop overlay */}
			{backdropUrl && (
				<div
					aria-hidden="true"
					className="bg-no-repeat bg-cover bg-center absolute inset-0 h-full w-full opacity-30 blur-sm scale-105 transition-all duration-700 pointer-events-none"
					style={{ backgroundImage: `url(${backdropUrl})` }}
				/>
			)}
			<div className="absolute inset-0 w-full h-full bg-gradient-to-t from-[#0d0c11] via-[#0d0c11]/80 to-transparent pointer-events-none" />

			<div className="relative z-10 flex flex-col items-center md:flex-row gap-8 lg:gap-12 max-w-7xl mx-auto w-full">
				{/* Poster container */}
				<div className="w-64 sm:w-80 md:w-96 shrink-0 aspect-[2/3] rounded-2xl border-2 border-battleGrey/30 overflow-hidden shadow-2xl bg-balasticSea relative group">
					{posterPath ? (
						<Image
							src={`${POSTER_URL({ quality: "w500" })}${posterPath}`}
							alt={title}
							fill
							priority
							sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
							className="object-cover"
						/>
					) : (
						<div className="h-full w-full flex items-center justify-center bg-balasticSea text-battleGrey text-sm p-4 text-center">
							No poster available
						</div>
					)}

					{/* Hover Watch Trailer Overlay on Poster */}
					<WatchTrailerButton
						id={id}
						mediaType={mediaType}
						title={title}
						initialVideos={videos}
						variant="poster"
					/>
				</div>

				{/* Details */}
				<div className="flex-1 w-full">
					<Details
						id={id}
						mediaType={mediaType}
						name={title}
						overview={overview}
						rate={voteAverage}
						duration={duration}
						genres={genres}
						posterUrl={posterPath}
						videos={videos}
					/>
				</div>
			</div>
		</div>
	);
};

export default ShowHero;
