// components/profile/avatarContainer/index.tsx
"use client";
import { createClient } from "@/lib/supabase/client";
import { Image as ImageIcon } from "iconsax-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";

import Image from "next/image";
import { ChangeEventHandler, useRef, useState } from "react";

const AvatarContainer = ({ url }: { url: string }) => {
	const supabase = createClient();

	const [imageUploading, setImageUploading] = useState(false);
	const [poster, setPoster] = useState<{ url: string; file: File | null }>({
		url,
		file: null,
	});
	const imageRef = useRef<HTMLInputElement>(null);
	const handleImageBoxClick = () => {
		imageRef.current?.click();
	};

	const handleImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (e.target.files?.[0]) {
			setPoster({
				url: URL.createObjectURL(e.target.files[0]),
				file: e.target.files[0],
			});
		}
	};

	const uploadImageHandler = async () => {
		if (!poster.file) return;

		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (!user) return;

		setImageUploading(true);

		const fileExt = poster.file.name.split(".").pop();
		const filePath = `${user.id}/${crypto.randomUUID()}.${fileExt}`;

		try {
			const { data, error: uploadError } = await supabase.storage
				.from("avatars")
				.upload(filePath, poster.file);

			if (uploadError) throw uploadError;

			const { error: updateError } = await supabase
				.from("profiles")
				.update({ avatar_url: data?.path })
				.eq("id", user.id);

			if (updateError) throw updateError;
		} catch (error) {
			console.error("Avatar upload failed:", error);
		} finally {
			setImageUploading(false);
		}
	};

	return (
		<div className="flex flex-col w-full max-w-xs mt-2">
			<Label htmlFor="poster" className="mb-2">
				Avatar
			</Label>
			<button
				type="button"
				onClick={handleImageBoxClick}
				aria-label="Change avatar image"
				className="w-full h-60 border-2 border-battleGrey/40 bg-white rounded-2xl overflow-hidden cursor-pointer p-4 flex items-center justify-center transition-colors duration-200 hover:border-fuelYellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-fuelYellow"
			>
				<div className="relative h-full w-full rounded-lg overflow-hidden flex items-center justify-center">
					{imageUploading && (
						<div className="absolute w-full h-full bg-slate-400/40 top-0 right-0 flex justify-center items-center">
							<Spinner size="lg" className="text-fuelYellow" />
						</div>
					)}
					{poster.url.length > 0 ? (
						<Image
							src={poster.url}
							alt="Your avatar"
							width={320}
							height={240}
							className="object-cover w-full h-full"
						/>
					) : (
						<ImageIcon size={64} color="black" aria-hidden="true" />
					)}
				</div>
			</button>
			<input
				ref={imageRef}
				id="poster"
				name="poster"
				onChange={handleImageChange}
				type="file"
				accept="image/png, image/webp, image/jpeg"
				className="hidden"
			/>
			{poster.url.length > 0 && poster.url !== url && (
				<Button
					type="button"
					onClick={uploadImageHandler}
					disabled={imageUploading}
					className="mt-3 w-full"
				>
					{imageUploading ? (
						<>
							<Spinner size="sm" aria-hidden="true" />
							Uploading…
						</>
					) : (
						"Upload"
					)}
				</Button>
			)}
		</div>
	);
};

export default AvatarContainer;