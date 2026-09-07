import { POSTER_URL } from "@/lib/tmdb/image";
import { Star1 } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
	poster_path: string | null;
	original_title?: string | null;
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
	media = "movie",
}: Props) => {
	const displayTitle = original_title || "Untitled";
	const rating = typeof vote_average === "number" ? vote_average.toFixed(1) : "N/A";
	const targetHref = `/${media || "movie"}/${id}`;

	return (
		<Link
			scroll={true}
			prefetch={true}
			href={targetHref}
			aria-label={`View details for ${displayTitle}, rated ${rating} out of 10`}
			className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow rounded-2xl animate-fade-in block"
		>
			<div
				className={`${
					margin ?? "m-5"
				} w-64 h-96 bg-[#16151a] border border-white/5 hover:border-fuelYellow/50 group cursor-pointer rounded-2xl overflow-hidden relative transition-all duration-300 ease-out hover:scale-[1.03] hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-fuelYellow/15`}
			>
				{/* Floating Top Rating Badge */}
				<div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center text-xs font-semibold text-fuelYellow border border-white/10 z-10 shadow-md">
					<Star1 size={13} className="mr-1" color="var(--accent-color)" aria-hidden="true" />
					<span>{rating}</span>
				</div>

				{poster_path ? (
					<Image
						quality={80}
						height={384}
						width={256}
						sizes="256px"
						className="object-cover h-full w-full transition-transform duration-500 ease-out group-hover:scale-108"
						src={POSTER_URL({ quality: "w300" }) + poster_path}
						alt={displayTitle}
					/>
				) : (
					<div className="h-full w-full flex items-center justify-center bg-[#16151a] text-battleGrey text-sm px-4 text-center">
						No image available
					</div>
				)}

				{/* Bottom sliding info drawer */}
				<div className="absolute p-4 backdrop-blur-xl bg-black/75 border-t border-white/10 -bottom-full right-0 h-fit w-full transition-all ease-in-out group-hover:bottom-0 group-focus-within:bottom-0 duration-300">
					<p className="text-white text-sm font-semibold line-clamp-1">{displayTitle}</p>
					<div className="flex items-center justify-between mt-2">
						<span className="text-[11px] text-neutral-400 capitalize">{media}</span>
						<div className="bg-fuelYellow px-2 py-0.5 rounded-md flex items-center text-xs text-black font-bold">
							<Star1 size={12} className="mr-1" color="black" aria-hidden="true" />
							<span>{rating}</span>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default ItemsCard;