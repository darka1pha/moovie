import { getDiscovers } from '@/lib/services/actions/home';

const URL = 'https://moovie.darkalpha.ir';

export default async function sitemap() {
  const { results: movies } = await getDiscovers({
    genre: '',
    mediaType: 'movie',
  });

  const { results: tvs } = await getDiscovers({
    genre: '',
    mediaType: 'tv',
  });

  const posts = [
    ...movies.map(({ id }) => ({
      url: `${URL}/movie/${id}`,
      lastModified: new Date().toISOString(),
    })),
    ...tvs.map(({ id }) => ({
      url: `${URL}/tv/${id}`,
      lastModified: new Date().toISOString(),
    })),
  ];

  const routes = [''].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...posts];
}
