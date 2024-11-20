import { AvatarContainer } from "@/components";
import SubmitButton from "@/components/submitButton";
import { updateProfileAction } from "@/lib/services/actions/profile";
import { createClient } from "@/lib/supabase/server";

const Profile = async () => {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data } = await supabase
		.from("profiles")
		.select()
		.eq("id", user?.id!)
		.single();

	const { data: avatarPublicUrl } = supabase.storage
		.from("avatars")
		.getPublicUrl(data?.avatar_url!);
	console.log(avatarPublicUrl);

	return (
		<div className="p-4 min-h-screen">
			<AvatarContainer url={avatarPublicUrl.publicUrl} />
			<form className="flex flex-col mt-4" action={updateProfileAction}>
				<label htmlFor="fullname" className="mb-2 label">
					Full Name
				</label>
				<input
					name="fullname"
					defaultValue={data?.full_name!}
					className="p-2 rounded-md max-w-sm outline-none mb-4 input"
					type="text"
					placeholder="Enter your name..."
				/>
				<label htmlFor="username" className="mb-2 label">
					Username
				</label>
				<input
					name="username"
					defaultValue={data?.username!}
					className="p-2 rounded-md max-w-sm outline-none mb-4 input"
					type="text"
					placeholder="Enter your user name..."
				/>
				<SubmitButton className="bg-fuelYellow p-2 max-w-sm rounded-md text-white">
					Submit
				</SubmitButton>
			</form>
		</div>
	);
};

export default Profile;
