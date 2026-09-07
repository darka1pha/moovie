"use server";

import { ListResults, IPaginatedData } from "@/types";
import { fetchData } from "@/lib/services/fetchData";
import { DISCOVER } from "../urls";

export interface RouletteParams {
	mediaType?: "movie" | "tv";
	genre?: string;
	minRating?: string;
	era?: "all" | "2020s" | "2010s" | "2000s" | "classic";
}

export const spinRoulette = async (
	params: RouletteParams = {}
): Promise<ListResults | null> => {
	const {
		mediaType = "movie",
		genre = "",
		minRating = "7.0",
		era = "all",
	} = params;

	let year = "";
	if (era === "2020s") year = "2023";
	else if (era === "2010s") year = "2016";
	else if (era === "2000s") year = "2005";
	else if (era === "classic") year = "1995";

	try {
		// First fetch page 1 to check total pages
		const firstPage = await fetchData<IPaginatedData<ListResults>>(
			DISCOVER({
				mediaType,
				genre,
				minRating,
				year,
				pageParam: 1,
				sortBy: "popularity.desc",
			})
		);

		if (!firstPage || !firstPage.results || firstPage.results.length === 0) {
			// Fallback with relaxed filters
			const fallback = await fetchData<IPaginatedData<ListResults>>(
				DISCOVER({
					mediaType,
					genre: "",
					minRating: "7.0",
					pageParam: 1,
					sortBy: "popularity.desc",
				})
			);
			if (fallback?.results?.length) {
				const pick =
					fallback.results[Math.floor(Math.random() * fallback.results.length)];
				return {
					...pick,
					media_type: mediaType,
				};
			}
			return null;
		}

		// Random page within top 5 available pages
		const maxPages = Math.min(firstPage.total_pages || 1, 6);
		const randomPage = Math.floor(Math.random() * maxPages) + 1;

		let candidates = firstPage.results;
		if (randomPage > 1) {
			const randomPageData = await fetchData<IPaginatedData<ListResults>>(
				DISCOVER({
					mediaType,
					genre,
					minRating,
					year,
					pageParam: randomPage,
					sortBy: "popularity.desc",
				})
			);
			if (randomPageData?.results?.length) {
				candidates = randomPageData.results;
			}
		}

		// Filter candidates with valid posters & overviews
		const validCandidates = candidates.filter(
			(item) => (item.title || item.name) && item.poster_path && item.overview
		);

		const pool = validCandidates.length > 0 ? validCandidates : candidates;
		const pick = pool[Math.floor(Math.random() * pool.length)];

		return {
			...pick,
			media_type: mediaType,
		};
	} catch (error) {
		console.error("Error in spinRoulette:", error);
		return null;
	}
};
