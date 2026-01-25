import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice } from '@/app/lib/actions';
import { t } from '@/app/lib/i18n/i18n';

export function CreateInvoice({ lang }: { lang: 'id' | 'en' }) {
  const tr = t(lang);

  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">{tr.createInvoice}</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({
  id,
  lang,
}: {
  id: string;
  lang: 'id' | 'en';
}) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
      aria-label={t(lang).edit}
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({
  id,
  lang,
}: {
  id: string;
  lang: 'id' | 'en';
}) {
  const tr = t(lang);

  return (
    <form action={deleteInvoice}>
      <input type="hidden" name="id" value={id} />

      <button
        type="submit"
        className="rounded-md border p-2 hover:bg-gray-100"
        aria-label={tr.delete}
      >
        <span className="sr-only">{tr.delete}</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
