// lib/tmdb/image.ts
const IMAGES_BASE_URL = "https://image.tmdb.org/t/p/";

export type PosterQuality = "w92" | "w154" | "w185" | "w300" | "w500" | "original";
export type BackdropQuality = "w300" | "w780" | "w1280" | "original";

export interface ImageUrlOptions {
	quality: PosterQuality;
}

export interface BackdropUrlOptions {
	quality: BackdropQuality;
}

export const POSTER_URL = ({ quality = "w300" }: ImageUrlOptions): string =>
	`${IMAGES_BASE_URL}${quality}`;

export const BACKDROP_URL = ({ quality = "w1280" }: BackdropUrlOptions): string =>
	`${IMAGES_BASE_URL}${quality}`;

export const getPosterUrl = (
	path: string | null | undefined,
	quality: PosterQuality = "w500"
): string | null => {
	if (!path) return null;
	return `${IMAGES_BASE_URL}${quality}${path}`;
};

export const getBackdropUrl = (
	path: string | null | undefined,
	quality: BackdropQuality = "w1280"
): string | null => {
	if (!path) return null;
	return `${IMAGES_BASE_URL}${quality}${path}`;
};

export const getReviewerAvatarUrl = (avatarPath?: string | null): string | null => {
	if (!avatarPath) return null;
	if (avatarPath.startsWith("/http://") || avatarPath.startsWith("/https://")) {
		return avatarPath.slice(1);
	}
	if (avatarPath.startsWith("http://") || avatarPath.startsWith("https://")) {
		return avatarPath;
	}
	return `${IMAGES_BASE_URL}w185${avatarPath}`;
};

