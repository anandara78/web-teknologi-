export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import Table from '@/app/ui/customers/table';
import Pagination from '@/app/ui/customers/pagination';
import { fetchCustomersPages } from '@/app/lib/data';
import { t } from '@/app/lib/i18n/i18n';
import { cookies } from 'next/headers';

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  // ===== ambil query & page dari URL =====
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  // ===== ambil lang dari COOKIE =====
  const lang: 'id' | 'en' =
    (await cookies()).get('lang')?.value === 'en' ? 'en' : 'id';

  const tr = t(lang);

  // ===== data =====
  const totalPages = await fetchCustomersPages(query);

  return (
    <div className="w-full">
      <Suspense key={query + currentPage} fallback={<p>{tr.loading}</p>}>
        <Table lang={lang} query={query} currentPage={currentPage} />
      </Suspense>

      <div className="mt-5 flex w-full justify-center">
        <Pagination lang={lang} totalPages={totalPages} currentPage={0} />
      </div>
    </div>
  );
}
