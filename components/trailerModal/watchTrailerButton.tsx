"use client";

import React, { useState } from "react";
import { VideoResult, VideosResponse } from "@/types";
import { getShowVideos } from "@/app/actions/shows";
import { TrailerModal } from "./index";
import { Play, Film } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

interface WatchTrailerButtonProps {
	id: string | number;
	mediaType?: "movie" | "tv" | "person";
	title: string;
	initialVideos?: VideoResult[] | VideosResponse | null;
	variant?: "hero" | "details" | "poster" | "compact";
	className?: string;
}

export const WatchTrailerButton: React.FC<WatchTrailerButtonProps> = ({
	id,
	mediaType = "movie",
	title,
	initialVideos,
	variant = "details",
	className = "",
}) => {
	const rawInitialVideos: VideoResult[] = Array.isArray(initialVideos)
		? initialVideos
		: initialVideos?.results || [];

	const [fetchedVideos, setFetchedVideos] = useState<VideoResult[] | null>(null);
	const videos = fetchedVideos ?? rawInitialVideos;
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleOpen = async (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		// If videos are already cached or preloaded, open immediately
		if (videos.length > 0) {
			setIsOpen(true);
			return;
		}

		// Otherwise fetch on demand
		const validMediaType = mediaType === "tv" ? "tv" : "movie";
		setIsLoading(true);
		try {
			const res = await getShowVideos({
				id: id.toString(),
				mediaType: validMediaType,
			});
			const fetched = res?.results || [];
			setFetchedVideos(fetched);
			setIsOpen(true);
		} catch (error) {
			console.error("Failed to fetch trailer videos:", error);
			// Open anyway to show friendly fallback
			setIsOpen(true);
		} finally {
			setIsLoading(false);
		}
	};

	// Variant 1: Hero slide secondary action
	if (variant === "hero") {
		return (
			<>
				<button
					type="button"
					onClick={handleOpen}
					disabled={isLoading}
					aria-label={`Watch official trailer for ${title}`}
					className={`inline-flex items-center justify-center gap-2.5 bg-balasticSea/70 hover:bg-balasticSea/95 text-white font-semibold text-xs sm:text-sm rounded-xl py-3 px-6 backdrop-blur-md border border-white/20 hover:border-fuelYellow/50 hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl shadow-black/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow group ${className}`}
				>
					{isLoading ? (
						<Spinner size="sm" className="text-fuelYellow" />
					) : (
						<div className="h-5 w-5 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-fuelYellow group-hover:text-black transition-colors">
							<Play size={12} className="fill-white group-hover:fill-black transition-colors ml-0.5" />
						</div>
					)}
					<span className="group-hover:text-fuelYellow transition-colors">Watch Trailer</span>
				</button>

				<TrailerModal
					isOpen={isOpen}
					onClose={() => setIsOpen(false)}
					title={title}
					videos={videos}
				/>
			</>
		);
	}

	// Variant 2: Poster floating overlay (appears on hover on movie/tv details)
	if (variant === "poster") {
		return (
			<>
				<button
					type="button"
					onClick={handleOpen}
					disabled={isLoading}
					aria-label={`Watch trailer for ${title}`}
					className={`absolute inset-0 w-full h-full bg-black/60 backdrop-blur-[2px] opacity-0 hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer z-20 group ${className}`}
				>
					<div className="w-14 h-14 rounded-full bg-fuelYellow text-black flex items-center justify-center shadow-lg shadow-fuelYellow/40 transition-transform duration-300 group-hover:scale-110">
						{isLoading ? (
							<Spinner size="md" className="text-black" />
						) : (
							<Play size={24} className="fill-black ml-1" />
						)}
					</div>
					<span className="text-xs font-bold text-white tracking-wider uppercase drop-shadow">
						Watch Trailer
					</span>
				</button>

				<TrailerModal
					isOpen={isOpen}
					onClose={() => setIsOpen(false)}
					title={title}
					videos={videos}
				/>
			</>
		);
	}

	// Variant 3: Compact pill (for cards or lists)
	if (variant === "compact") {
		return (
			<>
				<button
					type="button"
					onClick={handleOpen}
					disabled={isLoading}
					aria-label={`Watch trailer for ${title}`}
					className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-white/10 hover:bg-fuelYellow hover:text-black text-white border border-white/15 transition-all ${className}`}
				>
					{isLoading ? (
						<Spinner size="sm" />
					) : (
						<Film size={13} aria-hidden="true" />
					)}
					<span>Trailer</span>
				</button>

				<TrailerModal
					isOpen={isOpen}
					onClose={() => setIsOpen(false)}
					title={title}
					videos={videos}
				/>
			</>
		);
	}

	// Default: Show Details header action button
	return (
		<>
			<button
				type="button"
				onClick={handleOpen}
				disabled={isLoading}
				aria-label={`Watch official trailer for ${title}`}
				className={`inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-balasticSea/90 hover:bg-balasticSea text-white border border-fuelYellow/40 hover:border-fuelYellow hover:shadow-lg hover:shadow-fuelYellow/20 hover:scale-105 active:scale-95 transition-all duration-200 font-semibold text-xs sm:text-sm group ${className}`}
			>
				{isLoading ? (
					<Spinner size="sm" className="text-fuelYellow" />
				) : (
					<div className="w-5 h-5 rounded-full bg-fuelYellow/20 text-fuelYellow flex items-center justify-center group-hover:bg-fuelYellow group-hover:text-black transition-colors">
						<Play size={11} className="fill-current ml-0.5" />
					</div>
				)}
				<span className="text-white group-hover:text-fuelYellow transition-colors">
					Official Trailer
				</span>
			</button>

			<TrailerModal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				title={title}
				videos={videos}
			/>
		</>
	);
};

export default WatchTrailerButton;
