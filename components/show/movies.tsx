import { MovieDetails, VideosResponse, WatchProvidersResponse } from "@/types";
import ShowHero from "./showHero";

interface MoviesProps {
	data: MovieDetails;
	id: string;
	videos?: VideosResponse | null;
	watchProviders?: WatchProvidersResponse | null;
}

const Movies = async ({ data, id, videos, watchProviders }: MoviesProps) => {
	const displayTitle = data.title ?? data.original_title ?? "Untitled";

	return (
		<ShowHero
			id={id}
			mediaType="movie"
			title={displayTitle}
			overview={data.overview}
			posterPath={data.poster_path}
			backdropPath={data.backdrop_path}
			voteAverage={data.vote_average}
			duration={data.runtime}
			genres={data.genres || []}
			videos={videos}
			watchProviders={watchProviders}
		/>
	);
};

export default Movies;