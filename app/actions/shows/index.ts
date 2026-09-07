import {
	CreditsProps,
	IPaginatedData,
	ListResults,
	MovieDetails,
	ReviewList,
	TvDetails,
	VideosResponse,
	WatchProvidersResponse,
} from "@/types";
import { fetchData } from "../../../lib/services/fetchData";
import {
	MOVIE_CREDITS,
	MOVIE_DETAILS,
	MOVIE_REVIEWS,
	MOVIE_SIMILARS,
	MOVIE_VIDEOS,
	MOVIE_WATCH_PROVIDERS,
	TV_CREDITS,
	TV_DETAILS,
	TV_REVIEWS,
	TV_SIMILARS,
	TV_VIDEOS,
	TV_WATCH_PROVIDERS,
} from "../urls";

export const getTvDetails = async ({ id }: { id: string }) => {
	const res = await fetchData<TvDetails>(TV_DETAILS(id));
	return res;
};

export const getMovieDetails = async ({ id }: { id: string }) => {
	const res = await fetchData<MovieDetails>(MOVIE_DETAILS(id));
	return res;
};

export const getMovieCredits = async ({ id }: { id: string }) => {
	const res = await fetchData<CreditsProps>(MOVIE_CREDITS(id));
	return res;
};

export const getTvCredits = async ({ id }: { id: string }) => {
	const res = await fetchData<CreditsProps>(TV_CREDITS(id));
	return res;
};

export const getMovieReviews = async ({ id }: { id: string }) => {
	const res = await fetchData<ReviewList>(MOVIE_REVIEWS(id));
	return res;
};

export const getTvReviews = async ({ id }: { id: string }) => {
	const res = await fetchData<ReviewList>(TV_REVIEWS(id));
	return res;
};
export const getSimilarTvs = async ({ id }: { id: string }) => {
	const res = await fetchData<IPaginatedData<ListResults>>(TV_SIMILARS(id));
	return res;
};

export const getSimilarMovies = async ({ id }: { id: string }) => {
	const res = await fetchData<IPaginatedData<ListResults>>(MOVIE_SIMILARS(id));
	return res;
};

export const getMovieVideos = async ({ id }: { id: string }) => {
	const res = await fetchData<VideosResponse>(MOVIE_VIDEOS(id));
	return res;
};

export const getTvVideos = async ({ id }: { id: string }) => {
	const res = await fetchData<VideosResponse>(TV_VIDEOS(id));
	return res;
};

export const getShowVideos = async ({
	id,
	mediaType,
}: {
	id: string;
	mediaType: "movie" | "tv";
}) => {
	if (mediaType === "tv") {
		return getTvVideos({ id });
	}
	return getMovieVideos({ id });
};

export const getMovieWatchProviders = async ({ id }: { id: string }) => {
	const res = await fetchData<WatchProvidersResponse>(MOVIE_WATCH_PROVIDERS(id));
	return res;
};

export const getTvWatchProviders = async ({ id }: { id: string }) => {
	const res = await fetchData<WatchProvidersResponse>(TV_WATCH_PROVIDERS(id));
	return res;
};

export const getShowWatchProviders = async ({
	id,
	mediaType,
}: {
	id: string;
	mediaType: "movie" | "tv";
}) => {
	if (mediaType === "tv") {
		return getTvWatchProviders({ id });
	}
	return getMovieWatchProviders({ id });
};

