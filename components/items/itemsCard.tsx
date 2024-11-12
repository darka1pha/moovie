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
		>
			<div
				className={`${
					margin ?? "m-5"
				} w-64 h-96 bg-balasticSea group cursor-pointer rounded-2xl overflow-hidden relative`}
			>
				<Image
					quality={65}
					decoding="sync"
					height={384}
					width={256}
					className="object-cover h-full w-full"
					src={POSTER_URL({ quality: "w300" }) + poster_path}
					alt={original_title}
				/>
				<div className="absolute p-3 backdrop-blur-sm bg-black/50 -bottom-full right-0 h-fit w-full transition-all ease-in-out group-hover:bottom-0 duration-500">
					<p className="text-white text-sm">{original_title}</p>
					<div className="flex mt-2">
						<div className="bg-fuelYellow p-2 mr-2 w-fit rounded-xl flex items-center text-xs text-white text-center justify-center">
							<Star1 size={15} className="mr-1" color="white" />
							<p className="leading-3">{vote_average?.toFixed(1)}</p>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default ItemsCard;
