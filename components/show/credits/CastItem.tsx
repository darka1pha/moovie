import { POSTER_URL } from "@/lib/tmdb/image";
import { Cast } from "@/types";
import { User, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props extends Cast {
	index?: number;
}

const CastItem = ({ id, character, name, profile_path, index }: Props) => {
	const initials = name
		? name
				.split(" ")
				.map((n) => n[0])
				.slice(0, 2)
				.join("")
				.toUpperCase()
		: "?";

	const isTopBilled = typeof index === "number" && index < 3;

	const content = (
		<div className="w-36 sm:w-44 flex-shrink-0 group flex flex-col rounded-2xl bg-gradient-to-b from-[#1b1a22]/90 to-[#121117] border border-white/10 hover:border-fuelYellow/50 overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-fuelYellow/10 cursor-pointer">
			{/* Portrait Container */}
			<div className="relative aspect-[3/4] w-full overflow-hidden bg-[#16151a]">
				{profile_path ? (
					<>
						<Image
							fill
							sizes="(max-width: 640px) 144px, 176px"
							className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
							src={POSTER_URL({ quality: "w300" }) + profile_path}
							alt={name}
						/>
						{/* Subtle gradient vignette at bottom */}
						<div className="absolute inset-0 bg-gradient-to-t from-[#121117] via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-300" />
					</>
				) : (
					<div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-white/5 to-white/[0.02] p-4 text-center">
						<div className="w-14 h-14 rounded-full bg-fuelYellow/10 border border-fuelYellow/20 flex items-center justify-center text-fuelYellow font-bold text-base mb-2 shadow-inner">
							{initials}
						</div>
						<User size={18} className="text-neutral-500" aria-hidden="true" />
					</div>
				)}

				{/* Top Billed Badge */}
				{isTopBilled && (
					<div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-lg flex items-center gap-1 text-[10px] font-bold text-fuelYellow border border-fuelYellow/30 shadow-md">
						<Sparkles size={10} aria-hidden="true" />
						<span>Lead</span>
					</div>
				)}
			</div>

			{/* Cast Details */}
			<div className="p-3.5 flex flex-col justify-between flex-grow">
				<div>
					<p className="text-white font-bold text-sm line-clamp-1 group-hover:text-fuelYellow transition-colors">
						{name}
					</p>
					<p className="text-neutral-400 text-xs mt-1.5 line-clamp-1 flex items-center gap-1.5">
						<span className="text-fuelYellow/80 font-semibold text-[10px] uppercase tracking-wider">as</span>
						<span className="text-neutral-300 font-medium truncate" title={character}>
							{character || "Self"}
						</span>
					</p>
				</div>
			</div>
		</div>
	);

	if (id) {
		return (
			<Link
				href={`/person/${id}`}
				className="block flex-shrink-0 outline-none transition-transform active:scale-95"
				aria-label={`View ${name}'s filmography`}
			>
				{content}
			</Link>
		);
	}

	return content;
};

export default CastItem;