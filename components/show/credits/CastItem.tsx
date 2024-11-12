import { POSTER_URL } from "@/app/actions/urls";
import { Cast } from "@/types";
import Image from "next/image";

const CastItem = (cast: Cast) => {
	const { character, name, orginal_name, profile_path } = cast;
	return (
		<div className="w-40 h-[270px] bg-balasticSea/50 mx-auto flex rounded-xl  overflow-hidden flex-col backdrop-blur-lg">
			<div className="h-44 w-full">
				<Image
					className="object-cover w-full h-full"
					src={POSTER_URL({ quality: "w300" }) + profile_path}
					height={200}
					width={112}
					alt={name}
				/>
			</div>
			<div className="p-2">
				<p className="text-white text-sm">{name}</p>
				<p className="text-battleGrey text-xs mt-2">{character}</p>
			</div>
		</div>
	);
};
export default CastItem;
