'use client';
import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

const DOMPurifyContent = ({ content }: { content: string }) => {
  const [cleanedHTML, setCleanedHTML] = useState('');
  useEffect(() => {
    const sanitizedHTML = DOMPurify.sanitize(content, {
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
      ],
    });
    setCleanedHTML(sanitizedHTML);
  }, [content]);

  return (
    <div
      className='leading-9'
      dangerouslySetInnerHTML={{ __html: cleanedHTML }}
    />
  );
};

export default DOMPurifyContent;
