import { Star1 } from "iconsax-react";
import DetailItem from "./detailItem";
import { favoritesAction } from "@/app/actions/favorites";
import LikeButton from "./likeButton";
import { createClient } from "@/lib/supabase/server";

interface Props {
	name: string;
	overview: string;
	genres: { name: string }[];
	rate: number;
	duration: number;
	mediaType: "movie" | "tv";
	id: string;
	posterUrl: string | null;
}

const Details = async ({
	posterUrl,
	name,
	overview,
	genres,
	rate,
	duration,
	mediaType,
	id,
}: Props) => {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	const { data } = await supabase
		.from("favorites")
		.select("*")
		.eq("item_id", id)
		.single();

	return (
		<div className="flex flex-col flex-1 text-white">
			<div className="flex justify-between">
				<h1 className=" text-2xl font-bold">{name}</h1>
				{user && (
					<form action={favoritesAction}>
						<input type="hidden" name="name" value={name} />
						<input type="hidden" name="rate" value={rate} />
						<input type="hidden" name="itemId" value={id} />
						<input type="hidden" name="mediaType" value={mediaType} />
						<input type="hidden" name="posterUrl" value={posterUrl || ""} />
						<input
							type="hidden"
							name="liked"
							value={data ? "liked" : "not-liked"}
						/>
						<LikeButton data={data} />
					</form>
				)}
			</div>
			<div className="flex flex-wrap mt-5">
				<DetailItem name={"Rate"}>
					<div className="flex items-center">
						<Star1 className="text-fuelYellow" size={18} />
						<p className="text-white text-sm ml-2">{rate.toFixed(1)}</p>
					</div>
				</DetailItem>
				<DetailItem name={"Duration"}>
					<p className=" text-sm ml-2">{`${duration} Minutes`}</p>
				</DetailItem>
				<DetailItem name={"Genres"}>
					<p className=" text-sm ml-2">
						{genres.map(({ name }) => name).join(", ")}
					</p>
				</DetailItem>
			</div>
			<div className="mt-5 ml-2">
				<p className="leading-7">{overview}</p>
			</div>
		</div>
	);
};

export default Details;
