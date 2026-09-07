"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
	User,
	Calendar,
	MapPin,
	Star,
	Film,
	Tv,
	ExternalLink,
	ChevronDown,
	ChevronUp,
	Award,
	Clapperboard,
} from "lucide-react";
import { PersonDetails, PersonCombinedCredits, PersonCreditItem } from "@/types";
import { POSTER_URL, getPosterUrl } from "@/lib/tmdb/image";

interface PersonViewProps {
	person: PersonDetails;
	credits: PersonCombinedCredits;
}

type FilterTab = "all" | "movie" | "tv" | "crew";

export const PersonView: React.FC<PersonViewProps> = ({ person, credits }) => {
	const [activeTab, setActiveTab] = useState<FilterTab>("all");
	const [isBioExpanded, setIsBioExpanded] = useState(false);
	const [sortBy, setSortBy] = useState<"date" | "rating" | "popularity">("date");

	// Deduplicate credits by ID + media_type
	const castCredits = useMemo(() => {
		const seen = new Set<string>();
		return (credits.cast || []).filter((item) => {
			const key = `${item.media_type}-${item.id}`;
			if (seen.has(key)) return false;
			seen.add(key);
			return Boolean(item.title || item.name);
		});
	}, [credits.cast]);

	const crewCredits = useMemo(() => {
		const seen = new Set<string>();
		return (credits.crew || []).filter((item) => {
			const key = `${item.media_type}-${item.id}-${item.job || item.department}`;
			if (seen.has(key)) return false;
			seen.add(key);
			return Boolean(item.title || item.name);
		});
	}, [credits.crew]);

	// Filter based on activeTab
	const filteredCredits = useMemo(() => {
		let list: PersonCreditItem[] = [];

		if (activeTab === "crew") {
			list = [...crewCredits];
		} else if (activeTab === "movie") {
			list = castCredits.filter((item) => item.media_type === "movie");
		} else if (activeTab === "tv") {
			list = castCredits.filter((item) => item.media_type === "tv");
		} else {
			list = [...castCredits];
		}

		// Sort
		return list.sort((a, b) => {
			if (sortBy === "rating") {
				return (b.vote_average || 0) - (a.vote_average || 0);
			}
			if (sortBy === "popularity") {
				return (b.popularity || 0) - (a.popularity || 0);
			}
			// Default: date descending
			const dateA = a.release_date || a.first_air_date || "";
			const dateB = b.release_date || b.first_air_date || "";
			if (!dateA) return -1;
			if (!dateB) return 1;
			return dateB.localeCompare(dateA);
		});
	}, [castCredits, crewCredits, activeTab, sortBy]);

	// Compute Age
	const ageInfo = useMemo(() => {
		if (!person.birthday) return null;
		const birth = new Date(person.birthday);
		const end = person.deathday ? new Date(person.deathday) : new Date();
		let age = end.getFullYear() - birth.getFullYear();
		const m = end.getMonth() - birth.getMonth();
		if (m < 0 || (m === 0 && end.getDate() < birth.getDate())) {
			age--;
		}
		return {
			formattedBirth: birth.toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
				year: "numeric",
			}),
			age,
			isDeceased: Boolean(person.deathday),
		};
	}, [person.birthday, person.deathday]);

	const headshotUrl = person.profile_path
		? POSTER_URL({ quality: "w500" }) + person.profile_path
		: null;

	const movieCount = useMemo(
		() => castCredits.filter((c) => c.media_type === "movie").length,
		[castCredits]
	);
	const tvCount = useMemo(
		() => castCredits.filter((c) => c.media_type === "tv").length,
		[castCredits]
	);

	return (
		<div className="min-h-screen text-white pb-20">
			{/* Hero / Header Section */}
			<div className="relative p-6 sm:p-10 md:p-14 overflow-hidden border-b border-white/5 bg-gradient-to-b from-[#131219] via-[#0d0c11] to-[#0d0c11]">
				<div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-12 items-center md:items-start relative z-10">
					{/* Portrait Headshot */}
					<div className="w-56 sm:w-64 md:w-72 shrink-0 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl bg-balasticSea relative group">
						{headshotUrl ? (
							<Image
								src={headshotUrl}
								alt={person.name}
								fill
								priority
								sizes="(max-width: 768px) 224px, 288px"
								className="object-cover group-hover:scale-105 transition-transform duration-500"
							/>
						) : (
							<div className="w-full h-full flex flex-col items-center justify-center bg-white/5 text-neutral-500">
								<User size={64} />
							</div>
						)}
					</div>

					{/* Bio & Details */}
					<div className="flex-1 w-full flex flex-col">
						<div className="flex items-center gap-2.5 flex-wrap">
							<span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-fuelYellow bg-fuelYellow/10 rounded-full border border-fuelYellow/30">
								{person.known_for_department || "Artist"}
							</span>
							{person.imdb_id && (
								<a
									href={`https://www.imdb.com/name/${person.imdb_id}`}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-amber-400 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 rounded-full transition-colors"
								>
									<span>IMDb Profile</span>
									<ExternalLink size={11} />
								</a>
							)}
						</div>

						<h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mt-3">
							{person.name}
						</h1>

						{/* Quick Meta Info Badges */}
						<div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-neutral-300">
							{ageInfo && (
								<div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
									<Calendar size={14} className="text-fuelYellow" />
									<span>
										{ageInfo.formattedBirth} ({ageInfo.age} years old
										{ageInfo.isDeceased ? ", deceased" : ""})
									</span>
								</div>
							)}

							{person.place_of_birth && (
								<div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
									<MapPin size={14} className="text-fuelYellow" />
									<span>{person.place_of_birth}</span>
								</div>
							)}
						</div>

						{/* Career Quick Stats */}
						<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
							<div className="p-3 rounded-xl bg-balasticSea/60 border border-white/10 text-center">
								<span className="text-xs text-neutral-400">Total Credits</span>
								<p className="text-lg font-bold text-white mt-0.5">
									{castCredits.length + crewCredits.length}
								</p>
							</div>
							<div className="p-3 rounded-xl bg-balasticSea/60 border border-white/10 text-center">
								<span className="text-xs text-neutral-400">Movies</span>
								<p className="text-lg font-bold text-fuelYellow mt-0.5">{movieCount}</p>
							</div>
							<div className="p-3 rounded-xl bg-balasticSea/60 border border-white/10 text-center">
								<span className="text-xs text-neutral-400">TV Shows</span>
								<p className="text-lg font-bold text-purple-400 mt-0.5">{tvCount}</p>
							</div>
							<div className="p-3 rounded-xl bg-balasticSea/60 border border-white/10 text-center">
								<span className="text-xs text-neutral-400">Crew Roles</span>
								<p className="text-lg font-bold text-neutral-300 mt-0.5">
									{crewCredits.length}
								</p>
							</div>
						</div>

						{/* Biography */}
						{person.biography && (
							<div className="mt-6">
								<h2 className="text-base font-bold text-white mb-2">Biography</h2>
								<div
									className={`text-sm text-neutral-300 leading-relaxed max-w-4xl relative ${
										!isBioExpanded ? "line-clamp-4" : ""
									}`}
								>
									{person.biography.split("\n\n").map((para, idx) => (
										<p key={idx} className="mb-2">
											{para}
										</p>
									))}
								</div>
								{person.biography.length > 300 && (
									<button
										type="button"
										onClick={() => setIsBioExpanded(!isBioExpanded)}
										className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-fuelYellow hover:underline cursor-pointer"
									>
										<span>{isBioExpanded ? "Read Less" : "Read Full Biography"}</span>
										{isBioExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
									</button>
								)}
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Filmography Section */}
			<div className="max-w-7xl mx-auto px-6 sm:px-10 mt-10">
				{/* Bar with Filter Tabs and Sorting */}
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
					{/* Category Tabs */}
					<div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
						{(
							[
								{ id: "all", label: "All Roles", count: castCredits.length },
								{ id: "movie", label: "Movies", count: movieCount },
								{ id: "tv", label: "TV Shows", count: tvCount },
								...(crewCredits.length > 0
									? [{ id: "crew", label: "Crew", count: crewCredits.length }]
									: []),
							] as const
						).map((tab) => {
							const isActive = activeTab === tab.id;
							return (
								<button
									key={tab.id}
									type="button"
									onClick={() => setActiveTab(tab.id as FilterTab)}
									className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer select-none whitespace-nowrap ${
										isActive
											? "bg-fuelYellow text-black font-bold shadow-md shadow-fuelYellow/20"
											: "bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10"
									}`}
								>
									<span>{tab.label}</span>
									<span
										className={`text-[10px] px-1.5 py-0.2 rounded-full ${
											isActive ? "bg-black/20 text-black font-bold" : "bg-white/10 text-neutral-400"
										}`}
									>
										{tab.count}
									</span>
								</button>
							);
						})}
					</div>

					{/* Sorting Dropdown */}
					<div className="flex items-center gap-2 text-xs text-neutral-400">
						<span>Sort by:</span>
						<select
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value as any)}
							aria-label="Sort Filmography"
							className="bg-balasticSea border border-white/10 text-neutral-200 rounded-lg px-2.5 py-1 text-xs outline-none focus:border-fuelYellow/50 cursor-pointer"
						>
							<option value="date" className="bg-[#16151a]">Release Date</option>
							<option value="rating" className="bg-[#16151a]">Rating (Highest)</option>
							<option value="popularity" className="bg-[#16151a]">Popularity</option>
						</select>
					</div>
				</div>

				{/* Filmography Cards Grid */}
				{filteredCredits.length > 0 ? (
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 mt-8">
						{filteredCredits.map((item, index) => {
							const title = item.title || item.name || "Untitled";
							const mediaType = item.media_type === "tv" ? "tv" : "movie";
							const year = (item.release_date || item.first_air_date)?.slice(0, 4);
							const poster = getPosterUrl(item.poster_path, "w300");
							const role = item.character || item.job || item.department;

							return (
								<Link
									key={`${mediaType}-${item.id}-${index}`}
									href={`/${mediaType}/${item.id}`}
									className="group flex flex-col rounded-2xl bg-[#14131b] border border-white/10 hover:border-fuelYellow/50 overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-fuelYellow/10"
								>
									{/* Poster */}
									<div className="relative aspect-[2/3] w-full overflow-hidden bg-[#16151a]">
										{poster ? (
											<Image
												src={poster}
												alt={title}
												fill
												sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
												className="object-cover group-hover:scale-105 transition-transform duration-500"
											/>
										) : (
											<div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-neutral-500 bg-white/5">
												{mediaType === "tv" ? <Tv size={28} /> : <Film size={28} />}
											</div>
										)}

										{/* Rating Badge */}
										{item.vote_average > 0 && (
											<div className="absolute top-2 right-2 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-lg flex items-center gap-1 text-[11px] font-bold text-fuelYellow border border-fuelYellow/30">
												<Star size={10} fill="currentColor" className="text-fuelYellow" />
												<span>{item.vote_average.toFixed(1)}</span>
											</div>
										)}

										{/* Media Badge */}
										<div className="absolute top-2 left-2">
											<span
												className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${
													mediaType === "tv"
														? "bg-purple-500/20 text-purple-300 border-purple-500/30"
														: "bg-fuelYellow/20 text-fuelYellow border-fuelYellow/30"
												}`}
											>
												{mediaType === "tv" ? "TV" : "Movie"}
											</span>
										</div>
									</div>

									{/* Metadata */}
									<div className="p-3.5 flex flex-col justify-between flex-1">
										<div>
											<h3 className="text-white font-bold text-sm line-clamp-1 group-hover:text-fuelYellow transition-colors">
												{title}
											</h3>
											{role && (
												<p className="text-neutral-400 text-xs mt-1 line-clamp-1">
													<span className="text-fuelYellow/70 text-[10px] uppercase font-semibold">
														as{" "}
													</span>
													<span className="text-neutral-300">{role}</span>
												</p>
											)}
										</div>

										<div className="flex items-center justify-between mt-3 text-xs text-neutral-400 font-mono">
											<span>{year || "TBA"}</span>
										</div>
									</div>
								</Link>
							);
						})}
					</div>
				) : (
					<div className="py-20 text-center text-neutral-400">
						<p className="text-base font-semibold">No credits found for this filter.</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default PersonView;
