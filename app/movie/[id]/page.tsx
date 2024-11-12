import { Movies, Reviews, SimilarItems } from '@/components';
import Credits from '@/components/show/credits';
import { getDiscovers } from '@/lib/services/actions/home';
import {
  getMovieCredits,
  getMovieDetails,
  getMovieReviews,
  getSimilarMovies,
} from '@/lib/services/actions/shows';
import { POSTER_URL } from '@/lib/services/actions/urls';

interface MetadataProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({ params }: MetadataProps) => {
  const { id } = await params;
  const data = await getMovieDetails({ id });
  return {
    title: data.original_title,
    description: data.overview,
    alternates: {
      canonical: `/movie/${id}`,
    },
    openGraph: {
      title: data?.original_title,
      description: data?.overview,
      images: [
        {
          url: `${POSTER_URL({ quality: 'w500' })}${data.poster_path}`,
        },
      ],
    },
    twitter: {
      title: data?.original_title,
      description: data?.overview,
      images: [
        {
          url: `${POSTER_URL({ quality: 'w500' })}${data.poster_path}`,
        },
      ],
      card: 'summary_large_image',
    },
  };
};

export const generateStaticParams = async () => {
  const { results } = await getDiscovers({
    genre: '',
    mediaType: 'movie',
  });

  if (!results) return [];

  return results.map(({ id }) => ({
    id: id.toString(),
  }));
};

const MoviePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const [data, credits, reviews, similars] = await Promise.all([
    getMovieDetails({ id }),
    getMovieCredits({ id }),
    getMovieReviews({ id }),
    getSimilarMovies({ id }),
  ]);

  return (
    <div>
      <Movies
        id={id}
        data={data}
      />
      <Credits data={credits} />
      {reviews.results.length > 0 && <Reviews data={reviews} />}
      <SimilarItems data={similars} />
    </div>
  );
};

export default MoviePage;
