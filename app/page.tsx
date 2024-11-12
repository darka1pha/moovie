import { Filters, Hero, Items, ItemsLoading } from '@/components';
import { getGenres, getTrendigs } from '@/lib/services/actions/home';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  description: 'Explore the latest movies and tv shows.',
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: number; media_type: string; genre: string }>;
}) {
  const { page, media_type, genre } = await searchParams;
  const { results: bannerData } = await getTrendigs({
    page: 1,
    mediaType: 'all',
  });

  const { genres } = await getGenres({
    mediaType: media_type ?? 'movie',
  });

  const genreID =
    genre && genre.toLocaleLowerCase() !== 'all'
      ? genres.filter((item) => item.name === genre)[0].id
      : '';

  return (
    <main>
      <Hero data={bannerData.slice(0, 6)} />
      <Filters genreData={genres} />
      <Suspense fallback={<ItemsLoading />}>
        <Items
          genreID={genreID.toString()}
          mediaType={media_type}
          page={page}
        />
      </Suspense>
    </main>
  );
}
