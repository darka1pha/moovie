import { Star1, Clock, Category2 } from "iconsax-react";
import { favoritesAction } from "@/app/actions/favorites";
import { createClient } from "@/lib/supabase/server";
import LikeButton from "./likeButton";
import WatchTrailerButton from "@/components/trailerModal/watchTrailerButton";
import WatchProviders from "./watchProviders";
import { VideosResponse, WatchProvidersResponse } from "@/types";

interface Props {
	name: string;
	overview: string;
	genres: { name: string }[];
	rate: number;
	duration?: number;
	mediaType: "movie" | "tv";
	id: string;
	posterUrl: string | null;
	videos?: VideosResponse | null;
	watchProviders?: WatchProvidersResponse | null;
}

const Details = async ({
	posterUrl,
	name,
	overview,
	genres,
	rate,
	duration,
	mediaType,
	id,
	videos,
	watchProviders,
}: Props) => {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data } = user
		? await supabase
			.from("favorites")
			.select("*")
			.eq("item_id", id)
			.eq("user_id", user.id)
			.maybeSingle()
		: { data: null };

	const ratingValue = typeof rate === "number" && rate > 0 ? rate.toFixed(1) : "N/A";

	return (
		<div className="flex flex-col flex-1 text-white">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<span className="inline-block px-3 py-1 mb-2 text-xs font-semibold uppercase tracking-wider text-fuelYellow bg-fuelYellow/10 rounded-full border border-fuelYellow/30">
						{mediaType === "movie" ? "Movie" : "TV Series"}
					</span>
					<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">{name}</h1>
				</div>

				<div className="flex items-center gap-3 shrink-0">
					<WatchTrailerButton
						id={id}
						mediaType={mediaType}
						title={name}
						initialVideos={videos}
						variant="details"
					/>

					{user && (
						<form action={favoritesAction}>
							<input type="hidden" name="name" value={name} />
							<input type="hidden" name="rate" value={rate} />
							<input type="hidden" name="itemId" value={id} />
							<input type="hidden" name="mediaType" value={mediaType} />
							<input type="hidden" name="posterUrl" value={posterUrl || ""} />
							<input
								type="hidden"
								name="liked"
								value={data ? "liked" : "not-liked"}
							/>
							<LikeButton data={data} name={name} />
						</form>
					)}
				</div>
			</div>

			<div className="flex flex-wrap items-center gap-3 mt-6">
				{/* Rating badge */}
				<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-fuelYellow/10 border border-fuelYellow/30 text-fuelYellow">
					<Star1 aria-hidden="true" variant="Bold" color="var(--accent-color)" size={18} />
					<span className="text-sm font-bold text-white">{ratingValue}</span>
					<span className="text-xs text-battleGrey">/ 10</span>
				</div>

				{/* Duration badge */}
				{duration ? (
					<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm">
						<Clock size={16} className="text-battleGrey" aria-hidden="true" />
						<span>{duration} min</span>
					</div>
				) : null}

				{/* Genre badges */}
				{genres && genres.length > 0 && (
					<div className="flex flex-wrap items-center gap-2">
						{genres.map(({ name: genreName }) => (
							<span
								key={genreName}
								className="px-3 py-1 rounded-xl bg-balasticSea border border-white/10 text-xs font-medium text-battleGrey hover:text-white transition-colors"
							>
								{genreName}
							</span>
						))}
					</div>
				)}
			</div>

			<div className="mt-8">
				<h2 className="text-lg font-semibold text-white mb-2">Overview</h2>
				<p className="text-neutral-300 leading-relaxed text-base sm:text-lg max-w-4xl">
					{overview || "No overview available for this title."}
				</p>
			</div>

			<WatchProviders providers={watchProviders} title={name} />
		</div>
	);
};

export default Details;