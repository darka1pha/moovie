import { AvatarContainer } from "@/components";
import SubmitButton from "@/components/submitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfileAction } from "@/app/actions/profile";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

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
		<div className="p-4 min-h-[calc(100vh-80px)] max-w-lg mx-auto">
			<h1 className="text-white text-2xl font-bold mb-6">Your Profile</h1>
			<AvatarContainer url={avatarPublicUrl} />
			<form className="flex flex-col mt-6 gap-4" action={updateProfileAction}>
				<div className="flex flex-col gap-2">
					<Label htmlFor="fullname">Full Name</Label>
					<Input
						id="fullname"
						name="fullname"
						defaultValue={data?.full_name ?? ""}
						placeholder="Enter your name..."
					/>
				</div>
				<div className="flex flex-col gap-2">
					<Label htmlFor="username">Username</Label>
					<Input
						id="username"
						name="username"
						defaultValue={data?.username ?? ""}
						placeholder="Enter your user name..."
					/>
				</div>
				<SubmitButton className="mt-2 max-w-sm">Submit</SubmitButton>
			</form>
		</div>
	);
};

export default Profile;