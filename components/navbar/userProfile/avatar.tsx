"use client";

import { Database, Tables } from "@/types/supabase";
import {
	User,
	createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { User as UserIcon } from "iconsax-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Avatar = ({
	avatar_url,
	user,
}: {
	avatar_url: string | null;
	user: User | null;
}) => {
	const [avatarUrl, setAvatarUrl] = useState(avatar_url);
	const supabase = createClientComponentClient<Database>();
	const router = useRouter();
	useEffect(() => {
		const channel = supabase
			.channel("profile_changes")
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "profiles",
				},
				(data: any) => {
					const { data: avatarPublicUrl } = supabase.storage
						.from("avatars")
						.getPublicUrl(data.new.avatar_url!);
					setAvatarUrl(avatarPublicUrl.publicUrl);
				}
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [supabase, router]);

	return (
		<label
			tabIndex={0}
			className="btn h-12 w-12 m-1 rounded-full overflow-hidden flex items-center justify-center"
		>
			{avatarUrl && user ? (
				<Image
					fill
					className="h-full w-full object-cover rounded-full border-2 border-fuelYellow"
					alt="avatar"
					src={avatarUrl}
				/>
			) : (
				<UserIcon color="rgb(239 174 40)" />
			)}
		</label>
	);
};

export default Avatar;
