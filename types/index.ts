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
  profile_path?: string | null;
  known_for_department?: string;
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
  name?: string;
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

export interface WatchProvider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface CountryWatchProviders {
  link: string;
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
  ads?: WatchProvider[];
  free?: WatchProvider[];
}

export interface WatchProvidersResponse {
  id: number;
  results: Record<string, CountryWatchProviders>;
}

export interface PersonDetails {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  known_for_department: string;
  popularity: number;
  also_known_as: string[];
  gender: number;
  imdb_id: string | null;
  homepage: string | null;
}

export interface PersonCreditItem {
  id: number;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  media_type: 'movie' | 'tv';
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  character?: string;
  job?: string;
  department?: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  overview: string;
}

export interface PersonCombinedCredits {
  id: number;
  cast: PersonCreditItem[];
  crew: PersonCreditItem[];
}

export interface ImageItem {
  file_path: string;
  width: number;
  height: number;
  aspect_ratio: number;
  vote_average: number;
  vote_count: number;
  iso_639_1?: string | null;
}

export interface ShowImagesResponse {
  id: number;
  backdrops: ImageItem[];
  posters: ImageItem[];
  logos: ImageItem[];
}
