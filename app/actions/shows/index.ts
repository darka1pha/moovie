import {
	CreditsProps,
	IPaginatedData,
	ListResults,
	MovieDetails,
	ReviewList,
	TvDetails,
} from "@/types";
import { fetchData } from "../../../lib/services/fetchData";
import {
	MOVIE_CREDITS,
	MOVIE_DETAILS,
	MOVIE_REVIEWS,
	MOVIE_SIMILARS,
	TV_CREDITS,
	TV_DETAILS,
	TV_REVIEWS,
	TV_SIMILARS,
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
