import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal } from '@/app/lib/utils';
import { InvoicesTable as InvoiceType } from '@/app/lib/definitions';
import { t } from '@/app/lib/i18n/i18n';

function formatMoney(amount: number, lang: 'id' | 'en') {
  return new Intl.NumberFormat(lang === 'id' ? 'id-ID' : 'en-US', {
    style: 'currency',
    currency: 'IDR',
  }).format(amount / 100);
}

export default function InvoicesTable({
  lang,
  invoices,
}: {
  lang: 'id' | 'en';
  invoices: InvoiceType[];
}) {
  const tr = t(lang);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* ================= MOBILE ================= */}
          <div className="md:hidden">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={invoice.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <p>{invoice.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{invoice.email}</p>
                  </div>
                  <InvoiceStatus lang={lang} status={invoice.status} />
                </div>

                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatMoney(invoice.amount, lang)}
                    </p>
                    <p>{formatDateToLocal(invoice.date, lang)}</p>
                  </div>

                  <div className="flex justify-end gap-2">
                    <UpdateInvoice lang={lang} id={invoice.id} />
                    <DeleteInvoice lang={lang} id={invoice.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ================= DESKTOP ================= */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th className="px-4 py-5 font-medium sm:pl-6">
                  {tr.customers}
                </th>
                <th className="px-3 py-5 font-medium">{tr.email}</th>
                <th className="px-3 py-5 font-medium">{tr.amount}</th>
                <th className="px-3 py-5 font-medium">{tr.date}</th>
                <th className="px-3 py-5 font-medium">{tr.status}</th>
                <th className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">{tr.edit}</span>
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none
                  [&:first-child>td:first-child]:rounded-tl-lg
                  [&:first-child>td:last-child]:rounded-tr-lg
                  [&:last-child>td:first-child]:rounded-bl-lg
                  [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={invoice.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <p>{invoice.name}</p>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.email}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    {formatMoney(invoice.amount, lang)}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(invoice.date, lang)}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    <InvoiceStatus lang={lang} status={invoice.status} />
                  </td>

                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice lang={lang} id={invoice.id} />
                      <DeleteInvoice lang={lang} id={invoice.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
