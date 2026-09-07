import { TvDetails, VideosResponse, WatchProvidersResponse } from "@/types";
import ShowHero from "./showHero";

interface TvsProps {
	data: TvDetails;
	id: string;
	videos?: VideosResponse | null;
	watchProviders?: WatchProvidersResponse | null;
}

const Tvs = async ({ data, id, videos, watchProviders }: TvsProps) => {
	const displayTitle = data.name ?? data.original_name ?? "Untitled";

	return (
		<ShowHero
			id={id}
			mediaType="tv"
			title={displayTitle}
			overview={data.overview}
			posterPath={data.poster_path}
			backdropPath={data.backdrop_path}
			voteAverage={data.vote_average}
			duration={data.episode_run_time?.[0]}
			genres={data.genres || []}
			videos={videos}
			watchProviders={watchProviders}
		/>
	);
};

export default Tvs;