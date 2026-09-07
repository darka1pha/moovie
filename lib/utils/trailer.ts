import { VideoResult } from '@/types';

/**
 * Priority rank for video types:
 * Official Trailers > Trailers > Official Teasers > Teasers > Featurettes > Clips > Others
 */
function getVideoRank(video: VideoResult): number {
  const type = (video.type || '').toLowerCase();
  const isOfficial = Boolean(video.official);

  if (type === 'trailer') {
    return isOfficial ? 100 : 90;
  }
  if (type === 'teaser') {
    return isOfficial ? 80 : 70;
  }
  if (type === 'clip') {
    return isOfficial ? 60 : 50;
  }
  if (type === 'featurette') {
    return isOfficial ? 40 : 30;
  }
  if (type === 'behind the scenes') {
    return 20;
  }
  return 10;
}

/**
 * Filter and sort videos prioritizing YouTube, Official Trailers, high resolution, and recent release.
 */
export function prioritizeVideos(videos: VideoResult[] = []): VideoResult[] {
  if (!videos || !Array.isArray(videos)) return [];

  // TMDB primarily supports YouTube and Vimeo. Focus on YouTube as the premier player.
  const youtubeVideos = videos.filter(
    (v) => v.site?.toLowerCase() === 'youtube' && Boolean(v.key)
  );

  // Deduplicate by YouTube video key so each pill is genuinely a unique video
  const seenKeys = new Set<string>();
  const uniqueVideos: VideoResult[] = [];
  for (const v of youtubeVideos) {
    if (!seenKeys.has(v.key)) {
      seenKeys.add(v.key);
      uniqueVideos.push(v);
    }
  }

  return uniqueVideos.sort((a, b) => {
    const rankA = getVideoRank(a);
    const rankB = getVideoRank(b);

    if (rankB !== rankA) {
      return rankB - rankA;
    }

    // Secondary: higher resolution first (e.g. 2160 > 1080 > 720)
    const sizeA = a.size || 0;
    const sizeB = b.size || 0;
    if (sizeB !== sizeA) {
      return sizeB - sizeA;
    }

    // Tertiary: newest published date
    const dateA = a.published_at ? new Date(a.published_at).getTime() : 0;
    const dateB = b.published_at ? new Date(b.published_at).getTime() : 0;
    return dateB - dateA;
  });
}

/**
 * Returns the single best trailer or teaser video, or null if none exist.
 */
export function getBestTrailer(videos: VideoResult[] = []): VideoResult | null {
  const sorted = prioritizeVideos(videos);
  return sorted.length > 0 ? sorted[0] : null;
}

/**
 * Generate a reliable, embeddable YouTube URL with autoplay and theater optimizations.
 */
export function getYouTubeEmbedUrl(
  videoKey: string,
  options: {
    autoplay?: boolean;
    mute?: boolean;
    rel?: number;
  } = {}
): string {
  const {
    autoplay = true,
    mute = false,
    rel = 0,
  } = options;

  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    mute: mute ? '1' : '0',
    rel: rel.toString(),
    playsinline: '1',
  });

  return `https://www.youtube.com/embed/${videoKey}?${params.toString()}`;
}
