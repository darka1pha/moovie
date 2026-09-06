import { Genres, IPaginatedData, ListResults } from "@/types";
import { fetchData } from "../../../lib/services/fetchData";
import {
	TRENDINGS,
	MOVIE_GENRES,
	DISCOVER,
	TV_GENRES,
	POPULAR_MOVIES,
	TOP_RATED_MOVIES,
	UPCOMING_MOVIES,
	POPULAR_TVS,
	TOP_RATED_TVS,
} from "../urls";

export const getTrending = async ({
	page = 1,
	mediaType = "all",
}: {
	page?: number;
	mediaType?: "all" | "movie" | "tv";
}) => {
	try {
		const res = await fetchData<IPaginatedData<ListResults>>(
			TRENDINGS({ media_type: mediaType, pageParam: page }),
			{ next: { revalidate: 1800 } }
		);
		return res;
	} catch {
		return { page: 1, results: [], total_pages: 0 };
	}
};

// Backwards compatibility alias
export const getTrendigs = getTrending;

export const getPopularMovies = async ({ page = 1 }: { page?: number } = {}) => {
	try {
		const res = await fetchData<IPaginatedData<ListResults>>(
			POPULAR_MOVIES({ pageParam: page }),
			{ next: { revalidate: 1800 } }
		);
		return res;
	} catch {
		return { page: 1, results: [], total_pages: 0 };
	}
};

export const getTopRatedMovies = async ({ page = 1 }: { page?: number } = {}) => {
	try {
		const res = await fetchData<IPaginatedData<ListResults>>(
			TOP_RATED_MOVIES({ pageParam: page }),
			{ next: { revalidate: 1800 } }
		);
		return res;
	} catch {
		return { page: 1, results: [], total_pages: 0 };
	}
};

export const getUpcomingMovies = async ({ page = 1 }: { page?: number } = {}) => {
	try {
		const res = await fetchData<IPaginatedData<ListResults>>(
			UPCOMING_MOVIES({ pageParam: page }),
			{ next: { revalidate: 1800 } }
		);
		return res;
	} catch {
		return { page: 1, results: [], total_pages: 0 };
	}
};

export const getPopularTvs = async ({ page = 1 }: { page?: number } = {}) => {
	try {
		const res = await fetchData<IPaginatedData<ListResults>>(
			POPULAR_TVS({ pageParam: page }),
			{ next: { revalidate: 1800 } }
		);
		return res;
	} catch {
		return { page: 1, results: [], total_pages: 0 };
	}
};

export const getTopRatedTvs = async ({ page = 1 }: { page?: number } = {}) => {
	try {
		const res = await fetchData<IPaginatedData<ListResults>>(
			TOP_RATED_TVS({ pageParam: page }),
			{ next: { revalidate: 1800 } }
		);
		return res;
	} catch {
		return { page: 1, results: [], total_pages: 0 };
	}
};

export const getDiscovers = async ({
	page = 1,
	mediaType = "movie",
	genre = "",
	year = "",
	sortBy = "popularity.desc",
	minRating = "",
}: {
	page?: number;
	mediaType?: string;
	genre?: string;
	year?: string;
	sortBy?: string;
	minRating?: string;
}) => {
	try {
		const res = await fetchData<IPaginatedData<ListResults>>(
			DISCOVER({ mediaType, genre, year, sortBy, minRating, pageParam: page }),
			{ next: { revalidate: 1800 } }
		);
		return res;
	} catch {
		return { page: 1, results: [], total_pages: 0 };
	}
};

export const getGenres = async ({ mediaType = "movie" }: { mediaType?: string }) => {
	try {
		const GENRE_URL =
			mediaType?.toLocaleLowerCase() === "tv" ? TV_GENRES : MOVIE_GENRES;
		const res = await fetchData<Genres>(GENRE_URL, {
			next: { revalidate: 86400 },
		});
		return res;
	} catch {
		return { genres: [] };
	}
};
