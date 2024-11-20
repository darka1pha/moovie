"use client";
import { createClient } from "@/lib/supabase/client";
import { Image as ImageIcon } from "iconsax-react";

import Image from "next/image";
import { ChangeEventHandler, useRef, useState } from "react";

const AvatarContainer = ({ url }: { url: string }) => {
	const supabase = createClient();

	const [imageUploading, setImageUploading] = useState(false);
	const [poster, setPoster] = useState<{ url: string; file: File }>({
		url: url,
		file: new File([""], ""),
	});
	const imageRef = useRef<HTMLInputElement>(null);
	const handleImageBoxClick = () => {
		imageRef.current?.click();
	};

	const handleImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (e.target.files) {
			setPoster({
				url: URL.createObjectURL(e.target.files[0]),
				file: e.target.files[0],
			});
		}
	};

	const uploadImageHandler = async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		setImageUploading(true);

		const file = poster.file;
		const fileExt = file.name.split(".").pop();
		const filePath = `${user?.id}/${Math.random()}.${fileExt}`;

		const { data, error } = await supabase.storage
			.from("avatars")
			.upload(filePath, poster.file)
			.finally(() => {
				setImageUploading(false);
			});
		await supabase
			.from("profiles")
			.update({ avatar_url: data?.path })
			.eq("id", user!.id!);
	};
	return (
		<div className="form-control w-full max-w-xs mt-2">
			<label className="label" htmlFor="poster">
				Avatar
			</label>
			<div
				className="w-full h-60 border-secondary-200 border-[1px] bg-white rounded-2xl overflow-hidden cursor-pointer p-4 flex items-center justify-center"
				onClick={handleImageBoxClick}
			>
				<div className="relative h-full w-full rounded-lg overflow-hidden flex items-center justify-center">
					{imageUploading && (
						<div className="absolute w-full h-full bg-slate-400/40 top-0 right-0 flex justify-center items-center">
							<span className="loading loading-infinity loading-lg text-primary-600" />
						</div>
					)}
					{poster.url.length > 0 ? (
						<Image
							src={poster.url}
							alt="poster"
							width={320}
							height={240}
							className="object-cover w-full h-full"
						/>
					) : (
						<ImageIcon size={64} color="white" />
					)}
				</div>
			</div>
			<input
				ref={imageRef}
				name="poster"
				onChange={handleImageChange}
				type="file"
				accept="image/png, image/webp, image/jpeg"
				className="input input-bordered w-full max-w-xs hidden"
				required
			/>
			{poster.url.length > 0 && poster.url !== url && (
				<button
					onClick={uploadImageHandler}
					disabled={imageUploading}
					className="text-white flex justify-center items-center mt-2 w-full p-2 rounded-xl bg-fuelYellow"
				>
					Upload
				</button>
			)}
		</div>
	);
};

export default AvatarContainer;
