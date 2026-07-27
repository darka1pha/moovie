// components/show/likeButton.tsx
"use client";
import { Heart } from "iconsax-react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface FavoriteRow {
	created_at: string;
	id: number;
	item_id: string | null;
	media_type: string | null;
	name: string | null;
	poster_url: string | null;
	rate: string | null;
	user_id: string | null;
}

const LikeButton = ({
	data,
	name,
}: {
	data: FavoriteRow | null;
	name?: string;
}) => {
	const { pending } = useFormStatus();
	const isLiked = Boolean(data);
	const label = isLiked
		? `Remove ${name ?? "this title"} from favorites`
		: `Add ${name ?? "this title"} to favorites`;

	return (
		<Button
			type="submit"
			size="icon"
			variant="outline"
			disabled={pending}
			aria-disabled={pending}
			aria-pressed={isLiked}
			aria-label={label}
			className="hover:scale-110 active:scale-95"
		>
			{pending ? (
				<Spinner size="sm" aria-hidden="true" />
			) : (
				<Heart
					variant={isLiked ? "Bold" : "Outline"}
					size={26}
					color="rgb(239 174 40)"
				/>
			)}
		</Button>
	);
};

export default LikeButton;