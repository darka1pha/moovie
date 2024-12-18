import { Reviews, SimilarItems, Tvs } from '@/components';
import Credits from '@/components/show/credits';
import { getDiscovers } from '@/app/actions/home';
import {
  getSimilarTvs,
  getTvCredits,
  getTvDetails,
  getTvReviews,
} from '@/app/actions/shows';
import { POSTER_URL } from '@/app/actions/urls';

interface MetadataProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({ params }: MetadataProps) => {
  const { id } = await params;
  const data = await getTvDetails({ id });
  return {
    title: data.original_name,
    description: data.overview,
    alternates: {
      canonical: `/tv/${id}`,
    },
    openGraph: {
      title: data?.original_name,
      description: data?.overview,
      url: `/tv/${id}`,
      images: [
        {
          url: `${POSTER_URL({ quality: 'w500' })}${data.poster_path}`,
        },
      ],
    },
    twitter: {
      title: data?.original_name,
      description: data?.overview,
      url: `/tv/${id}`,
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
    mediaType: 'tv',
  });

  if (!results) return [];

  return results.map(({ id }) => ({
    id: id.toString(),
  }));
};

const TvPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const [data, credits, reviews, similars] = await Promise.all([
    getTvDetails({ id }),
    getTvCredits({ id }),
    getTvReviews({ id }),
    getSimilarTvs({ id }),
  ]);
  return (
    <div>
      <Tvs
        id={id}
        data={data}
      />
      <Credits data={credits} />
      {reviews.results.length > 0 && <Reviews data={reviews} />}
      <SimilarItems data={similars} />
    </div>
  );
};

export default TvPage;
