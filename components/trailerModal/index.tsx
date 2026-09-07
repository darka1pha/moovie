"use client";

import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { VideoResult } from "@/types";
import { prioritizeVideos, getYouTubeEmbedUrl } from "@/lib/utils/trailer";
import { X, Play, Film, Sparkles, AlertCircle, Volume2, Monitor, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface TrailerModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	videos: VideoResult[];
	initialVideoKey?: string;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({
	isOpen,
	onClose,
	title,
	videos = [],
	initialVideoKey,
}) => {
	const [mounted, setMounted] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const [isVideoLoading, setIsVideoLoading] = useState(true);
	const [isCinemaDim, setIsCinemaDim] = useState(false);

	const sortedVideos = useMemo(() => prioritizeVideos(videos), [videos]);
	const safeIndex =
		activeIndex >= 0 && activeIndex < sortedVideos.length ? activeIndex : 0;
	const activeVideo = sortedVideos[safeIndex] || sortedVideos[0];
	const hasVideos = sortedVideos.length > 0 && Boolean(activeVideo);

	const playlistScrollRef = useRef<HTMLDivElement>(null);
	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(false);
	const isDraggingRef = useRef(false);
	const startXRef = useRef(0);
	const scrollLeftRef = useRef(0);
	const draggedDistanceRef = useRef(0);

	// Client-only portal mount
	useEffect(() => {
		setMounted(true);
	}, []);

	// Check scroll buttons visibility
	const checkScrollButtons = useCallback(() => {
		if (!playlistScrollRef.current) return;
		const { scrollLeft, scrollWidth, clientWidth } = playlistScrollRef.current;
		setCanScrollPrev(scrollLeft > 5);
		setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 5);
	}, []);

	useEffect(() => {
		checkScrollButtons();
		const el = playlistScrollRef.current;
		if (!el) return;

		el.addEventListener("scroll", checkScrollButtons, { passive: true });
		window.addEventListener("resize", checkScrollButtons);
		return () => {
			el.removeEventListener("scroll", checkScrollButtons);
			window.removeEventListener("resize", checkScrollButtons);
		};
	}, [checkScrollButtons, sortedVideos.length]);

	// Initialize active index when modal opens
	useEffect(() => {
		if (isOpen) {
			const idx = initialVideoKey
				? sortedVideos.findIndex((v) => v.key === initialVideoKey)
				: 0;
			setActiveIndex(idx >= 0 ? idx : 0);
			setIsCinemaDim(false);
			setIsVideoLoading(true);
		}
	}, [isOpen, initialVideoKey, sortedVideos]);

	// Safety fallback timeout to prevent stuck loading state
	useEffect(() => {
		if (!isVideoLoading) return;
		const timer = setTimeout(() => {
			setIsVideoLoading(false);
		}, 3000);
		return () => clearTimeout(timer);
	}, [isVideoLoading, activeIndex]);

	// Auto-scroll active item into center view when activeIndex changes
	useEffect(() => {
		if (!playlistScrollRef.current) return;
		const activeBtn = playlistScrollRef.current.querySelector(
			`[data-video-index="${activeIndex}"]`
		);
		if (activeBtn) {
			activeBtn.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "center",
			});
		}
	}, [activeIndex]);

	const handleScroll = (direction: "left" | "right") => {
		if (!playlistScrollRef.current) return;
		const amount = direction === "left" ? -280 : 280;
		playlistScrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
	};

	// Immediate video switch with loading state
	const handleSelectVideo = (index: number) => {
		if (index === safeIndex) return;
		setIsVideoLoading(true);
		setActiveIndex(index);
	};

	// Drag-to-swipe mouse handlers
	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!playlistScrollRef.current) return;
		isDraggingRef.current = true;
		startXRef.current = e.pageX - playlistScrollRef.current.offsetLeft;
		scrollLeftRef.current = playlistScrollRef.current.scrollLeft;
		draggedDistanceRef.current = 0;
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isDraggingRef.current || !playlistScrollRef.current) return;
		e.preventDefault();
		const x = e.pageX - playlistScrollRef.current.offsetLeft;
		const walk = (x - startXRef.current) * 1.4;
		draggedDistanceRef.current = Math.abs(walk);
		playlistScrollRef.current.scrollLeft = scrollLeftRef.current - walk;
	};

	const handleMouseUpOrLeave = () => {
		isDraggingRef.current = false;
	};

	// Close on Escape key press
	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		},
		[onClose]
	);

	useEffect(() => {
		if (isOpen) {
			document.addEventListener("keydown", handleKeyDown);
			// Lock background scrolling
			const originalOverflow = document.body.style.overflow;
			document.body.style.overflow = "hidden";

			return () => {
				document.removeEventListener("keydown", handleKeyDown);
				document.body.style.overflow = originalOverflow;
			};
		}
	}, [isOpen, handleKeyDown]);

	if (!mounted || !isOpen) return null;

	const modalContent = (
		<div
			role="dialog"
			aria-modal="true"
			aria-label={`Trailer for ${title}`}
			className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-8"
		>
			{/* Backdrop Overlay with blur */}
			<div
				className={`fixed inset-0 transition-colors duration-500 ${
					isCinemaDim ? "bg-black/98" : "bg-black/85 backdrop-blur-xl"
				}`}
				onClick={onClose}
				aria-hidden="true"
			/>

			{/* Modal Container */}
			<div
				className="relative z-10 w-full max-w-5xl flex flex-col max-h-[92vh] animate-fade-in"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Top Bar / Header */}
				<div
					className={`flex items-center justify-between gap-4 pb-3 transition-opacity duration-300 ${
						isCinemaDim ? "opacity-30 hover:opacity-100" : "opacity-100"
					}`}
				>
					<div className="flex items-center gap-2.5 min-w-0">
						<div className="h-8 w-8 rounded-xl bg-fuelYellow/10 border border-fuelYellow/30 flex items-center justify-center shrink-0 text-fuelYellow">
							<Film size={16} aria-hidden="true" />
						</div>
						<div className="min-w-0">
							<div className="flex items-center gap-2 flex-wrap">
								<h2 className="text-base sm:text-lg font-bold text-white truncate max-w-xs sm:max-w-md md:max-w-lg">
									{title}
								</h2>
								{activeVideo && (
									<span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-fuelYellow/15 text-fuelYellow border border-fuelYellow/30">
										{activeVideo.official && <Sparkles size={10} />}
										{activeVideo.type || "Trailer"}
									</span>
								)}
								{activeVideo?.size && (
									<span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/10 text-neutral-300 border border-white/10">
										{activeVideo.size}p
									</span>
								)}
							</div>
							{activeVideo && activeVideo.name !== title && (
								<p className="text-xs text-neutral-400 truncate max-w-sm sm:max-w-md">
									{activeVideo.name}
								</p>
							)}
						</div>
					</div>

					{/* Header Actions: Cinema Dim toggle + Esc/Close */}
					<div className="flex items-center gap-2 shrink-0">
						<button
							type="button"
							onClick={() => setIsCinemaDim(!isCinemaDim)}
							title={isCinemaDim ? "Exit Ambient Dim" : "Cinema Mode Dim"}
							aria-label="Toggle ambient cinema mode dimming"
							className={`p-2 rounded-xl border transition-colors ${
								isCinemaDim
									? "bg-fuelYellow text-black border-fuelYellow font-medium"
									: "bg-balasticSea/80 text-battleGrey hover:text-white border-white/10 hover:border-white/20"
							}`}
						>
							<Monitor size={17} aria-hidden="true" />
						</button>

						<button
							type="button"
							onClick={onClose}
							aria-label="Close trailer player"
							className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-balasticSea/80 hover:bg-red-500/20 text-neutral-300 hover:text-red-400 border border-white/10 hover:border-red-500/30 transition-all active:scale-95"
						>
							<span className="hidden sm:inline text-xs font-medium text-neutral-400 group-hover:text-red-300">
								Esc
							</span>
							<X size={18} aria-hidden="true" />
						</button>
					</div>
				</div>

				{/* Video Stage Area */}
				<div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl shadow-black/80">
					{/* Ambient Cinema Lighting Glow */}
					<div
						aria-hidden="true"
						className={`absolute -inset-1 bg-fuelYellow/15 blur-2xl rounded-2xl pointer-events-none transition-opacity duration-700 ${
							isCinemaDim ? "opacity-25" : "opacity-60"
						}`}
					/>

					{hasVideos ? (
						<div className="relative w-full aspect-video bg-black overflow-hidden">
							{/* Instant Loading Overlay with Target Video Poster Preview */}
							{isVideoLoading && (
								<div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/90 transition-opacity duration-200 pointer-events-none">
									{/* YouTube Poster Preview */}
									<img
										src={`https://img.youtube.com/vi/${activeVideo.key}/hqdefault.jpg`}
										alt={activeVideo.name}
										className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm scale-105"
										loading="eager"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

									<div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center animate-fade-in">
										<div className="relative flex items-center justify-center">
											<div className="w-12 h-12 rounded-full border-2 border-fuelYellow/20 border-t-fuelYellow animate-spin" />
											<Play size={16} className="absolute text-fuelYellow fill-fuelYellow/40 animate-pulse" />
										</div>
										<div className="space-y-1">
											<p className="text-sm font-semibold text-white truncate max-w-xs sm:max-w-md">
												{activeVideo.name}
											</p>
											<div className="flex items-center justify-center gap-2">
												<span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-fuelYellow/20 text-fuelYellow">
													Loading {activeVideo.type || "Trailer"}...
												</span>
												{activeVideo.size && (
													<span className="text-[10px] font-mono text-neutral-400">
														{activeVideo.size}p
													</span>
												)}
											</div>
										</div>
									</div>
								</div>
							)}

							<iframe
								key={activeVideo.key}
								src={getYouTubeEmbedUrl(activeVideo.key, { autoplay: true, rel: 0 })}
								title={`${title} - ${activeVideo.name}`}
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowFullScreen
								onLoad={() => setIsVideoLoading(false)}
								className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-300 ${
									isVideoLoading ? "opacity-0" : "opacity-100"
								}`}
							/>
						</div>
					) : (
						<div className="flex flex-col items-center justify-center p-12 sm:p-20 text-center gap-3 bg-card/60 aspect-video">
							<div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-battleGrey">
								<AlertCircle size={32} />
							</div>
							<h3 className="text-lg font-semibold text-white">
								No Official Trailer Available
							</h3>
							<p className="text-sm text-battleGrey max-w-sm">
								We couldn&apos;t find an official YouTube trailer stream for &ldquo;{title}&rdquo; at this time.
							</p>
							<a
								href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
									`${title} official trailer`
								)}`}
								target="_blank"
								rel="noopener noreferrer"
								className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-fuelYellow text-black font-semibold text-xs hover:bg-fuelYellow/90 transition-transform active:scale-95"
							>
								<Play size={14} className="fill-current" />
								<span>Search on YouTube</span>
							</a>
						</div>
					)}
				</div>

				{/* Video Selector / Playlist (if multiple videos exist) */}
				{sortedVideos.length > 1 && (
					<div
						className={`mt-3 flex items-center gap-2 transition-opacity duration-300 ${
							isCinemaDim ? "opacity-20 hover:opacity-100" : "opacity-100"
						}`}
					>
						<span className="text-xs font-semibold text-neutral-400 shrink-0 mr-1 hidden sm:flex items-center gap-1.5">
							<Volume2 size={13} className="text-fuelYellow" />
							Videos ({sortedVideos.length}):
						</span>

						{/* Swipable Carousel with Navigation Controls */}
						<div className="relative flex items-center min-w-0 flex-1 gap-1.5">
							<button
								type="button"
								onClick={() => handleScroll("left")}
								disabled={!canScrollPrev}
								aria-label="Previous videos"
								className={`h-8 w-8 rounded-xl bg-balasticSea/80 hover:bg-balasticSea text-battleGrey hover:text-white border border-white/10 shrink-0 flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
									!canScrollPrev ? "opacity-30 pointer-events-none" : "opacity-100"
								}`}
							>
								<ChevronLeft size={16} aria-hidden="true" />
							</button>

							<div
								ref={playlistScrollRef}
								onMouseDown={handleMouseDown}
								onMouseMove={handleMouseMove}
								onMouseUp={handleMouseUpOrLeave}
								onMouseLeave={handleMouseUpOrLeave}
								className="min-w-0 flex-1 flex items-center gap-2 overflow-x-auto py-1 scrollbar-none cursor-grab active:cursor-grabbing select-none"
								style={{
									scrollbarWidth: "none",
									msOverflowStyle: "none",
									WebkitOverflowScrolling: "touch",
								}}
							>
								{sortedVideos.map((video, index) => {
									const isCurrent = index === safeIndex;
									return (
										<button
											key={video.id || `${video.key}-${index}`}
											data-video-index={index}
											type="button"
											onClick={(e) => {
												if (draggedDistanceRef.current > 6) return;
												e.preventDefault();
												e.stopPropagation();
												handleSelectVideo(index);
											}}
											className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer select-none whitespace-nowrap ${
												isCurrent
													? "bg-fuelYellow text-black font-semibold border-fuelYellow shadow-md shadow-fuelYellow/20 scale-[1.02]"
													: "bg-balasticSea/70 text-neutral-300 border-white/10 hover:border-white/25 hover:text-white hover:bg-balasticSea"
											}`}
										>
											{isCurrent && isVideoLoading ? (
												<Loader2 size={11} className="animate-spin text-black shrink-0" />
											) : (
												<Play
													size={11}
													className={isCurrent ? "fill-black text-black shrink-0" : "fill-neutral-400 text-neutral-400 shrink-0"}
												/>
											)}
											<span className="truncate max-w-[160px] sm:max-w-[240px]">
												{video.name || video.type}
											</span>
											{video.official && !isCurrent && (
												<span className="text-[9px] px-1.5 py-0.5 rounded bg-fuelYellow/20 text-fuelYellow font-bold uppercase tracking-wider">
													OFFICIAL
												</span>
											)}
										</button>
									);
								})}
							</div>

							<button
								type="button"
								onClick={() => handleScroll("right")}
								disabled={!canScrollNext}
								aria-label="Next videos"
								className={`h-8 w-8 rounded-xl bg-balasticSea/80 hover:bg-balasticSea text-battleGrey hover:text-white border border-white/10 shrink-0 flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
									!canScrollNext ? "opacity-30 pointer-events-none" : "opacity-100"
								}`}
							>
								<ChevronRight size={16} aria-hidden="true" />
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);

	return createPortal(modalContent, document.body);
};

export default TrailerModal;
