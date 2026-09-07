"use client";

import React, { useState } from "react";
import { Dices } from "lucide-react";
import RouletteModal from "./rouletteModal";

export const RouletteTrigger: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				aria-label="Surprise Me (Movie Roulette)"
				className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-fuelYellow/15 border border-white/10 hover:border-fuelYellow/40 transition-all duration-200 cursor-pointer shadow-inner focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow active:scale-95"
			>
				<Dices
					size={15}
					className="text-neutral-400 group-hover:text-fuelYellow transition-colors group-hover:rotate-45 duration-300"
					aria-hidden="true"
				/>
				<span className="text-xs font-semibold text-neutral-300 group-hover:text-fuelYellow transition-colors hidden lg:inline">
					Surprise Me
				</span>
			</button>

			<RouletteModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</>
	);
};

export default RouletteTrigger;
