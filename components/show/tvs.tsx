import { TvDetails } from "@/types";
import ShowHero from "./showHero";

const Tvs = async ({ data, id }: { data: TvDetails; id: string }) => {
	const displayTitle = data.original_name ?? "Untitled";

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
		/>
	);
};

export default Tvs;