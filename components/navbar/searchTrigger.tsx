"use client";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useSearch } from "@/components/searchModal/searchContext";

export const SearchTrigger: React.FC = () => {
	const { openSearch } = useSearch();
	const [shortcutKey, setShortcutKey] = useState("Ctrl K");

	useEffect(() => {
		if (typeof window !== "undefined") {
			const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform || navigator.userAgent);
			setShortcutKey(isMac ? "⌘K" : "Ctrl K");
		}
	}, []);

	return (
		<button
			type="button"
			onClick={openSearch}
			aria-label="Search movies and series (Ctrl+K)"
			className="group flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer shadow-inner focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow"
		>
			<Search
				size={15}
				className="text-neutral-400 group-hover:text-fuelYellow transition-colors"
				aria-hidden="true"
			/>
			<span className="text-xs text-neutral-400 group-hover:text-neutral-200 transition-colors hidden sm:inline">
				Search...
			</span>
			<kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded bg-white/10 border border-white/15 text-[10px] font-mono text-neutral-400 group-hover:text-neutral-300">
				{shortcutKey}
			</kbd>
		</button>
	);
};

export default SearchTrigger;
