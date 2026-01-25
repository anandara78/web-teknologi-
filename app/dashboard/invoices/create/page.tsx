import Form from '@/app/ui/invoices/create-form';
import { fetchCustomers } from '@/app/lib/data';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function Page() {
  // ===== ambil lang dari COOKIE =====
  const cookieStore = cookies();
  const langCookie = (await cookieStore).get('lang')?.value;
  const lang: 'id' | 'en' = langCookie === 'en' ? 'en' : 'id';

  // ===== data =====
  const customers = await fetchCustomers();

  return <Form lang={lang} customers={customers} />;
}
