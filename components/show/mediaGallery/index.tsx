"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
	Images,
	Maximize2,
	X,
	ChevronLeft,
	ChevronRight,
	Download,
	Sparkles,
	Film,
} from "lucide-react";
import { ShowImagesResponse, ImageItem } from "@/types";

interface MediaGalleryProps {
	images?: ShowImagesResponse | null;
	title: string;
}

type GalleryTab = "backdrops" | "posters";

export const MediaGallery: React.FC<MediaGalleryProps> = ({ images, title }) => {
	const backdrops = images?.backdrops || [];
	const posters = images?.posters || [];

	const [activeTab, setActiveTab] = useState<GalleryTab>("backdrops");
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const currentList: ImageItem[] = activeTab === "backdrops" ? backdrops : posters;

	const openLightbox = (index: number) => {
		setLightboxIndex(index);
	};

	const closeLightbox = useCallback(() => {
		setLightboxIndex(null);
	}, []);

	const nextImage = useCallback(() => {
		if (lightboxIndex === null || currentList.length === 0) return;
		setLightboxIndex((prev) => ((prev ?? 0) + 1) % currentList.length);
	}, [lightboxIndex, currentList.length]);

	const prevImage = useCallback(() => {
		if (lightboxIndex === null || currentList.length === 0) return;
		setLightboxIndex((prev) =>
			(prev ?? 0) <= 0 ? currentList.length - 1 : (prev ?? 0) - 1
		);
	}, [lightboxIndex, currentList.length]);

	// Keyboard controls for lightbox
	useEffect(() => {
		if (lightboxIndex === null) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				closeLightbox();
			} else if (e.key === "ArrowRight") {
				nextImage();
			} else if (e.key === "ArrowLeft") {
				prevImage();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = originalOverflow;
		};
	}, [lightboxIndex, closeLightbox, nextImage, prevImage]);

	if (backdrops.length === 0 && posters.length === 0) {
		return null;
	}

	const activeImage = lightboxIndex !== null ? currentList[lightboxIndex] : null;

	const lightboxModal =
		mounted && lightboxIndex !== null && activeImage ? (
			<div
				role="dialog"
				aria-modal="true"
				aria-label="Full-Screen Media Viewer"
				className="fixed inset-0 z-[10000] flex flex-col bg-black/95 backdrop-blur-2xl animate-fade-in select-none"
				onClick={closeLightbox}
			>
				{/* Top Controls Bar */}
				<div
					className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-4 border-b border-white/10 bg-black/40"
					onClick={(e) => e.stopPropagation()}
				>
					<div className="flex items-center gap-3">
						<div className="p-2 rounded-xl bg-fuelYellow/10 text-fuelYellow border border-fuelYellow/30">
							<Images size={16} />
						</div>
						<div>
							<h3 className="text-sm sm:text-base font-bold text-white truncate max-w-xs sm:max-w-md">
								{title}
							</h3>
							<div className="flex items-center gap-2 text-xs text-neutral-400">
								<span className="capitalize">{activeTab.slice(0, -1)}</span>
								<span>•</span>
								<span>
									{lightboxIndex + 1} of {currentList.length}
								</span>
								{activeImage.width >= 3840 && (
									<span className="px-1.5 py-0.2 rounded bg-fuelYellow/20 text-fuelYellow font-bold text-[10px]">
										4K UHD
									</span>
								)}
								<span className="font-mono text-[11px] text-neutral-500">
									{activeImage.width} × {activeImage.height}
								</span>
							</div>
						</div>
					</div>

					<div className="flex items-center gap-2">
						{/* Download / Open Original */}
						<a
							href={`https://image.tmdb.org/t/p/original${activeImage.file_path}`}
							target="_blank"
							rel="noopener noreferrer"
							download
							aria-label="Open full-resolution image in new tab"
							className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white text-xs font-semibold transition-colors"
						>
							<Download size={14} />
							<span className="hidden sm:inline">Original Full-Res</span>
						</a>

						{/* Close Button */}
						<button
							type="button"
							onClick={closeLightbox}
							aria-label="Close Lightbox"
							className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-neutral-300 hover:text-red-400 border border-white/10 hover:border-red-500/30 transition-colors"
						>
							<X size={18} />
						</button>
					</div>
				</div>

				{/* Image Stage */}
				<div
					className="relative flex-1 flex items-center justify-center p-4 sm:p-8"
					onClick={(e) => e.stopPropagation()}
				>
					{/* Previous Arrow */}
					<button
						type="button"
						onClick={prevImage}
						aria-label="Previous Image"
						className="absolute left-3 sm:left-6 z-20 p-3 rounded-2xl bg-black/60 hover:bg-balasticSea border border-white/10 text-white transition-all hover:scale-110 active:scale-95 shadow-xl"
					>
						<ChevronLeft size={24} />
					</button>

					{/* Center Image */}
					<div className="relative w-full h-full max-h-[82vh] flex items-center justify-center">
						<Image
							src={`https://image.tmdb.org/t/p/original${activeImage.file_path}`}
							alt={`${title} - ${activeTab} ${lightboxIndex + 1}`}
							fill
							priority
							sizes="100vw"
							className="object-contain drop-shadow-2xl"
						/>
					</div>

					{/* Next Arrow */}
					<button
						type="button"
						onClick={nextImage}
						aria-label="Next Image"
						className="absolute right-3 sm:right-6 z-20 p-3 rounded-2xl bg-black/60 hover:bg-balasticSea border border-white/10 text-white transition-all hover:scale-110 active:scale-95 shadow-xl"
					>
						<ChevronRight size={24} />
					</button>
				</div>
			</div>
		) : null;

	return (
		<div className="mt-14 max-w-7xl mx-auto px-6 sm:px-10">
			{/* Section Header */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
				<div className="flex items-center gap-2.5">
					<div className="p-2 rounded-xl bg-fuelYellow/10 border border-fuelYellow/30 text-fuelYellow">
						<Images size={20} aria-hidden="true" />
					</div>
					<div>
						<h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
							Media Gallery & Wallpapers
						</h2>
						<p className="text-xs text-neutral-400">
							High-definition production stills, wallpapers, and theatrical posters
						</p>
					</div>
				</div>

				{/* Tab Selector */}
				<div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
					{backdrops.length > 0 && (
						<button
							type="button"
							onClick={() => setActiveTab("backdrops")}
							className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
								activeTab === "backdrops"
									? "bg-fuelYellow text-black font-bold shadow-md shadow-fuelYellow/20"
									: "text-neutral-400 hover:text-white"
							}`}
						>
							<Film size={13} />
							<span>Wallpapers</span>
							<span
								className={`text-[10px] px-1.5 py-0.2 rounded-full ${
									activeTab === "backdrops" ? "bg-black/20 text-black font-bold" : "bg-white/10 text-neutral-400"
								}`}
							>
								{backdrops.length}
							</span>
						</button>
					)}

					{posters.length > 0 && (
						<button
							type="button"
							onClick={() => setActiveTab("posters")}
							className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
								activeTab === "posters"
									? "bg-fuelYellow text-black font-bold shadow-md shadow-fuelYellow/20"
									: "text-neutral-400 hover:text-white"
							}`}
						>
							<Sparkles size={13} />
							<span>Posters</span>
							<span
								className={`text-[10px] px-1.5 py-0.2 rounded-full ${
									activeTab === "posters" ? "bg-black/20 text-black font-bold" : "bg-white/10 text-neutral-400"
								}`}
							>
								{posters.length}
							</span>
						</button>
					)}
				</div>
			</div>

			{/* Thumbnails Grid */}
			{activeTab === "backdrops" ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 mt-6">
					{backdrops.slice(0, 16).map((item, idx) => (
						<div
							key={item.file_path}
							onClick={() => openLightbox(idx)}
							className="group relative aspect-video rounded-2xl overflow-hidden bg-black/60 border border-white/10 hover:border-fuelYellow/50 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-fuelYellow/10 transition-all duration-300 hover:-translate-y-1"
						>
							<Image
								src={`https://image.tmdb.org/t/p/w780${item.file_path}`}
								alt={`${title} wallpaper ${idx + 1}`}
								fill
								sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
								className="object-cover group-hover:scale-105 transition-transform duration-500"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
								<span className="text-[11px] font-mono text-white/90">
									{item.width} × {item.height}
								</span>
								<div className="p-1.5 rounded-lg bg-fuelYellow text-black">
									<Maximize2 size={14} />
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
					{posters.slice(0, 18).map((item, idx) => (
						<div
							key={item.file_path}
							onClick={() => openLightbox(idx)}
							className="group relative aspect-[2/3] rounded-2xl overflow-hidden bg-black/60 border border-white/10 hover:border-fuelYellow/50 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-fuelYellow/10 transition-all duration-300 hover:-translate-y-1"
						>
							<Image
								src={`https://image.tmdb.org/t/p/w500${item.file_path}`}
								alt={`${title} poster ${idx + 1}`}
								fill
								sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
								className="object-cover group-hover:scale-105 transition-transform duration-500"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
								<span className="text-[10px] font-mono text-white/90">
									{item.width} × {item.height}
								</span>
								<div className="p-1 rounded bg-fuelYellow text-black">
									<Maximize2 size={12} />
								</div>
							</div>
						</div>
					))}
				</div>
			)}

			{lightboxModal && createPortal(lightboxModal, document.body)}
		</div>
	);
};

export default MediaGallery;
