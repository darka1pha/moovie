import { TrendingsParams } from '@/types';
export { POSTER_URL, BACKDROP_URL, getPosterUrl, getBackdropUrl } from '@/lib/tmdb/image';

export const BASE_URL = 'https://api.themoviedb.org/3';

const getApiKey = (): string => {
  const key = process.env.TMDB_API_KEY;
  if (!key && process.env.NODE_ENV === 'production') {
    console.warn(
      'Warning: TMDB_API_KEY is not set. Requests to TMDB API will fail.'
    );
  }
  return key || '';
};

const appendApiKey = (url: string, params: Record<string, any> = {}) => {
  const searchParams = new URLSearchParams({ api_key: getApiKey(), ...params });
  return `${url}?${searchParams.toString()}`;
};

export const MOVIE_GENRES = appendApiKey('/genre/movie/list', {
  language: 'en',
});
export const TV_GENRES = appendApiKey('/genre/tv/list', { language: 'en' });

export const TRENDINGS = ({ media_type = 'all', pageParam }: TrendingsParams) =>
  appendApiKey(`/trending/${media_type}/day`, { page: pageParam });

export const DISCOVER = ({
  mediaType,
  genre = '',
  year = '',
  sortBy = 'popularity.desc',
  minRating = '',
  pageParam = 1,
}: {
  mediaType: string;
  genre?: string;
  year?: string;
  sortBy?: string;
  minRating?: string;
  pageParam?: number;
}) => {
  const isTv = mediaType.toLowerCase() === 'tv';
  const queryParams: Record<string, any> = {
    include_adult: 'true',
    include_video: 'false',
    language: 'en-US',
    sort_by: sortBy || 'popularity.desc',
    page: pageParam,
  };

  if (genre) {
    queryParams.with_genres = genre;
  }
  if (year) {
    if (isTv) {
      queryParams.first_air_date_year = year;
    } else {
      queryParams.primary_release_year = year;
    }
  }
  if (minRating) {
    queryParams['vote_average.gte'] = minRating;
    queryParams['vote_count.gte'] = 50; // ensure meaningful ratings
  }

  return appendApiKey(`/discover/${mediaType.toLowerCase()}`, queryParams);
};

export const POPULAR_MOVIES = ({ pageParam = 1 }: { pageParam?: number }) =>
  appendApiKey('/movie/popular', { page: pageParam });

export const TOP_RATED_MOVIES = ({ pageParam = 1 }: { pageParam?: number }) =>
  appendApiKey('/movie/top_rated', { page: pageParam });

export const UPCOMING_MOVIES = ({ pageParam = 1 }: { pageParam?: number }) =>
  appendApiKey('/movie/upcoming', { page: pageParam });

export const POPULAR_TVS = ({ pageParam = 1 }: { pageParam?: number }) =>
  appendApiKey('/tv/popular', { page: pageParam });

export const TOP_RATED_TVS = ({ pageParam = 1 }: { pageParam?: number }) =>
  appendApiKey('/tv/top_rated', { page: pageParam });

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