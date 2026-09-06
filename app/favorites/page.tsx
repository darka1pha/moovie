import ItemsCard from "@/components/items/itemsCard";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Heart } from "iconsax-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Favorites",
	description: "Your saved movies and TV shows on Moovie.",
};

const Favorites = async () => {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) redirect("/auth/sign-in");

	const { data } = await supabase
		.from("favorites")
		.select("*")
		.eq("user_id", user.id)
		.order("created_at", { ascending: false });

	const hasFavorites = data && data.length > 0;

	return (
		<div className="min-h-[calc(100vh-80px)] paddings max-w-7xl mx-auto">
			<div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
				<div>
					<h1 className="font-bold text-white text-3xl sm:text-4xl tracking-tight">Your Favorites</h1>
					<p className="text-battleGrey text-sm mt-1">
						{hasFavorites ? `${data.length} saved title${data.length > 1 ? "s" : ""}` : "No saved titles"}
					</p>
				</div>
			</div>

			{hasFavorites ? (
				<div className="flex flex-wrap justify-center sm:justify-start gap-4">
					{data.map(({ id, item_id, media_type, name, rate, poster_url }) => (
						<ItemsCard
							key={id}
							original_title={name ?? "Untitled"}
							poster_path={poster_url}
							vote_average={Number(rate) || 0}
							id={Number(item_id) || 0}
							media={media_type ?? "movie"}
							margin="m-0"
						/>
					))}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center py-20 text-center">
					<div className="w-16 h-16 rounded-2xl bg-fuelYellow/10 border border-fuelYellow/30 flex items-center justify-center mb-4 text-fuelYellow">
						<Heart size={32} aria-hidden="true" />
					</div>
					<h2 className="text-xl font-bold text-white mb-2">No favorites yet</h2>
					<p className="text-battleGrey text-sm max-w-sm mb-6 leading-relaxed">
						Click the heart icon on any movie or TV series page to save it to your personal favorites collection.
					</p>
					<Link
						href="/"
						className="inline-flex items-center justify-center bg-fuelYellow text-black font-semibold text-xs sm:text-sm rounded-xl py-2.5 px-6 hover:bg-fuelYellow/90 active:scale-95 transition-all shadow-md"
					>
						Explore Titles
					</Link>
				</div>
			)}
		</div>
	);
};

export default Favorites;