"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Tv, ExternalLink, Info, CheckCircle2, ChevronDown } from "lucide-react";
import { WatchProvidersResponse, WatchProvider, CountryWatchProviders } from "@/types";

const POPULAR_COUNTRIES: Record<string, { name: string; flag: string }> = {
	US: { name: "United States", flag: "🇺🇸" },
	GB: { name: "United Kingdom", flag: "🇬🇧" },
	CA: { name: "Canada", flag: "🇨🇦" },
	AU: { name: "Australia", flag: "🇦🇺" },
	DE: { name: "Germany", flag: "🇩🇪" },
	FR: { name: "France", flag: "🇫🇷" },
	ES: { name: "Spain", flag: "🇪🇸" },
	IT: { name: "Italy", flag: "🇮🇹" },
	BR: { name: "Brazil", flag: "🇧🇷" },
	MX: { name: "Mexico", flag: "🇲🇽" },
	JP: { name: "Japan", flag: "🇯🇵" },
	KR: { name: "South Korea", flag: "🇰🇷" },
	IN: { name: "India", flag: "🇮🇳" },
	NL: { name: "Netherlands", flag: "🇳🇱" },
	SE: { name: "Sweden", flag: "🇸🇪" },
	NO: { name: "Norway", flag: "🇳🇴" },
	DK: { name: "Denmark", flag: "🇩🇰" },
	FI: { name: "Finland", flag: "🇫🇮" },
	PL: { name: "Poland", flag: "🇵🇱" },
	TR: { name: "Turkey", flag: "🇹🇷" },
	NZ: { name: "New Zealand", flag: "🇳🇿" },
	IE: { name: "Ireland", flag: "🇮🇪" },
};

interface WatchProvidersProps {
	providers?: WatchProvidersResponse | null;
	title: string;
}

export const WatchProviders: React.FC<WatchProvidersProps> = ({
	providers,
	title,
}) => {
	const allResults = providers?.results || {};
	const availableCountryCodes = useMemo(() => Object.keys(allResults).sort(), [allResults]);

	// Choose default country: US if available, else first country with data
	const defaultCountry = useMemo(() => {
		if (allResults["US"]) return "US";
		if (availableCountryCodes.length > 0) return availableCountryCodes[0];
		return "US";
	}, [allResults, availableCountryCodes]);

	const [selectedCountry, setSelectedCountry] = useState<string>(defaultCountry);

	const countryData: CountryWatchProviders | undefined = allResults[selectedCountry];

	const streamProviders = countryData?.flatrate || [];
	const freeProviders = [
		...(countryData?.free || []),
		...(countryData?.ads || []),
	];
	const rentProviders = countryData?.rent || [];
	const buyProviders = countryData?.buy || [];

	const hasAnyProviders =
		streamProviders.length > 0 ||
		freeProviders.length > 0 ||
		rentProviders.length > 0 ||
		buyProviders.length > 0;

	// Deduplicate providers by provider_id within category
	const dedupe = (list: WatchProvider[]) => {
		const seen = new Set<number>();
		return list.filter((p) => {
			if (seen.has(p.provider_id)) return false;
			seen.add(p.provider_id);
			return true;
		});
	};

	const currentCountryName =
		POPULAR_COUNTRIES[selectedCountry]?.name || selectedCountry;
	const currentCountryFlag =
		POPULAR_COUNTRIES[selectedCountry]?.flag || "🌐";

	return (
		<div className="mt-8 pt-6 border-t border-white/10">
			{/* Header with Title and Country Selector */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
				<div className="flex items-center gap-2.5">
					<div className="p-2 rounded-xl bg-fuelYellow/10 border border-fuelYellow/30 text-fuelYellow">
						<Tv size={18} aria-hidden="true" />
					</div>
					<div>
						<h3 className="text-lg font-bold text-white tracking-tight">
							Where to Watch
						</h3>
						<p className="text-xs text-neutral-400">
							Streaming availability, rental & purchase options
						</p>
					</div>
				</div>

				{/* Country Selector Dropdown */}
				{availableCountryCodes.length > 0 && (
					<div className="relative inline-flex items-center">
						<select
							value={selectedCountry}
							onChange={(e) => setSelectedCountry(e.target.value)}
							aria-label="Select Country for Streaming Availability"
							className="appearance-none bg-balasticSea/90 hover:bg-balasticSea text-neutral-200 hover:text-white border border-white/10 hover:border-white/25 rounded-xl px-3.5 py-1.5 pr-8 text-xs font-medium cursor-pointer transition-all outline-none focus:border-fuelYellow/50 focus:ring-1 focus:ring-fuelYellow/50"
						>
							{availableCountryCodes.map((code) => {
								const info = POPULAR_COUNTRIES[code];
								const label = info ? `${info.flag} ${info.name}` : code;
								return (
									<option key={code} value={code} className="bg-[#16151a] text-white">
										{label}
									</option>
								);
							})}
						</select>
						<ChevronDown
							size={14}
							className="absolute right-2.5 pointer-events-none text-neutral-400"
							aria-hidden="true"
						/>
					</div>
				)}
			</div>

			{/* Providers Grid */}
			{hasAnyProviders ? (
				<div className="space-y-4">
					{/* Stream (Subscription / Flatrate) */}
					{streamProviders.length > 0 && (
						<ProviderGroup
							label="Stream"
							badge="Subscription"
							badgeColor="bg-fuelYellow/20 text-fuelYellow border-fuelYellow/30"
							providers={dedupe(streamProviders)}
							link={countryData?.link}
						/>
					)}

					{/* Free / Ads */}
					{freeProviders.length > 0 && (
						<ProviderGroup
							label="Free to Watch"
							badge="With Ads"
							badgeColor="bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
							providers={dedupe(freeProviders)}
							link={countryData?.link}
						/>
					)}

					{/* Rent */}
					{rentProviders.length > 0 && (
						<ProviderGroup
							label="Rent"
							badge="HD / 4K"
							badgeColor="bg-blue-500/20 text-blue-400 border-blue-500/30"
							providers={dedupe(rentProviders)}
							link={countryData?.link}
						/>
					)}

					{/* Buy */}
					{buyProviders.length > 0 && (
						<ProviderGroup
							label="Buy"
							badge="Purchase"
							badgeColor="bg-purple-500/20 text-purple-400 border-purple-500/30"
							providers={dedupe(buyProviders)}
							link={countryData?.link}
						/>
					)}
				</div>
			) : (
				<div className="p-4 rounded-xl bg-balasticSea/50 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-400">
					<div className="flex items-center gap-2">
						<Info size={16} className="text-fuelYellow shrink-0" />
						<span>
							Not currently available to stream, rent, or buy in{" "}
							<strong className="text-neutral-200">
								{currentCountryFlag} {currentCountryName}
							</strong>
							.
						</span>
					</div>
				</div>
			)}

			{/* JustWatch Attribution */}
			<div className="mt-4 flex items-center justify-between text-[11px] text-neutral-500 flex-wrap gap-2">
				<div className="flex items-center gap-1.5">
					<CheckCircle2 size={12} className="text-fuelYellow" />
					<span>Streaming data powered by</span>
					<a
						href={countryData?.link || "https://www.justwatch.com"}
						target="_blank"
						rel="noopener noreferrer"
						className="font-semibold text-neutral-400 hover:text-fuelYellow hover:underline transition-colors inline-flex items-center gap-1"
					>
						JustWatch
						<ExternalLink size={10} />
					</a>
				</div>

				{countryData?.link && (
					<a
						href={countryData.link}
						target="_blank"
						rel="noopener noreferrer"
						className="text-neutral-400 hover:text-white hover:underline transition-colors inline-flex items-center gap-1"
					>
						<span>View all options on JustWatch</span>
						<ExternalLink size={11} />
					</a>
				)}
			</div>
		</div>
	);
};

interface ProviderGroupProps {
	label: string;
	badge: string;
	badgeColor: string;
	providers: WatchProvider[];
	link?: string;
}

const ProviderGroup: React.FC<ProviderGroupProps> = ({
	label,
	badge,
	badgeColor,
	providers,
	link,
}) => {
	return (
		<div className="p-3.5 rounded-xl bg-balasticSea/40 border border-white/10 hover:border-white/20 transition-all">
			<div className="flex items-center gap-2 mb-2.5">
				<span className="text-xs font-bold text-white uppercase tracking-wider">
					{label}
				</span>
				<span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badgeColor}`}>
					{badge}
				</span>
			</div>

			<div className="flex flex-wrap items-center gap-2.5">
				{providers.map((provider) => {
					const logoUrl = provider.logo_path
						? `https://image.tmdb.org/t/p/w92${provider.logo_path}`
						: null;

					const content = (
						<div
							key={provider.provider_id}
							title={provider.provider_name}
							className="group relative flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-black/40 hover:bg-black/80 border border-white/10 hover:border-fuelYellow/50 transition-all cursor-pointer shadow-sm hover:scale-105"
						>
							{logoUrl ? (
								<div className="relative w-6 h-6 rounded-lg overflow-hidden shrink-0 border border-white/10">
									<Image
										src={logoUrl}
										alt={provider.provider_name}
										fill
										sizes="24px"
										className="object-cover"
									/>
								</div>
							) : (
								<div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-[10px] font-bold text-fuelYellow">
									{provider.provider_name.slice(0, 2).toUpperCase()}
								</div>
							)}

							<span className="text-xs font-medium text-neutral-300 group-hover:text-white transition-colors truncate max-w-[130px]">
								{provider.provider_name}
							</span>
						</div>
					);

					if (link) {
						return (
							<a
								key={provider.provider_id}
								href={link}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`Watch on ${provider.provider_name}`}
							>
								{content}
							</a>
						);
					}

					return content;
				})}
			</div>
		</div>
	);
};

export default WatchProviders;
