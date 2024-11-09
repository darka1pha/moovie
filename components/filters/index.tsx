"use client";
import { genre } from "@/types";
import FilterSelect from "./filterSelect";
import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import updateSearchParams from "@/lib/updateSearchParams";
import { useRouter } from "next/navigation";

interface Props {
	genreData: genre[];
}

const mediaType = ["movie", "tv"];

const Filters = ({ genreData }: Props) => {
	const genres = genreData.map(({ name }) => name);
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	const [selectedGenre, setSelectedGenre] = useState(
		searchParams.get("genre") ?? "all"
	);
	const [selectedMedia, setSelectedMedia] = useState(
		searchParams.get("mediaType") ?? "movie"
	);

	const onFilterChange = (value: string, type: "media_type" | "genre") => {
		if (type === "media_type") {
			setSelectedMedia(value);
			router.push(
				updateSearchParams({
					pathname,
					searchParams,
					params: [{ key: "genre", value: "" }],
				}),
				{ scroll: false }
			);
			setSelectedGenre("all");
		} else {
			setSelectedGenre(value);
		}
		router.push(
			updateSearchParams({
				pathname,
				searchParams,
				params: [
					{ key: type, value },
					{ key: "page", value: "" },
				],
			}),
			{ scroll: false }
		);
	};

	return (
		<div className="paddings flex overflow-y-auto">
			<FilterSelect
				title="Media Type"
				name="media_type"
				data={mediaType}
				onChange={onFilterChange}
				value={selectedMedia}
			/>
			<FilterSelect
				title="Genre"
				className="ml-4"
				name="genre"
				data={["All", ...genres]}
				onChange={onFilterChange}
				value={selectedGenre}
			/>
		</div>
	);
};

export default Filters;
