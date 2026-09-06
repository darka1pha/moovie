"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Warning2 } from "iconsax-react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error("Route error caught:", error);
	}, [error]);

	return (
		<div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center text-center px-6 py-16">
			<div className="w-20 h-20 rounded-3xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-6 text-red-400">
				<Warning2 size={40} variant="Bulk" aria-hidden="true" />
			</div>
			<span className="text-red-400 text-sm font-bold uppercase tracking-widest mb-2">
				Something Went Wrong
			</span>
			<h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
				Unable to Load Content
			</h1>
			<p className="text-neutral-400 max-w-md mb-8 text-sm sm:text-base leading-relaxed">
				An unexpected error occurred while loading this page. Please try again or return to the home page.
			</p>
			<div className="flex flex-wrap items-center justify-center gap-4">
				<button
					type="button"
					onClick={() => reset()}
					className="inline-flex items-center justify-center bg-fuelYellow text-black font-semibold text-sm rounded-xl py-3 px-6 hover:bg-fuelYellow/90 active:scale-95 transition-all duration-200 shadow-lg shadow-fuelYellow/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
				>
					Try Again
				</button>
				<Link
					href="/"
					className="inline-flex items-center justify-center bg-balasticSea border border-white/10 text-white font-semibold text-sm rounded-xl py-3 px-6 hover:bg-white/10 active:scale-95 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow"
				>
					Go to Home
				</Link>
			</div>
		</div>
	);
}
