// app/actions/profile/index.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const updateProfileAction = async (formData: FormData) => {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error("You must be signed in to update your profile.");
	}

	const fullName = formData.get("fullname") as string;
	const username = formData.get("username") as string;

	const { error } = await supabase
		.from("profiles")
		.update({
			full_name: fullName,
			username,
			updated_at: new Date().toISOString(),
		})
		.eq("id", user.id);

	if (error) console.error("Failed to update profile:", error);

	revalidatePath("/profile");
};