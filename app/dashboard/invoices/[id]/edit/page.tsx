export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import Form from '@/app/ui/invoices/edit-form';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { cookies } from 'next/headers';

export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  if (!id) {
    throw new Error('Invoice ID is missing from route params');
  }

  // ===== ambil lang dari COOKIE =====
  const lang: 'id' | 'en' =
    (await cookies()).get('lang')?.value === 'en' ? 'en' : 'id';

  // ===== data =====
  const invoice = await fetchInvoiceById(id);
  const customers = await fetchCustomers();

  return <Form lang={lang} invoice={invoice} customers={customers} />;
}
