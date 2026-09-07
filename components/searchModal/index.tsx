"use client";

import React, {
	useState,
	useEffect,
	useRef,
	useCallback,
	useTransition,
} from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
	Search,
	X,
	Film,
	Tv,
	Star,
	Sparkles,
	ArrowRight,
	CornerDownLeft,
	Loader2,
	AlertCircle,
} from "lucide-react";
import { ListResults } from "@/types";
import { getPosterUrl } from "@/lib/tmdb/image";
import { searchShows, getQuickSuggestions } from "@/app/actions/search";
import { useSearch } from "./searchContext";

type FilterType = "all" | "movie" | "tv";

export const SearchModal: React.FC = () => {
	const { isOpen, closeSearch } = useSearch();
	const router = useRouter();

	const [mounted, setMounted] = useState(false);
	const [query, setQuery] = useState("");
	const [filter, setFilter] = useState<FilterType>("all");
	const [results, setResults] = useState<ListResults[]>([]);
	const [suggestions, setSuggestions] = useState<ListResults[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);

	const [, startTransition] = useTransition();

	const inputRef = useRef<HTMLInputElement>(null);
	const listRef = useRef<HTMLDivElement>(null);
	const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

	// Client-side mount
	useEffect(() => {
		setMounted(true);
	}, []);

	// Fetch trending suggestions when modal opens
	useEffect(() => {
		if (isOpen) {
			setQuery("");
			setSelectedIndex(0);
			setFilter("all");

			// Fetch quick suggestions if not already loaded
			if (suggestions.length === 0) {
				getQuickSuggestions().then((data) => {
					setSuggestions(data);
				});
			}

			// Focus input after modal mounts
			const timer = setTimeout(() => {
				inputRef.current?.focus();
			}, 50);

			// Lock body scroll
			const originalOverflow = document.body.style.overflow;
			document.body.style.overflow = "hidden";

			return () => {
				clearTimeout(timer);
				document.body.style.overflow = originalOverflow;
			};
		}
	}, [isOpen, suggestions.length]);

	// Debounced search query
	useEffect(() => {
		if (debounceTimerRef.current) {
			clearTimeout(debounceTimerRef.current);
		}

		const trimmed = query.trim();
		if (!trimmed) {
			setResults([]);
			setIsLoading(false);
			setSelectedIndex(0);
			return;
		}

		setIsLoading(true);

		debounceTimerRef.current = setTimeout(async () => {
			try {
				const data = await searchShows({ query: trimmed });
				setResults(data);
				setSelectedIndex(0);
			} catch (err) {
				console.error("Search error:", err);
				setResults([]);
			} finally {
				setIsLoading(false);
			}
		}, 260);

		return () => {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
			}
		};
	}, [query]);

	// Filtered list based on active category
	const displayedItems = React.useMemo(() => {
		const source = query.trim() ? results : suggestions;
		if (filter === "all") return source;
		return source.filter((item) => item.media_type === filter);
	}, [query, results, suggestions, filter]);

	// Navigate to selected show
	const handleSelect = useCallback(
		(item: ListResults) => {
			closeSearch();
			const mediaType = item.media_type === "tv" ? "tv" : "movie";
			startTransition(() => {
				router.push(`/${mediaType}/${item.id}`);
			});
		},
		[closeSearch, router]
	);

	// Auto-scroll active item into view
	useEffect(() => {
		if (!listRef.current) return;
		const activeEl = listRef.current.querySelector(
			`[data-result-index="${selectedIndex}"]`
		);
		if (activeEl) {
			activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
		}
	}, [selectedIndex]);

	// Keyboard navigation within modal
	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "Escape") {
				e.preventDefault();
				closeSearch();
				return;
			}

			if (displayedItems.length === 0) return;

			if (e.key === "ArrowDown") {
				e.preventDefault();
				setSelectedIndex((prev) => (prev + 1) % displayedItems.length);
			} else if (e.key === "ArrowUp") {
				e.preventDefault();
				setSelectedIndex((prev) =>
					prev <= 0 ? displayedItems.length - 1 : prev - 1
				);
			} else if (e.key === "Enter") {
				e.preventDefault();
				const currentItem = displayedItems[selectedIndex];
				if (currentItem) {
					handleSelect(currentItem);
				}
			} else if (e.key === "Tab") {
				// Cycle filter tabs
				e.preventDefault();
				const filters: FilterType[] = ["all", "movie", "tv"];
				const nextFilter =
					filters[(filters.indexOf(filter) + (e.shiftKey ? -1 : 1) + 3) % 3];
				setFilter(nextFilter);
				setSelectedIndex(0);
			}
		},
		[closeSearch, displayedItems, selectedIndex, handleSelect, filter]
	);

	if (!mounted || !isOpen) return null;

	const modalContent = (
		<div
			role="dialog"
			aria-modal="true"
			aria-label="Spotlight Search"
			onKeyDown={handleKeyDown}
			className="fixed inset-0 z-[10000] flex items-start justify-center pt-16 sm:pt-24 px-3 sm:px-6 animate-fade-in"
		>
			{/* Backdrop Overlay */}
			<div
				className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity"
				onClick={closeSearch}
				aria-hidden="true"
			/>

			{/* Command Palette Card */}
			<div
				className="relative z-10 w-full max-w-2xl rounded-2xl bg-[#121118]/95 border border-white/10 shadow-2xl shadow-black/90 overflow-hidden flex flex-col max-h-[80vh] sm:max-h-[75vh]"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Top Search Input Bar */}
				<div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-white/[0.02]">
					<Search size={20} className="text-fuelYellow shrink-0" aria-hidden="true" />

					<input
						ref={inputRef}
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search movies, TV shows, genres..."
						className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder:text-neutral-500 outline-none"
						autoComplete="off"
						autoCorrect="off"
						spellCheck={false}
					/>

					{isLoading && (
						<Loader2
							size={18}
							className="animate-spin text-fuelYellow shrink-0"
							aria-label="Searching..."
						/>
					)}

					{query && !isLoading && (
						<button
							type="button"
							onClick={() => {
								setQuery("");
								inputRef.current?.focus();
							}}
							aria-label="Clear search query"
							className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
						>
							<X size={16} />
						</button>
					)}

					<button
						type="button"
						onClick={closeSearch}
						className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-mono text-neutral-400 bg-white/5 border border-white/10 hover:text-white hover:border-white/20 transition-colors"
					>
						ESC
					</button>
				</div>

				{/* Filter Pills Bar */}
				<div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-[#0d0c11]/60 text-xs">
					<div className="flex items-center gap-1.5">
						{(
							[
								{ id: "all", label: "All" },
								{ id: "movie", label: "Movies" },
								{ id: "tv", label: "TV Shows" },
							] as const
						).map((tab) => {
							const isActive = filter === tab.id;
							return (
								<button
									key={tab.id}
									type="button"
									onClick={() => {
										setFilter(tab.id);
										setSelectedIndex(0);
									}}
									className={`px-3 py-1 rounded-lg font-medium transition-all ${
										isActive
											? "bg-fuelYellow text-black font-semibold shadow-sm shadow-fuelYellow/20"
											: "text-neutral-400 hover:text-white hover:bg-white/5"
									}`}
								>
									{tab.label}
								</button>
							);
						})}
					</div>

					<span className="text-[11px] text-neutral-500 hidden sm:inline">
						{query.trim()
							? `${displayedItems.length} result${displayedItems.length === 1 ? "" : "s"}`
							: "Trending Recommendations"}
					</span>
				</div>

				{/* Results List */}
				<div
					ref={listRef}
					className="flex-1 overflow-y-auto p-2 divide-y divide-white/5 scrollbar-thin scrollbar-thumb-white/10"
				>
					{/* Suggestions Header when query is empty */}
					{!query.trim() && displayedItems.length > 0 && (
						<div className="px-3 py-2 flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
							<Sparkles size={13} className="text-fuelYellow" />
							<span>Trending & Popular Discovery</span>
						</div>
					)}

					{/* Result Items */}
					{displayedItems.map((item, index) => {
						const isSelected = index === selectedIndex;
						const posterUrl = getPosterUrl(item.poster_path, "w92");
						const title = item.title || item.name || "Untitled";
						const year = (item.release_date || item.first_air_date)?.slice(0, 4);
						const isTv = item.media_type === "tv";
						const rating = item.vote_average ? item.vote_average.toFixed(1) : null;

						return (
							<div
								key={`${item.media_type}-${item.id}-${index}`}
								data-result-index={index}
								onClick={() => handleSelect(item)}
								onMouseEnter={() => setSelectedIndex(index)}
								className={`group relative flex items-center gap-3.5 p-2.5 rounded-xl cursor-pointer transition-all ${
									isSelected
										? "bg-fuelYellow/10 border border-fuelYellow/30 text-white shadow-md shadow-fuelYellow/5"
										: "border border-transparent hover:bg-white/5 text-neutral-300"
								}`}
							>
								{/* Poster Thumbnail */}
								<div className="relative w-11 h-16 rounded-lg overflow-hidden bg-black/60 border border-white/10 shrink-0">
									{posterUrl ? (
										<Image
											src={posterUrl}
											alt={title}
											fill
											sizes="44px"
											className="object-cover"
										/>
									) : (
										<div className="w-full h-full flex items-center justify-center text-neutral-600 bg-white/5">
											{isTv ? <Tv size={16} /> : <Film size={16} />}
										</div>
									)}
								</div>

								{/* Info Column */}
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2 flex-wrap">
										<h4
											className={`text-sm font-semibold truncate ${
												isSelected ? "text-fuelYellow" : "text-white"
											}`}
										>
											{title}
										</h4>

										{/* Media Badge */}
										<span
											className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border ${
												isTv
													? "bg-purple-500/15 text-purple-300 border-purple-500/30"
													: "bg-fuelYellow/15 text-fuelYellow border-fuelYellow/30"
											}`}
										>
											{isTv ? "TV Series" : "Movie"}
										</span>

										{/* Year */}
										{year && (
											<span className="text-xs text-neutral-400 font-mono">
												{year}
											</span>
										)}

										{/* Star Rating */}
										{rating && (
											<span className="inline-flex items-center gap-1 text-xs text-neutral-300">
												<Star size={11} className="text-fuelYellow fill-fuelYellow" />
												<span>{rating}</span>
											</span>
										)}
									</div>

									{/* Overview preview */}
									{item.overview && (
										<p className="mt-1 text-xs text-neutral-400 line-clamp-1">
											{item.overview}
										</p>
									)}
								</div>

								{/* Quick Select Glyph */}
								<div
									className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-lg transition-opacity ${
										isSelected
											? "opacity-100 bg-fuelYellow text-black"
											: "opacity-0 group-hover:opacity-60 text-neutral-400"
									}`}
								>
									<ArrowRight size={14} />
								</div>
							</div>
						);
					})}

					{/* No Results Found */}
					{query.trim() && displayedItems.length === 0 && !isLoading && (
						<div className="flex flex-col items-center justify-center py-12 px-4 text-center">
							<div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-battleGrey mb-3">
								<AlertCircle size={24} />
							</div>
							<h3 className="text-base font-semibold text-white">
								No results found
							</h3>
							<p className="mt-1 text-xs text-neutral-400 max-w-xs">
								We couldn&apos;t find any movies or TV series matching &ldquo;
								<span className="text-fuelYellow">{query}</span>&rdquo;. Try searching by title or another keyword.
							</p>
						</div>
					)}
				</div>

				{/* Footer Command Bar Navigation Guide */}
				<div className="px-4 py-2.5 border-t border-white/5 bg-[#0d0c11]/80 flex items-center justify-between text-[11px] text-neutral-400">
					<div className="flex items-center gap-3">
						<span className="flex items-center gap-1">
							<kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">
								↑
							</kbd>
							<kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">
								↓
							</kbd>
							<span>Navigate</span>
						</span>
						<span className="flex items-center gap-1">
							<kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">
								↵
							</kbd>
							<span>Select</span>
						</span>
						<span className="hidden sm:flex items-center gap-1">
							<kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">
								Tab
							</kbd>
							<span>Filter</span>
						</span>
					</div>

					<div className="flex items-center gap-1">
						<kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">
							ESC
						</kbd>
						<span>Close</span>
					</div>
				</div>
			</div>
		</div>
	);

	return createPortal(modalContent, document.body);
};

export default SearchModal;
