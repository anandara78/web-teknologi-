'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { t } from '@/app/lib/i18n/i18n';

export default function Pagination({
  lang,
  totalPages,
  currentPage,
}: {
  lang: 'id' | 'en';
  totalPages: number;
  currentPage: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const tr = t(lang);

  function createPageURL(pageNumber: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => createPageURL(currentPage - 1)}
        disabled={currentPage <= 1}
        className="rounded border px-3 py-1 disabled:opacity-50"
      >
        {tr.prev}
      </button>

      <span className="text-sm">
        {tr.page} {currentPage} {tr.of} {totalPages}
      </span>

      <button
        onClick={() => createPageURL(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="rounded border px-3 py-1 disabled:opacity-50"
      >
        {tr.next}
      </button>
    </div>
  );
}
