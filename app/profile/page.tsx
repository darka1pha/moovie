import AvatarContainer from "@/components/profile/avatarContainer";
import SubmitButton from "@/components/submitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfileAction } from "@/app/actions/profile";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Profile",
	description: "Manage your Moovie profile details.",
};

const Profile = async () => {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) redirect("/auth/sign-in");

	const { data } = await supabase
		.from("profiles")
		.select()
		.eq("id", user.id)
		.maybeSingle();

	const avatarPublicUrl = data?.avatar_url
		? supabase.storage.from("avatars").getPublicUrl(data.avatar_url).data
			.publicUrl
		: "";

	return (
		<div className="p-4 sm:p-8 min-h-[calc(100vh-80px)] max-w-xl mx-auto py-12">
			<div className="bg-balasticSea/60 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
				<div className="border-b border-white/10 pb-4 mb-6">
					<h1 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">Your Profile</h1>
					<p className="text-battleGrey text-sm mt-1">Manage your public information and avatar</p>
				</div>

				<AvatarContainer url={avatarPublicUrl} />

				<form className="flex flex-col mt-8 gap-5" action={updateProfileAction}>
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="email" className="text-battleGrey">Email</Label>
						<Input
							id="email"
							disabled
							value={user.email ?? ""}
							className="bg-black/30 text-neutral-400 border-white/5 cursor-not-allowed"
						/>
						<span className="text-xs text-battleGrey/70">Email cannot be changed directly</span>
					</div>

					<div className="flex flex-col gap-1.5">
						<Label htmlFor="fullname">Full Name</Label>
						<Input
							id="fullname"
							name="fullname"
							defaultValue={data?.full_name ?? ""}
							placeholder="Enter your full name"
						/>
					</div>

					<div className="flex flex-col gap-1.5">
						<Label htmlFor="username">Username</Label>
						<Input
							id="username"
							name="username"
							defaultValue={data?.username ?? ""}
							placeholder="Enter your username"
						/>
					</div>

					<SubmitButton className="mt-4 w-full sm:w-auto self-start px-8">Save Changes</SubmitButton>
				</form>
			</div>
		</div>
	);
};

export default Profile;