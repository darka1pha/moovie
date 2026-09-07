"use client";

import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { User as UserIcon } from "iconsax-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const Avatar = ({
	avatar_url,
	user,
}: {
	avatar_url: string | null;
	user: User | null;
}) => {
	const [realtimeAvatarUrl, setRealtimeAvatarUrl] = useState<string | null>(null);
	const supabase = useMemo(() => createClient(), []);

	useEffect(() => {
		if (!user?.id) return;

		const channel = supabase
			.channel(`profile_changes_${user.id}`)
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "profiles",
					filter: `id=eq.${user.id}`,
				},
				(payload: { new: { avatar_url?: string } }) => {
					if (payload.new?.avatar_url) {
						const { data: avatarPublicUrl } = supabase.storage
							.from("avatars")
							.getPublicUrl(payload.new.avatar_url);
						setRealtimeAvatarUrl(avatarPublicUrl.publicUrl);
					}
				}
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [supabase, user?.id]);

	const avatarUrl = realtimeAvatarUrl ?? avatar_url;

	return (
		<div className="relative h-10 w-10 rounded-full overflow-hidden flex items-center justify-center bg-balasticSea border-2 border-fuelYellow/60 hover:border-fuelYellow transition-colors shadow-sm">
			{avatarUrl && user ? (
				<Image
					fill
					sizes="40px"
					className="h-full w-full object-cover rounded-full"
					alt={user.email ? `${user.email} avatar` : "User avatar"}
					src={avatarUrl}
				/>
			) : (
				<UserIcon size={20} color="var(--accent-color)" aria-hidden="true" />
			)}
		</div>
	);
};

export default Avatar;
