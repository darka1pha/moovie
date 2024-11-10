import { NextRequest, NextResponse } from 'next/server';
import { parseHTML } from 'linkedom';

export const dynamic = 'force-dynamic'; // Allows the route to evaluate dynamically

function getHostname() {
  if (process.env.NODE_ENV === 'development') {
    return 'localhost:3000';
  }
  if (process.env.VERCEL_ENV === 'production') {
    return process.env.VERCEL_PROJECT_PRODUCTION_URL;
  }
  return process.env.VERCEL_BRANCH_URL;
}

export async function GET(
  _: NextRequest,
  { params }: { params: { rest: string[] } } // Removed the Promise wrapper around params
) {
  const schema = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const host = getHostname();

  if (!host) {
    return new Response('Failed to get hostname from env', { status: 500 });
  }

  // Ensure `params.rest` has values to prevent fetching empty paths
  if (!params.rest || params.rest.length === 0) {
    return new Response('Missing URL parameter', { status: 400 });
  }

  const href = params.rest.join('/');
  const url = `${schema}://${host}/${href}`;
  console.log('Fetching URL:', url); // For debugging purposes

  const response = await fetch(url);
  if (!response.ok) {
    return new Response('Failed to fetch', { status: response.status });
  }

  const body = await response.text();
  const { document } = parseHTML(body);
  const images = Array.from(document.querySelectorAll('img'))
    .map((img) => ({
      srcset: img.getAttribute('srcset') || img.getAttribute('srcSet') || '',
      sizes: img.getAttribute('sizes') || '',
      src: img.getAttribute('src') || '',
      alt: img.getAttribute('alt') || '',
      loading: img.getAttribute('loading') || 'auto',
    }))
    .filter((img) => img.src); // Only include images with a valid `src`

  return NextResponse.json(
    { images },
    {
      headers: {
        'Cache-Control': 'public, max-age=3600',
      },
    }
  );
}
