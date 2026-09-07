"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
	Dices,
	X,
	Play,
	RotateCcw,
	Star,
	Sparkles,
	Film,
	Tv,
	SlidersHorizontal,
	Clapperboard,
} from "lucide-react";
import { ListResults } from "@/types";
import { POSTER_URL, BACKDROP_URL } from "@/lib/tmdb/image";
import { spinRoulette, RouletteParams } from "@/app/actions/roulette";

const GENRES = [
	{ id: "", label: "Any Mood", icon: "✨" },
	{ id: "28", label: "Action", icon: "💥" },
	{ id: "878", label: "Sci-Fi", icon: "🚀" },
	{ id: "35", label: "Comedy", icon: "😂" },
	{ id: "53", label: "Thriller", icon: "⚡" },
	{ id: "18", label: "Drama", icon: "🎭" },
	{ id: "27", label: "Horror", icon: "👻" },
	{ id: "16", label: "Animation", icon: "🎨" },
	{ id: "10749", label: "Romance", icon: "💖" },
];

const RATINGS = [
	{ id: "", label: "Any Rating" },
	{ id: "7.0", label: "⭐ 7.0+ (Good)" },
	{ id: "8.0", label: "⭐ 8.0+ (Masterpiece)" },
];

const ERAS = [
	{ id: "all", label: "All Time" },
	{ id: "2020s", label: "2020s (Modern)" },
	{ id: "2010s", label: "2010s" },
	{ id: "2000s", label: "2000s" },
	{ id: "classic", label: "Classics (90s & earlier)" },
];

interface RouletteModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const RouletteModal: React.FC<RouletteModalProps> = ({
	isOpen,
	onClose,
}) => {
	const router = useRouter();
	const [mounted, setMounted] = useState(false);

	const [mediaType, setMediaType] = useState<"movie" | "tv">("movie");
	const [genre, setGenre] = useState("");
	const [minRating, setMinRating] = useState("7.0");
	const [era, setEra] = useState<RouletteParams["era"]>("all");

	const [isRolling, setIsRolling] = useState(false);
	const [rollingText, setRollingText] = useState("Selecting random genre...");
	const [result, setResult] = useState<ListResults | null>(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Lock body scroll
	useEffect(() => {
		if (isOpen) {
			const originalOverflow = document.body.style.overflow;
			document.body.style.overflow = "hidden";
			return () => {
				document.body.style.overflow = originalOverflow;
			};
		}
	}, [isOpen]);

	// Escape key to close
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isOpen && !isRolling) {
				onClose();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, isRolling, onClose]);

	const handleRoll = useCallback(async () => {
		setIsRolling(true);
		setResult(null);

		const rollPhrases = [
			"🎲 Shuffling through top-rated catalog...",
			"🎬 Scanning cinematic gems...",
			"✨ Analyzing ratings and reviews...",
			"🎯 Narrowing down the best match...",
			"🍿 Landing on your surprise pick!",
		];

		let phraseIdx = 0;
		const interval = setInterval(() => {
			phraseIdx = (phraseIdx + 1) % rollPhrases.length;
			setRollingText(rollPhrases[phraseIdx]);
		}, 260);

		try {
			const [pickedShow] = await Promise.all([
				spinRoulette({ mediaType, genre, minRating, era }),
				new Promise((resolve) => setTimeout(resolve, 1200)), // Cinematic tension delay
			]);

			clearInterval(interval);
			setResult(pickedShow);
		} catch (err) {
			clearInterval(interval);
			console.error("Roulette spin error:", err);
		} finally {
			setIsRolling(false);
		}
	}, [mediaType, genre, minRating, era]);

	if (!mounted || !isOpen) return null;

	const modalContent = (
		<div
			role="dialog"
			aria-modal="true"
			aria-label="Movie Roulette"
			className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 animate-fade-in"
		>
			{/* Backdrop Overlay */}
			<div
				className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-opacity"
				onClick={() => {
					if (!isRolling) onClose();
				}}
				aria-hidden="true"
			/>

			{/* Modal Card */}
			<div
				className="relative z-10 w-full max-w-xl rounded-3xl bg-[#121118]/95 border border-white/10 shadow-2xl shadow-black/90 overflow-hidden flex flex-col max-h-[90vh]"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Top Header */}
				<div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
					<div className="flex items-center gap-2.5">
						<div className="p-2 rounded-xl bg-fuelYellow/15 border border-fuelYellow/30 text-fuelYellow">
							<Dices size={20} className={isRolling ? "animate-spin" : ""} />
						</div>
						<div>
							<h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
								<span>Surprise Me</span>
								<span className="text-xs px-2 py-0.5 rounded-full bg-fuelYellow/20 text-fuelYellow font-semibold uppercase tracking-wider">
									Roulette
								</span>
							</h2>
							<p className="text-xs text-neutral-400">
								Indecisive? Let the movie roulette choose for you
							</p>
						</div>
					</div>

					<button
						type="button"
						onClick={onClose}
						disabled={isRolling}
						aria-label="Close"
						className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
					>
						<X size={18} />
					</button>
				</div>

				{/* Body Content */}
				<div className="p-5 sm:p-6 overflow-y-auto space-y-5 scrollbar-thin">
					{!result && !isRolling && (
						<>
							{/* Media Type Toggle */}
							<div>
								<label className="text-xs font-semibold text-neutral-300 mb-2 flex items-center gap-1.5">
									<SlidersHorizontal size={13} className="text-fuelYellow" />
									<span>I want to watch:</span>
								</label>
								<div className="grid grid-cols-2 gap-2">
									<button
										type="button"
										onClick={() => setMediaType("movie")}
										className={`py-2 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
											mediaType === "movie"
												? "bg-fuelYellow text-black border-fuelYellow shadow-md shadow-fuelYellow/20"
												: "bg-white/5 text-neutral-300 border-white/10 hover:border-white/20 hover:text-white"
										}`}
									>
										<Film size={15} />
										<span>A Movie</span>
									</button>
									<button
										type="button"
										onClick={() => setMediaType("tv")}
										className={`py-2 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
											mediaType === "tv"
												? "bg-fuelYellow text-black border-fuelYellow shadow-md shadow-fuelYellow/20"
												: "bg-white/5 text-neutral-300 border-white/10 hover:border-white/20 hover:text-white"
										}`}
									>
										<Tv size={15} />
										<span>A TV Series</span>
									</button>
								</div>
							</div>

							{/* Mood / Genre Filter */}
							<div>
								<label className="text-xs font-semibold text-neutral-300 mb-2 block">
									Mood & Genre:
								</label>
								<div className="flex flex-wrap gap-1.5">
									{GENRES.map((g) => {
										const isSelected = genre === g.id;
										return (
											<button
												key={g.id}
												type="button"
												onClick={() => setGenre(g.id)}
												className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 border transition-all cursor-pointer ${
													isSelected
														? "bg-fuelYellow text-black font-semibold border-fuelYellow shadow-sm shadow-fuelYellow/20 scale-105"
														: "bg-white/5 text-neutral-300 border-white/10 hover:border-white/25 hover:text-white"
												}`}
											>
												<span>{g.icon}</span>
												<span>{g.label}</span>
											</button>
										);
									})}
								</div>
							</div>

							{/* Rating & Era Grid */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<label className="text-xs font-semibold text-neutral-300 mb-2 block">
										Quality Threshold:
									</label>
									<select
										value={minRating}
										onChange={(e) => setMinRating(e.target.value)}
										className="w-full bg-balasticSea border border-white/10 text-neutral-200 text-xs rounded-xl p-2.5 outline-none focus:border-fuelYellow/50 cursor-pointer"
									>
										{RATINGS.map((r) => (
											<option key={r.id} value={r.id} className="bg-[#16151a]">
												{r.label}
											</option>
										))}
									</select>
								</div>

								<div>
									<label className="text-xs font-semibold text-neutral-300 mb-2 block">
										Release Era:
									</label>
									<select
										value={era}
										onChange={(e) => setEra(e.target.value as any)}
										className="w-full bg-balasticSea border border-white/10 text-neutral-200 text-xs rounded-xl p-2.5 outline-none focus:border-fuelYellow/50 cursor-pointer"
									>
										{ERAS.map((e) => (
											<option key={e.id} value={e.id} className="bg-[#16151a]">
												{e.label}
											</option>
										))}
									</select>
								</div>
							</div>
						</>
					)}

					{/* Rolling Animation Stage */}
					{isRolling && (
						<div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
							<div className="relative flex items-center justify-center">
								<div className="w-20 h-20 rounded-full border-4 border-fuelYellow/20 border-t-fuelYellow animate-spin" />
								<Dices size={32} className="absolute text-fuelYellow animate-bounce" />
							</div>
							<div className="space-y-1">
								<p className="text-base font-bold text-white tracking-wide animate-pulse">
									{rollingText}
								</p>
								<p className="text-xs text-neutral-400">
									Rolling with your preferences...
								</p>
							</div>
						</div>
					)}

					{/* Winning Result Card */}
					{result && !isRolling && (
						<div className="space-y-4 animate-fade-in">
							<div className="flex items-center gap-2 text-xs font-bold text-fuelYellow uppercase tracking-wider">
								<Sparkles size={14} />
								<span>Your Tonight Pick is Ready!</span>
							</div>

							<div className="relative rounded-2xl overflow-hidden border border-white/15 bg-balasticSea shadow-2xl flex flex-col sm:flex-row gap-4 p-4">
								{/* Backdrop overlay background */}
								{result.backdrop_path && (
									<div
										aria-hidden="true"
										className="absolute inset-0 bg-cover bg-center opacity-20 blur-md pointer-events-none"
										style={{
											backgroundImage: `url(${BACKDROP_URL({ quality: "w780" })}${result.backdrop_path})`,
										}}
									/>
								)}
								<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 pointer-events-none" />

								{/* Poster */}
								<div className="relative z-10 w-28 sm:w-32 aspect-[2/3] shrink-0 rounded-xl overflow-hidden border border-white/10 shadow-lg mx-auto sm:mx-0">
									{result.poster_path ? (
										<Image
											src={`${POSTER_URL({ quality: "w300" })}${result.poster_path}`}
											alt={result.title || result.name || "Movie Poster"}
											fill
											sizes="128px"
											className="object-cover"
										/>
									) : (
										<div className="w-full h-full flex items-center justify-center bg-white/5 text-neutral-500">
											<Clapperboard size={24} />
										</div>
									)}
								</div>

								{/* Details */}
								<div className="relative z-10 flex-1 flex flex-col justify-between">
									<div>
										<div className="flex items-center gap-2 flex-wrap">
											<span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-fuelYellow/20 text-fuelYellow border border-fuelYellow/30">
												{result.media_type === "tv" ? "TV Series" : "Movie"}
											</span>
											{(result.release_date || result.first_air_date) && (
												<span className="text-xs font-mono text-neutral-300">
													{(result.release_date || result.first_air_date)?.slice(0, 4)}
												</span>
											)}
											{result.vote_average > 0 && (
												<span className="inline-flex items-center gap-1 text-xs font-bold text-fuelYellow">
													<Star size={12} className="fill-fuelYellow text-fuelYellow" />
													<span>{result.vote_average.toFixed(1)}</span>
												</span>
											)}
										</div>

										<h3 className="text-lg sm:text-xl font-bold text-white mt-1.5 line-clamp-2">
											{result.title || result.name}
										</h3>

										{result.overview && (
											<p className="mt-2 text-xs text-neutral-300 line-clamp-3 leading-relaxed">
												{result.overview}
											</p>
										)}
									</div>

									{/* Action Buttons */}
									<div className="flex items-center gap-2.5 mt-4 pt-3 border-t border-white/10">
										<button
											type="button"
											onClick={() => {
												onClose();
												const type = result.media_type === "tv" ? "tv" : "movie";
												router.push(`/${type}/${result.id}`);
											}}
											className="flex-1 py-2 px-4 rounded-xl bg-fuelYellow hover:bg-fuelYellow/90 text-black text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-fuelYellow/20 transition-transform active:scale-95 cursor-pointer"
										>
											<Play size={14} className="fill-black" />
											<span>Watch Details</span>
										</button>

										<button
											type="button"
											onClick={handleRoll}
											aria-label="Spin Again"
											className="py-2 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer active:scale-95"
										>
											<RotateCcw size={14} />
											<span>Re-Roll</span>
										</button>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Bottom Actions Bar */}
				{!result && (
					<div className="px-6 py-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-end gap-3">
						<button
							type="button"
							onClick={onClose}
							disabled={isRolling}
							className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-400 hover:text-white transition-colors"
						>
							Cancel
						</button>

						<button
							type="button"
							onClick={handleRoll}
							disabled={isRolling}
							className="px-6 py-2.5 rounded-xl bg-fuelYellow hover:bg-fuelYellow/90 text-black text-xs font-bold flex items-center gap-2 shadow-lg shadow-fuelYellow/25 hover:shadow-fuelYellow/40 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
						>
							<Dices size={16} className={isRolling ? "animate-spin" : ""} />
							<span>{isRolling ? "Spinning..." : "Roll the Dice 🎲"}</span>
						</button>
					</div>
				)}
			</div>
		</div>
	);

	return createPortal(modalContent, document.body);
};

export default RouletteModal;
