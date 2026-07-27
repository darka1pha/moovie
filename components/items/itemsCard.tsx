// components/items/itemsCard.tsx
"use client";
import { POSTER_URL } from "@/app/actions/urls";
import { Star1 } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Props {
	poster_path: string;
	original_title: string;
	vote_average: number;
	id: number;
	margin?: string;
	media?: string;
}

const ItemsCard = ({
	poster_path,
	original_title,
	vote_average,
	id,
	margin,
	media,
}: Props) => {
	const searchParams = useSearchParams();
	const mediaType =
		media ?? searchParams.get("media_type")?.toLocaleLowerCase();

	return (
		<Link
			scroll={true}
			prefetch={true}
			href={`/${!mediaType ? "movie" : mediaType}/${id}`}
			aria-label={`View details for ${original_title}, rated ${vote_average?.toFixed(1) ?? "N/A"} out of 10`}
			className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow rounded-2xl"
		>
			<div
				className={`${margin ?? "m-5"
					} w-64 h-96 bg-balasticSea group cursor-pointer rounded-2xl overflow-hidden relative transition-transform duration-300 ease-out hover:scale-[1.02]`}
			>
				{poster_path ? (
					<Image
						quality={65}
						decoding="sync"
						height={384}
						width={256}
						sizes="256px"
						className="object-cover h-full w-full transition-transform duration-500 ease-out group-hover:scale-105"
						src={POSTER_URL({ quality: "w300" }) + poster_path}
						alt={original_title}
					/>
				) : (
					<div className="h-full w-full flex items-center justify-center bg-balasticSea text-battleGrey text-sm px-4 text-center">
						No image available
					</div>
				)}
				<div className="absolute p-3 backdrop-blur-sm bg-black/50 -bottom-full right-0 h-fit w-full transition-all ease-in-out group-hover:bottom-0 group-focus-within:bottom-0 duration-500">
					<p className="text-white text-sm">{original_title}</p>
					<div className="flex mt-2">
						<div className="bg-fuelYellow p-2 mr-2 w-fit rounded-xl flex items-center text-xs text-white text-center justify-center">
							<Star1 size={15} className="mr-1" color="white" aria-hidden="true" />
							<p className="leading-3">{vote_average?.toFixed(1) ?? "N/A"}</p>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default ItemsCard;