import ItemsCard from "./itemsCard";
import PageCounter from "../pageCounter";
import { getDiscovers } from "@/app/actions/home";

interface Props {
	genreID?: string;
	mediaType?: string;
	page?: number | string;
	year?: string;
	sortBy?: string;
	minRating?: string;
}

const Items = async ({
	genreID = "",
	mediaType = "movie",
	page = 1,
	year = "",
	sortBy = "popularity.desc",
	minRating = "",
}: Props) => {
	const resolvedPage = typeof page === "number" ? page : Number(page) || 1;
	const resolvedMediaType = mediaType || "movie";

	const {
		page: currentPage,
		results,
		total_pages,
	} = await getDiscovers({
		genre: genreID,
		mediaType: resolvedMediaType,
		page: resolvedPage,
		year,
		sortBy,
		minRating,
	});

	return (
		<>
			<div className="flex flex-wrap justify-center paddings !pt-2">
				{results?.map(
					({ id, original_title, title, vote_average, poster_path, name }: any) => (
						<ItemsCard
							key={id}
							original_title={title ?? original_title ?? name ?? "Untitled"}
							poster_path={poster_path}
							vote_average={vote_average}
							id={id}
							media={resolvedMediaType}
						/>
					)
				)}
			</div>
			{(!results || results.length === 0) && (
				<div className="text-center py-20 text-neutral-400 text-sm">
					No titles found matching the selected filter criteria.
				</div>
			)}
			{total_pages > 1 && (
				<PageCounter
					currentPage={currentPage}
					totalPages={total_pages > 500 ? 500 : total_pages}
				/>
			)}
		</>
	);
};

export default Items;
