"use client";
import Image from "next/image";
import Details from "./details";
import { TvDetails } from "@/types";
import { BACKDROP_URL, POSTER_URL } from "@/app/actions/urls";
import { motion } from "motion/react";

const Tvs = ({ data, id }: { data: TvDetails; id: string }) => {
	const {
		backdrop_path,
		original_name,
		poster_path,
		overview,
		genres,
		vote_average,
		episode_run_time,
	} = data;

	return (
		<div className="flex flex-col relative p-8 md:p-16">
			<div
				aria-hidden="true"
				className="bg-no-repeat bg-cover bg-center will-change-scroll absolute top-0 left-0 h-full w-full"
				style={{
					backgroundImage: backdrop_path
						? `url(${BACKDROP_URL({ quality: "w780" })}${backdrop_path})`
						: undefined,
				}}
			/>
			<div className="h-full absolute w-full z-0 top-0 right-0 backdrop-blur-sm bg-black/40" />
			<div className="z-10 flex flex-col items-center md:flex-row">
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: "easeOut" }}
					className="md:h-[560px] h-auto max-h-[560px] max-w-[416px] w-[100%] md:w-[416px] rounded-xl border-battleGrey border-[2px] mb-10 md:mb-0 md:mr-10 overflow-hidden"
				>
					{poster_path ? (
						<Image
							src={`${POSTER_URL({ quality: "w500" })}${poster_path}`}
							alt={original_name}
							width={360}
							height={480}
							priority
							className="object-cover h-full w-full"
						/>
					) : (
						<div className="h-full w-full flex items-center justify-center bg-balasticSea text-battleGrey">
							No poster available
						</div>
					)}
				</motion.div>
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
					className="flex-1 w-full"
				>
					<Details
						posterUrl={poster_path}
						id={id}
						mediaType="tv"
						rate={vote_average}
						name={original_name}
						overview={overview}
						genres={genres}
						duration={episode_run_time?.[0]}
					/>
				</motion.div>
			</div>
		</div>
	);
};

export default Tvs;