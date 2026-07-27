import { TrendingsParams } from '@/types';

const API_KEY = process.env.TMDB_API_KEY as string;
export const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGES_BASE_URL = 'https://image.tmdb.org/t/p/';

if (!API_KEY) {
  throw new Error(
    'TMDB_API_KEY is not set. Add it to your .env.local file (server-only, no NEXT_PUBLIC_ prefix).'
  );
}

interface ImageUrl {
  quality: 'w92' | 'w154' | 'w185' | 'w300' | 'w500' | 'original';
}

interface BackdropUrl {
  quality: 'w300' | 'w780' | 'w1280' | 'original';
}

const appendApiKey = (url: string, params: Record<string, any> = {}) => {
  const searchParams = new URLSearchParams({ api_key: API_KEY, ...params });
  return `${url}?${searchParams.toString()}`;
};

export const POSTER_URL = ({ quality }: ImageUrl) =>
  `${IMAGES_BASE_URL}${quality}`;
export const BACKDROP_URL = ({ quality }: BackdropUrl) =>
  `${IMAGES_BASE_URL}${quality}`;

export const MOVIE_GENRES = appendApiKey('/genre/movie/list', {
  language: 'en',
});
export const TV_GENRES = appendApiKey('/genre/tv/list', { language: 'en' });

export const TRENDINGS = ({ media_type = 'all', pageParam }: TrendingsParams) =>
  appendApiKey(`/trending/${media_type}/day`, { page: pageParam });

export const DISCOVER = ({
  mediaType,
  genre = '',
  pageParam = 1,
}: {
  mediaType: string;
  genre?: string;
  pageParam?: number;
}) =>
  appendApiKey(`/discover/${mediaType.toLowerCase()}`, {
    include_adult: 'true',
    include_video: 'false',
    language: 'en-US',
    sort_by: 'popularity.desc',
    page: pageParam,
    ...(genre && { with_genres: genre }),
  });

export const POPULAR_MOVIES = ({ pageParam }: { pageParam: number }) =>
  appendApiKey('/movie/popular', { page: pageParam });

export const POPULAR_TVS = ({ pageParam }: { pageParam: number }) =>
  appendApiKey('/tv/popular', { page: pageParam });

export const MOVIE_DETAILS = (id: string) => appendApiKey(`/movie/${id}`);
export const MOVIE_CREDITS = (id: string) =>
  appendApiKey(`/movie/${id}/credits`, { language: 'en-US' });
export const MOVIE_REVIEWS = (id: string) =>
  appendApiKey(`/movie/${id}/reviews`, { language: 'en-US' });
export const MOVIE_SIMILARS = (id: string) =>
  appendApiKey(`/movie/${id}/similar`);

export const TV_DETAILS = (id: string) => appendApiKey(`/tv/${id}`);
export const TV_CREDITS = (id: string) =>
  appendApiKey(`/tv/${id}/credits`, { language: 'en-US' });
export const TV_REVIEWS = (id: string) =>
  appendApiKey(`/tv/${id}/reviews`, { language: 'en-US' });
export const TV_SIMILARS = (id: string) => appendApiKey(`/tv/${id}/similar`);

export const MULTI_SEARCH = (query: string, pageParam: number) =>
  appendApiKey('/search/multi', { query, page: pageParam });

export const MOVIE_SEARCH = (query: string, pageParam: number) =>
  appendApiKey('/search/movie', { query, page: pageParam });

export const TV_SEARCH = (query: string, pageParam: number) =>
  appendApiKey('/search/tv', { query, page: pageParam });