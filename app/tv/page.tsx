import EnhancedFilters from "@/components/enhancedFilters";
import Items from "@/components/items";
import ItemsLoading from "@/components/items/itemsLoading";
import { getGenres } from "@/app/actions/home";
import { Suspense } from "react";
import { Tv } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Explore TV Shows",
	description: "Filter and discover popular and top-rated TV series, shows, and miniseries on Moovie.",
};

export default async function TvPage({
	searchParams,
}: {
	searchParams: Promise<{
		page?: string | number;
		genre?: string;
		year?: string;
		sort_by?: string;
		min_rating?: string;
	}>;
}) {
	const { page, genre, year, sort_by, min_rating } = await searchParams;

	const { genres } = await getGenres({
		mediaType: "tv",
	});

	const genreID =
		genre && genre.toLowerCase() !== "all genres" && genre.toLowerCase() !== "all"
			? genres.find((item) => item.name.toLowerCase() === genre.toLowerCase())?.id ?? ""
			: "";

	const suspenseKey = `tv-${genreID}-${year ?? ""}-${sort_by ?? ""}-${min_rating ?? ""}-${page ?? 1}`;

	return (
		<main className="min-h-screen pb-20">
			{/* Header Banner */}
			<div className="paddings py-8 border-b border-white/5 bg-gradient-to-b from-black/60 to-transparent">
				<div className="flex items-center gap-3 mb-2">
					<div className="p-2.5 rounded-xl bg-fuelYellow/10 text-fuelYellow border border-fuelYellow/20 shadow-sm">
						<Tv size={24} aria-hidden="true" />
					</div>
					<div>
						<h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
							Explore TV Series
						</h1>
						<p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
							Discover top-rated television, anime, limited series, and drama.
						</p>
					</div>
				</div>
			</div>

			{/* Enhanced Multi-Criteria Filter Bar */}
			<EnhancedFilters genreData={genres} mediaType="tv" />

			{/* Filtered TV Results with Skeleton Loading */}
			<div className="relative z-10">
				<Suspense key={suspenseKey} fallback={<ItemsLoading />}>
					<Items
						genreID={genreID.toString()}
						mediaType="tv"
						page={page}
						year={year}
						sortBy={sort_by}
						minRating={min_rating}
					/>
				</Suspense>
			</div>
		</main>
	);
}
