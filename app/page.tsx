// app/page.tsx
import Hero from "@/components/hero";
import CategoryRow from "@/components/categoryRow";
import {
	getTrending,
	getPopularMovies,
	getTopRatedMovies,
	getUpcomingMovies,
	getPopularTvs,
	getTopRatedTvs,
} from "@/app/actions/home";
import { Flame, Star, Calendar, Tv, Film } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Home",
	description: "Discover trending movies, popular series, top rated cinema and upcoming releases on Moovie.",
};

export default async function Home() {
	const [
		trendingData,
		popularMoviesData,
		topRatedMoviesData,
		upcomingMoviesData,
		popularTvsData,
		topRatedTvsData,
	] = await Promise.all([
		getTrending({ page: 1, mediaType: "all" }),
		getPopularMovies({ page: 1 }),
		getTopRatedMovies({ page: 1 }),
		getUpcomingMovies({ page: 1 }),
		getPopularTvs({ page: 1 }),
		getTopRatedTvs({ page: 1 }),
	]);

	const bannerItems = (trendingData?.results || []).slice(0, 6);

	return (
		<div className="flex flex-col gap-2 pb-16">
			{/* Top Hero Showcase */}
			{bannerItems.length > 0 && <Hero data={bannerItems} />}

			{/* Trending Now */}
			<CategoryRow
				title="Trending Now"
				badge="Hot"
				icon={<Flame size={20} aria-hidden="true" />}
				items={trendingData?.results || []}
				mediaType="movie"
				viewAllHref="/movies"
			/>

			{/* Popular Movies */}
			<CategoryRow
				title="Popular Movies"
				badge="Must Watch"
				icon={<Film size={20} aria-hidden="true" />}
				items={popularMoviesData?.results || []}
				mediaType="movie"
				viewAllHref="/movies?sort_by=popularity.desc"
			/>

			{/* Top Rated Movies */}
			<CategoryRow
				title="Critically Acclaimed Movies"
				badge="Top 10"
				icon={<Star size={20} aria-hidden="true" />}
				items={topRatedMoviesData?.results || []}
				mediaType="movie"
				viewAllHref="/movies?sort_by=vote_average.desc"
			/>

			{/* Upcoming Releases */}
			<CategoryRow
				title="Upcoming in Theaters"
				badge="Coming Soon"
				icon={<Calendar size={20} aria-hidden="true" />}
				items={upcomingMoviesData?.results || []}
				mediaType="movie"
				viewAllHref="/movies?sort_by=primary_release_date.desc"
			/>

			{/* Popular TV Shows */}
			<CategoryRow
				title="Binge-Worthy TV Series"
				badge="Trending"
				icon={<Tv size={20} aria-hidden="true" />}
				items={popularTvsData?.results || []}
				mediaType="tv"
				viewAllHref="/tv?sort_by=popularity.desc"
			/>

			{/* Top Rated TV Shows */}
			<CategoryRow
				title="Highest Rated TV Shows"
				badge="All-Time Best"
				icon={<Star size={20} aria-hidden="true" />}
				items={topRatedTvsData?.results || []}
				mediaType="tv"
				viewAllHref="/tv?sort_by=vote_average.desc"
			/>
		</div>
	);
}