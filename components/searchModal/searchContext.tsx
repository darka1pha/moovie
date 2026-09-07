"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	ReactNode,
} from "react";

interface SearchContextValue {
	isOpen: boolean;
	openSearch: () => void;
	closeSearch: () => void;
	toggleSearch: () => void;
}

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const openSearch = useCallback(() => setIsOpen(true), []);
	const closeSearch = useCallback(() => setIsOpen(false), []);
	const toggleSearch = useCallback(() => setIsOpen((prev) => !prev), []);

	// Listen for global shortcut (Ctrl+K or Cmd+K) and custom open-search events
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				toggleSearch();
			}
		};

		const handleCustomOpen = () => {
			openSearch();
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("open-search", handleCustomOpen);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("open-search", handleCustomOpen);
		};
	}, [toggleSearch, openSearch]);

	return (
		<SearchContext.Provider
			value={{
				isOpen,
				openSearch,
				closeSearch,
				toggleSearch,
			}}
		>
			{children}
		</SearchContext.Provider>
	);
};

export const useSearch = (): SearchContextValue => {
	const context = useContext(SearchContext);
	if (!context) {
		throw new Error("useSearch must be used within a SearchProvider");
	}
	return context;
};
