// components/navbar/userProfile/index.tsx
import Link from "next/link";
import { LogOut, Heart, User as UserIcon } from "lucide-react";
import { signOutAction } from "@/app/actions/auth/sign-out";
import { createClient } from "@/lib/supabase/server";
import Avatar from "./avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserProfile = async () => {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data } = user
		? await supabase.from("profiles").select().eq("id", user.id).maybeSingle()
		: { data: null };

	const avatarPublicUrl = data?.avatar_url
		? supabase.storage.from("avatars").getPublicUrl(data.avatar_url).data
			.publicUrl
		: null;

	if (!user) {
		return (
			<Link
				href="/auth/sign-in"
				className="text-fuelYellow text-sm font-medium hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow rounded-md px-2 py-1"
			>
				Sign in
			</Link>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className="rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow"
				aria-label="Open user menu"
			>
				<Avatar user={user} avatar_url={avatarPublicUrl} />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-48">
				<DropdownMenuItem asChild>
					<Link href="/profile" className="flex items-center w-full cursor-pointer">
						<UserIcon size={16} className="mr-2" aria-hidden="true" />
						<span>Profile</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href="/favorites" className="flex items-center w-full cursor-pointer">
						<Heart size={16} className="mr-2" aria-hidden="true" />
						<span>Favorites</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<form action={signOutAction}>
					<DropdownMenuItem asChild variant="destructive">
						<button type="submit" className="flex items-center w-full cursor-pointer">
							<LogOut size={16} className="mr-2" aria-hidden="true" />
							<span>Logout</span>
						</button>
					</DropdownMenuItem>
				</form>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserProfile;