export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import Form from '@/app/ui/invoices/edit-form';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { cookies } from 'next/headers';

export default async function Page({
  params,
}: {
  // 1. Definisikan params sebagai Promise sesuai standar Next.js terbaru
  params: Promise<{ id: string }>;
}) {
  // 2. "Unwrap" params menggunakan await
  const { id } = await params;

  if (!id) {
    throw new Error('Invoice ID is missing from route params');
  }

  // 3. Cookies juga harus di-await di versi terbaru
  const cookieStore = await cookies();
  const lang: 'id' | 'en' = cookieStore.get('lang')?.value === 'en' ? 'en' : 'id';

  // 4. Ambil data (menggunakan Promise.all agar lebih efisien)
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    throw new Error('Invoice tidak ditemukan');
  }

  return <Form lang={lang} invoice={invoice} customers={customers} />;
}