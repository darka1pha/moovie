'use client';

import { useSyncExternalStore, useMemo } from 'react';
import DOMPurify from 'dompurify';

const SANITIZE_OPTIONS = {
  ALLOWED_TAGS: [
    'b',
    'i',
    'u',
    's',
    'em',
    'strong',
    'a',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'abbr',
    'p',
    'address',
    'q',
    'blockquote',
    'pre',
    'img',
    'video',
    'iframe',
    'audio',
    'source',
    'br',
    'ul',
    'ol',
    'li',
  ],
  ALLOWED_ATTR: [
    'href',
    'dir',
    'src',
    'alt',
    'style',
    'class',
    'controls',
    'width',
    'height',
    'target',
    'rel',
  ],
};

const emptySubscribe = () => () => {};

const DOMPurifyContent = ({ content }: { content: string }) => {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const cleanedHTML = useMemo(() => {
    if (!isClient) return '';
    return DOMPurify.sanitize(content, SANITIZE_OPTIONS);
  }, [content, isClient]);

  return (
    <div
      className='leading-relaxed text-neutral-300 text-sm [&_a]:text-fuelYellow [&_a]:underline [&_p]:mb-3'
      dangerouslySetInnerHTML={{ __html: cleanedHTML }}
    />
  );
};

export default DOMPurifyContent;
