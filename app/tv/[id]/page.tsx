import Tvs from '@/components/show/tvs';
import Reviews from '@/components/reviews';
import SimilarItems from '@/components/similarItems';
import Credits from '@/components/show/credits';
import { getDiscovers } from '@/app/actions/home';
import {
  getSimilarTvs,
  getTvCredits,
  getTvDetails,
  getTvReviews,
} from '@/app/actions/shows';
import { POSTER_URL } from '@/lib/tmdb/image';
import { notFound } from 'next/navigation';

interface MetadataProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({ params }: MetadataProps) => {
  try {
    const { id } = await params;
    const data = await getTvDetails({ id });
    const title = data.original_name || 'TV Show Details';
    const overview = data.overview || 'Watch and explore TV show details on Moovie.';
    const imageUrl = data.poster_path
      ? `${POSTER_URL({ quality: 'w500' })}${data.poster_path}`
      : undefined;

    return {
      title,
      description: overview,
      alternates: {
        canonical: `/tv/${id}`,
      },
      openGraph: {
        title,
        description: overview,
        url: `/tv/${id}`,
        images: imageUrl ? [{ url: imageUrl }] : [],
      },
      twitter: {
        title,
        description: overview,
        card: 'summary_large_image',
        images: imageUrl ? [{ url: imageUrl }] : [],
      },
    };
  } catch {
    return {
      title: 'TV Show Details',
      description: 'Explore details and reviews on Moovie.',
    };
  }
};

export const generateStaticParams = async () => {
  try {
    const { results } = await getDiscovers({
      genre: '',
      mediaType: 'tv',
    });

    if (!results) return [];

    return results.map(({ id }) => ({
      id: id.toString(),
    }));
  } catch {
    return [];
  }
};

const TvPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  let data: Awaited<ReturnType<typeof getTvDetails>> | null = null;
  let credits: Awaited<ReturnType<typeof getTvCredits>> | null = null;
  let reviews: Awaited<ReturnType<typeof getTvReviews>> | null = null;
  let similars: Awaited<ReturnType<typeof getSimilarTvs>> | null = null;

  try {
    [data, credits, reviews, similars] = await Promise.all([
      getTvDetails({ id }),
      getTvCredits({ id }),
      getTvReviews({ id }),
      getSimilarTvs({ id }),
    ]);
  } catch {
    notFound();
  }

  if (!data) {
    notFound();
  }

  return (
    <div>
      <Tvs id={id} data={data} />
      {credits && <Credits data={credits} />}
      {reviews?.results && reviews.results.length > 0 && <Reviews data={reviews} />}
      {similars && <SimilarItems data={similars} />}
    </div>
  );
};

export default TvPage;
