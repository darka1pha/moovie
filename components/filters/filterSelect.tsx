// components/filters/filterSelect.tsx
"use client";

import { ArrowUp2, ArrowDown2 } from "iconsax-react";
import { HTMLProps, useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Props {
	data: string[];
	value: string;
	onChange: (value: string, name: string) => void;
	name: string;
	className?: HTMLProps<HTMLElement>["className"];
	title: string;
}

const FilterSelect = ({
	data,
	onChange,
	value,
	name,
	className,
	title,
}: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(-1);
	const containerRef = useRef<HTMLDivElement>(null);
	const listboxId = useId();
	const buttonId = useId();

	const close = () => {
		setIsOpen(false);
		setActiveIndex(-1);
	};

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (e: MouseEvent) => {
			if (!containerRef.current?.contains(e.target as Node)) close();
		};
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				close();
				containerRef.current?.querySelector("button")?.focus({ preventScroll: true });
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEscape);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscape);
		};
	}, [isOpen]);

	const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			setIsOpen(true);
			setActiveIndex((prev) => (prev === -1 ? 0 : prev));
		}
	};

	const handleListKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setActiveIndex((prev) => (prev + 1) % data.length);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setActiveIndex((prev) => (prev - 1 + data.length) % data.length);
		} else if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			if (activeIndex >= 0) {
				onChange(data[activeIndex], name);
				close();
			}
		}
	};

	return (
		<div ref={containerRef} className={`w-44 ${className ?? ""} relative ${isOpen ? "z-50" : "z-10"}`}>
			<p className="text-battleGrey mb-1.5 text-xs font-semibold uppercase tracking-wider" id={`${buttonId}-label`}>
				{title}
			</p>
			<button
				type="button"
				id={buttonId}
				aria-haspopup="listbox"
				aria-expanded={isOpen}
				aria-controls={listboxId}
				aria-labelledby={`${buttonId}-label ${buttonId}`}
				onClick={() => setIsOpen((prev) => !prev)}
				onKeyDown={handleTriggerKeyDown}
				className="cursor-pointer flex w-full rounded-xl px-3 items-center justify-between h-10 bg-balasticSea border border-white/10 text-white text-sm hover:border-fuelYellow/50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow shadow-sm capitalize"
			>
				<span className="truncate">{value}</span>
				{isOpen ? (
					<ArrowUp2 color="var(--accent-color)" size={15} aria-hidden="true" />
				) : (
					<ArrowDown2 color="var(--accent-color)" size={15} aria-hidden="true" />
				)}
			</button>
			<AnimatePresence>
				{isOpen && (
					<motion.ul
						id={listboxId}
						role="listbox"
						aria-labelledby={`${buttonId}-label`}
						tabIndex={-1}
						onKeyDown={handleListKeyDown}
						initial={{ opacity: 0, y: -4, scale: 0.98 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -4, scale: 0.98 }}
						transition={{ duration: 0.15, ease: "easeOut" }}
						className="w-full flex flex-col bg-[#1a191e]/98 backdrop-blur-2xl border border-white/15 rounded-xl mt-1.5 overflow-y-auto max-h-64 absolute top-full left-0 no-scrollbar shadow-2xl p-1 z-[100]"
						ref={(el) => {
							if (el && isOpen) el.focus({ preventScroll: true });
						}}
					>
						{data.map((item, index) => {
							const isSelected = item.toLowerCase() === value.toLowerCase();
							const isHighlighted = index === activeIndex;

							return (
								<li
									key={item}
									role="option"
									aria-selected={isSelected}
									onClick={() => {
										onChange(item, name);
										close();
									}}
									onMouseEnter={() => setActiveIndex(index)}
									className={`text-sm px-3 py-2 rounded-lg transition-colors cursor-pointer capitalize ${isSelected
										? "bg-fuelYellow text-black font-semibold"
										: isHighlighted
											? "bg-white/10 text-white"
											: "text-neutral-300 hover:bg-white/5 hover:text-white"
										}`}
								>
									{item}
								</li>
							);
						})}
					</motion.ul>
				)}
			</AnimatePresence>
		</div>
	);
};

export default FilterSelect;