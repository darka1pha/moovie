export interface ListResults {
  adult: boolean;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  media_type?: 'tv' | 'movie' | 'person';
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  genre_ids: Array<number>;
  original_title?: string;
  id: number;
}

export interface Cast {
  id?: number;
  name: string;
  original_name?: string;
  orginal_name?: string;
  profile_path: string | null;
  character: string;
  order?: number;
  known_for_department?: string;
}

export interface CreditsProps {
  cast: Cast[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Genres {
  genres: Genre[];
}

export interface IPaginatedData<T> {
  page: number;
  results: Array<T>;
  total_pages: number;
}

export interface TrendingsParams {
  media_type: 'all' | 'movie' | 'tv' | 'person';
  pageParam?: number;
}

export interface MovieDetails {
  id: number;
  adult: boolean;
  backdrop_path: string | null;
  budget: number;
  genres: Array<{
    name: string;
  }>;
  original_title: string;
  poster_path: string | null;
  vote_average: number;
  video: boolean;
  title: string;
  release_date: string;
  runtime: number;
  tagline: string | null;
  overview: string;
  status: string;
}

export interface TvDetails {
  id: number;
  backdrop_path: string | null;
  episode_run_time: Array<number>;
  first_air_date: string;
  last_air_date: string;
  number_of_episodes: number;
  number_of_seasons: number;
  genres: Array<{
    name: string;
  }>;
  original_name: string;
  poster_path: string | null;
  vote_average: number;
  video: boolean;
  tagline: string | null;
  overview: string;
  status: string;
}

export interface Review {
  delay?: number;
  id?: string;
  author: string;
  author_details?: {
    name?: string;
    username?: string;
    avatar_path?: string | null;
    rating?: number | null;
  };
  content: string;
  created_at: string;
  url?: string;
}

export interface ReviewList {
  id: number;
  page: number;
  results: Review[];
}

export interface VideoResult {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface VideosResponse {
  id: number;
  results: VideoResult[];
}