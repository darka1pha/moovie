import Link from "next/link";
import { VideoSlash } from "iconsax-react";

export default function NotFound() {
	return (
		<div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center text-center px-6 py-16">
			<div className="w-20 h-20 rounded-3xl bg-fuelYellow/10 border border-fuelYellow/30 flex items-center justify-center mb-6 text-fuelYellow">
				<VideoSlash size={40} variant="Bulk" aria-hidden="true" />
			</div>
			<span className="text-fuelYellow text-sm font-bold uppercase tracking-widest mb-2">
				404 Error
			</span>
			<h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
				Page Not Found
			</h1>
			<p className="text-neutral-400 max-w-md mb-8 text-sm sm:text-base leading-relaxed">
				Sorry, we couldn’t find the movie, show, or page you’re looking for. It may have been moved or removed.
			</p>
			<Link
				href="/"
				className="inline-flex items-center justify-center bg-fuelYellow text-black font-semibold text-sm rounded-xl py-3 px-8 hover:bg-fuelYellow/90 active:scale-95 transition-all duration-200 shadow-lg shadow-fuelYellow/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
			>
				Back to Explore
			</Link>
		</div>
	);
}
