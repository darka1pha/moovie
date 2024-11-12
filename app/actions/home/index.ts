import { Genres, IPaginatedData, ListResults } from "@/types";
import { fetchData } from "../../../lib/services/fetchData";
import { TRENDINGS, MOVIE_GENRES, DISCOVER, TV_GENRES } from "../urls";

export const getTrendigs = async ({
	page,
	mediaType = "all",
}: {
	page: number;
	mediaType: "all" | "movie" | "tv";
}) => {
	const res = await fetchData<IPaginatedData<ListResults>>(
		TRENDINGS({ media_type: mediaType, pageParam: page })
	);
	return res;
};

export const getDiscovers = async ({
	page,
	mediaType = "movie",
	genre,
}: {
	page?: number;
	mediaType: string;
	genre: string;
}) => {
	const res = await fetchData<IPaginatedData<ListResults>>(
		DISCOVER({ mediaType, genre, pageParam: page })
	);
	return res;
};

export const getGenres = async ({ mediaType }: { mediaType: string }) => {
	const GENRE_URL =
		mediaType.toLocaleLowerCase() === "tv" ? TV_GENRES : MOVIE_GENRES;
	const res = await fetchData<Genres>(GENRE_URL);
	return res;
};
