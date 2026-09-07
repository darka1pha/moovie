"use server";

import { IPaginatedData, ListResults } from "@/types";
import { fetchData } from "@/lib/services/fetchData";
import { MULTI_SEARCH, TRENDINGS } from "../urls";

export interface SearchShowsParams {
	query: string;
	page?: number;
}

/**
 * Searches TMDB for movies and TV series matching the query.
 * Filters out people and ensures valid titles and media types.
 */
export const searchShows = async ({
	query,
	page = 1,
}: SearchShowsParams): Promise<ListResults[]> => {
	const trimmedQuery = query?.trim();
	if (!trimmedQuery) return [];

	try {
		const res = await fetchData<IPaginatedData<ListResults>>(
			MULTI_SEARCH(encodeURIComponent(trimmedQuery), page)
		);

		if (!res || !res.results) return [];

		// Filter out people or entries missing titles
		const filteredResults = res.results
			.filter((item) => {
				if (item.media_type === "person") return false;
				return Boolean(item.title || item.name);
			})
			.map((item) => ({
				...item,
				media_type: (item.media_type || (item.title ? "movie" : "tv")) as "movie" | "tv",
			}));

		return filteredResults;
	} catch (error) {
		console.error(`Error in searchShows for "${trimmedQuery}":`, error);
		return [];
	}
};

/**
 * Returns top trending movies & TV shows for quick suggestions when search input is empty.
 */
export const getQuickSuggestions = async (): Promise<ListResults[]> => {
	try {
		const res = await fetchData<IPaginatedData<ListResults>>(
			TRENDINGS({ media_type: "all", pageParam: 1 })
		);

		if (!res || !res.results) return [];

		return res.results
			.filter((item) => item.media_type !== "person" && Boolean(item.title || item.name))
			.slice(0, 8)
			.map((item) => ({
				...item,
				media_type: (item.media_type || (item.title ? "movie" : "tv")) as "movie" | "tv",
			}));
	} catch (error) {
		console.error("Error fetching quick suggestions:", error);
		return [];
	}
};
