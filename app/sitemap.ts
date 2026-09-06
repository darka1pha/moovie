import { getDiscovers } from "@/app/actions/home";

const URL = "https://moovie.darkalpha.ir";

export default async function sitemap() {
	let movies: any[] = [];
	let tvs: any[] = [];

	try {
		const moviesRes = await getDiscovers({
			genre: "",
			mediaType: "movie",
		});
		movies = moviesRes?.results || [];
	} catch {
		movies = [];
	}

	try {
		const tvsRes = await getDiscovers({
			genre: "",
			mediaType: "tv",
		});
		tvs = tvsRes?.results || [];
	} catch {
		tvs = [];
	}

	const posts = [
		...movies.map(({ id }) => ({
			url: `${URL}/movie/${id}`,
			lastModified: new Date().toISOString(),
		})),
		...tvs.map(({ id }) => ({
			url: `${URL}/tv/${id}`,
			lastModified: new Date().toISOString(),
		})),
	];

	const routes = [""].map((route) => ({
		url: `${URL}${route}`,
		lastModified: new Date().toISOString(),
	}));

	return [...routes, ...posts];
}
