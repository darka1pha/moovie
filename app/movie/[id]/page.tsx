import Movies from "@/components/show/movies";
import Reviews from "@/components/reviews";
import SimilarItems from "@/components/similarItems";
import Credits from "@/components/show/credits";
import { getDiscovers } from "@/app/actions/home";
import {
	getMovieCredits,
	getMovieDetails,
	getMovieReviews,
	getMovieVideos,
	getSimilarMovies,
} from "@/app/actions/shows";
import { POSTER_URL } from "@/lib/tmdb/image";
import { notFound } from "next/navigation";

interface MetadataProps {
	params: Promise<{ id: string }>;
}

export const generateMetadata = async ({ params }: MetadataProps) => {
	try {
		const { id } = await params;
		const data = await getMovieDetails({ id });
		const title = data.title || data.original_title || "Movie Details";
		const overview = data.overview || "Watch and explore movie details on Moovie.";
		const imageUrl = data.poster_path
			? `${POSTER_URL({ quality: "w500" })}${data.poster_path}`
			: undefined;

		return {
			title,
			description: overview,
			alternates: {
				canonical: `/movie/${id}`,
			},
			openGraph: {
				title,
				description: overview,
				url: `/movie/${id}`,
				images: imageUrl ? [{ url: imageUrl }] : [],
			},
			twitter: {
				title,
				description: overview,
				card: "summary_large_image",
				images: imageUrl ? [{ url: imageUrl }] : [],
			},
		};
	} catch {
		return {
			title: "Movie Details",
			description: "Explore details and reviews on Moovie.",
		};
	}
};

export const generateStaticParams = async () => {
	try {
		const { results } = await getDiscovers({
			genre: "",
			mediaType: "movie",
		});

		if (!results) return [];

		return results.map(({ id }) => ({
			id: id.toString(),
		}));
	} catch {
		return [];
	}
};

const MoviePage = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;

	let data: Awaited<ReturnType<typeof getMovieDetails>> | null = null;
	let credits: Awaited<ReturnType<typeof getMovieCredits>> | null = null;
	let reviews: Awaited<ReturnType<typeof getMovieReviews>> | null = null;
	let similars: Awaited<ReturnType<typeof getSimilarMovies>> | null = null;
	let videos: Awaited<ReturnType<typeof getMovieVideos>> | null = null;

	try {
		[data, credits, reviews, similars, videos] = await Promise.all([
			getMovieDetails({ id }),
			getMovieCredits({ id }),
			getMovieReviews({ id }),
			getSimilarMovies({ id }),
			getMovieVideos({ id }).catch(() => null),
		]);
	} catch {
		notFound();
	}

	if (!data) {
		notFound();
	}

	return (
		<div>
			<Movies id={id} data={data} videos={videos} />
			{credits && <Credits data={credits} />}
			{reviews?.results && reviews.results.length > 0 && <Reviews data={reviews} />}
			{similars && <SimilarItems data={similars} />}
		</div>
	);
};

export default MoviePage;
