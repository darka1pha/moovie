'use client';

import { useSearchParams } from 'next/navigation';
import { InfoCircle, Warning2 } from 'iconsax-react';

export default function Messages() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const message = searchParams.get('message');

  if (!error && !message) return null;

  return (
    <div className="mt-4 flex flex-col gap-2">
      {error && (
        <div
          role="alert"
          className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm rounded-xl"
        >
          <Warning2 size={18} className="shrink-0" color="#f87171" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
      {message && (
        <div
          role="status"
          className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm rounded-xl"
        >
          <InfoCircle size={18} className="shrink-0" color="#34d399" aria-hidden="true" />
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}
