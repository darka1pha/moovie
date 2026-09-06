"use client";

import { createClient } from "@/lib/supabase/client";
import { Camera, Image as ImageIcon } from "iconsax-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";

import Image from "next/image";
import { ChangeEventHandler, useMemo, useRef, useState } from "react";

const AvatarContainer = ({ url }: { url: string }) => {
	const supabase = useMemo(() => createClient(), []);

	const [imageUploading, setImageUploading] = useState(false);
	const [statusMessage, setStatusMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
	const [selectedFile, setSelectedFile] = useState<{ url: string; file: File } | null>(null);
	const imageRef = useRef<HTMLInputElement>(null);

	const handleImageBoxClick = () => {
		imageRef.current?.click();
	};

	const handleImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (e.target.files?.[0]) {
			const file = e.target.files[0];
			const previewUrl = URL.createObjectURL(file);
			setSelectedFile({
				url: previewUrl,
				file,
			});
			setStatusMessage(null);
		}
	};

	const uploadImageHandler = async () => {
		if (!selectedFile?.file) return;

		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (!user) return;

		setImageUploading(true);
		setStatusMessage(null);

		const fileExt = selectedFile.file.name.split(".").pop();
		const filePath = `${user.id}/${crypto.randomUUID()}.${fileExt}`;

		try {
			const { data, error: uploadError } = await supabase.storage
				.from("avatars")
				.upload(filePath, selectedFile.file, { upsert: true });

			if (uploadError) throw uploadError;

			const { error: updateError } = await supabase
				.from("profiles")
				.update({ avatar_url: data?.path })
				.eq("id", user.id);

			if (updateError) throw updateError;

			setStatusMessage({ text: "Avatar updated successfully!", type: "success" });
			setSelectedFile(null);
		} catch (error: any) {
			console.error("Avatar upload failed:", error);
			setStatusMessage({ text: error?.message || "Failed to upload avatar.", type: "error" });
		} finally {
			setImageUploading(false);
		}
	};

	const displayUrl = selectedFile?.url || url;

	return (
		<div className="flex flex-col items-center sm:items-start gap-3">
			<Label htmlFor="poster" className="text-sm font-medium text-battleGrey">
				Profile Photo
			</Label>

			<div className="flex items-center gap-6">
				<button
					type="button"
					onClick={handleImageBoxClick}
					aria-label="Upload profile photo"
					className="relative group h-28 w-28 rounded-full border-2 border-dashed border-battleGrey/50 hover:border-fuelYellow bg-balasticSea overflow-hidden cursor-pointer transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow shadow-md shrink-0"
				>
					{displayUrl ? (
						<Image
							src={displayUrl}
							alt="Your avatar preview"
							fill
							sizes="112px"
							className="object-cover"
						/>
					) : (
						<div className="h-full w-full flex items-center justify-center text-battleGrey">
							<ImageIcon size={36} aria-hidden="true" />
						</div>
					)}

					{/* Hover overlay with camera icon */}
					<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-200 text-fuelYellow">
						<Camera size={24} aria-hidden="true" />
						<span className="text-[10px] font-semibold text-white mt-1">Change</span>
					</div>

					{imageUploading && (
						<div className="absolute inset-0 bg-black/75 flex items-center justify-center z-10">
							<Spinner size="md" className="text-fuelYellow" />
						</div>
					)}
				</button>

				<div className="flex flex-col gap-2 text-left">
					<button
						type="button"
						onClick={handleImageBoxClick}
						className="text-sm font-semibold text-fuelYellow hover:underline cursor-pointer text-left"
					>
						Upload new picture
					</button>
					<span className="text-xs text-battleGrey">PNG, JPEG, or WebP (max. 2MB)</span>

					{selectedFile && (
						<Button
							type="button"
							size="sm"
							onClick={uploadImageHandler}
							disabled={imageUploading}
							className="mt-1 self-start"
						>
							{imageUploading ? (
								<>
									<Spinner size="sm" aria-hidden="true" />
									<span>Uploading…</span>
								</>
							) : (
								"Save Photo"
							)}
						</Button>
					)}
				</div>
			</div>

			<input
				ref={imageRef}
				id="poster"
				name="poster"
				onChange={handleImageChange}
				type="file"
				accept="image/png, image/webp, image/jpeg"
				className="sr-only"
			/>

			{statusMessage && (
				<p
					role="status"
					className={`text-xs mt-1 font-medium ${
						statusMessage.type === "success" ? "text-emerald-400" : "text-red-400"
					}`}
				>
					{statusMessage.text}
				</p>
			)}
		</div>
	);
};

export default AvatarContainer;