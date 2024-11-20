"use client";

import { ArrowUp2, ArrowDown2 } from "iconsax-react";
import { HTMLProps, useState } from "react";
import { motion } from "framer-motion";

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
	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			{isOpen && (
				<motion.div
					className="fixed top-0 bottom-0 right-0 z-10 w-full h-full"
					onClick={(e) => {
						e.stopPropagation();
						setIsOpen(false);
					}}
				/>
			)}
			<div className={`w-40 ${className} z-20`}>
				<p className="text-white mb-2 text-sm">{title}</p>
				<div
					onClick={handleToggle}
					className={`cursor-pointer flex relative bg-white w-full rounded-xl px-2 items-center justify-between h-9`}
				>
					<p className="text-black text-sm">{value}</p>
					{isOpen ? (
						<ArrowUp2 color="black" size={15} />
					) : (
						<ArrowDown2 color="black" size={15} />
					)}
				</div>
				<motion.div
					className="w-40 z-10 flex flex-col bg-white rounded-xl mt-1 overflow-y-scroll max-h-64 absolute no-scrollbar"
					initial={{ height: 0 }}
					animate={isOpen ? { height: "auto" } : { height: 0 }}
				>
					{data.map((value: string, key: number) => (
						<div
							key={key}
							onClick={() => {
								onChange(value, name);
								setIsOpen(false);
							}}
							className="text-balasticSea text-sm m-2 p-1 hover:bg-blue-500 hover:text-white transition-all duration-300 ease-out cursor-pointer"
						>
							{value}
						</div>
					))}
				</motion.div>
			</div>
		</>
	);
};

export default FilterSelect;
