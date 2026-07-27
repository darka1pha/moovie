import { POSTER_URL } from "@/app/actions/urls";
import { Cast } from "@/types";
import { Profile } from "iconsax-react";
import Image from "next/image";

const CastItem = (cast: Cast) => {
	const { character, name, profile_path } = cast;
	return (
		<div className="w-40 h-[270px] bg-balasticSea/50 mx-auto flex rounded-xl overflow-hidden flex-col backdrop-blur-lg transition-transform duration-300 ease-out hover:scale-105">
			<div className="h-44 w-full flex items-center justify-center bg-balasticSea/80">
				{profile_path ? (
					<Image
						className="object-cover w-full h-full"
						src={POSTER_URL({ quality: "w300" }) + profile_path}
						height={200}
						width={112}
						alt=""
					/>
				) : (
					<Profile size={48} color="rgb(132 132 133)" aria-hidden="true" />
				)}
			</div>
			<div className="p-2">
				<p className="text-white text-sm">{name}</p>
				<p className="text-battleGrey text-xs mt-2">{character}</p>
			</div>
		</div>
	);
};
export default CastItem;