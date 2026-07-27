// app/actions/favorites/index.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const favoritesAction = async (formData: FormData) => {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error("You must be signed in to favorite items.");
	}

	const itemId = formData.get("itemId") as string;
	const mediaType = formData.get("mediaType") as string;
	const name = formData.get("name") as string;
	const rate = formData.get("rate") as string;
	const posterUrl = formData.get("posterUrl") as string;
	const liked = formData.get("liked") as string;

	if (liked !== "liked") {
		const { error } = await supabase.from("favorites").insert({
			media_type: mediaType,
			item_id: itemId,
			name,
			poster_url: posterUrl,
			rate,
			created_at: new Date().toISOString(),
			user_id: user.id,
		});
		if (error) console.error("Failed to add favorite:", error);
	} else {
		const { error } = await supabase
			.from("favorites")
			.delete()
			.eq("item_id", itemId)
			.eq("user_id", user.id);
		if (error) console.error("Failed to remove favorite:", error);
	}

	revalidatePath(`/${mediaType}/${itemId}`);
};