import { MovieDetails } from "@/types";
import ShowHero from "./showHero";

const Movies = async ({ data, id }: { data: MovieDetails; id: string }) => {
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
		/>
	);
};

export default Movies;