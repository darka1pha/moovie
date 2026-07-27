// components/filters/filterSelect.tsx
"use client";

import { ArrowUp2, ArrowDown2 } from "iconsax-react";
import { HTMLProps, useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Props {
	data: string[];
	value: string;
	onChange: (value: string, type: "media_type" | "genre") => void;
	name: "media_type" | "genre";
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
				containerRef.current?.querySelector("button")?.focus();
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
		<div ref={containerRef} className={`w-40 ${className ?? ""} relative z-20`}>
			<p className="text-white mb-2 text-sm" id={`${buttonId}-label`}>
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
				className="cursor-pointer flex w-full rounded-xl px-2 items-center justify-between h-9 bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow"
			>
				<span className="text-black text-sm">{value}</span>
				{isOpen ? (
					<ArrowUp2 color="black" size={15} aria-hidden="true" />
				) : (
					<ArrowDown2 color="black" size={15} aria-hidden="true" />
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
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
						className="w-40 flex flex-col bg-white rounded-xl mt-1 overflow-y-auto max-h-64 absolute no-scrollbar shadow-lg"
						ref={(el) => {
							// focus the listbox once open so arrow keys work immediately
							if (el && isOpen) el.focus();
						}}
					>
						{data.map((item, index) => (
							<li
								key={item}
								role="option"
								aria-selected={item === value}
								onClick={() => {
									onChange(item, name);
									close();
								}}
								onMouseEnter={() => setActiveIndex(index)}
								className={`text-balasticSea text-sm m-2 p-1 rounded transition-colors duration-150 cursor-pointer ${index === activeIndex
									? "bg-blue-500 text-white"
									: "hover:bg-blue-500 hover:text-white"
									}`}
							>
								{item}
							</li>
						))}
					</motion.ul>
				)}
			</AnimatePresence>
		</div>
	);
};

export default FilterSelect;