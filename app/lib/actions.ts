'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

/* =========================
   AUTH
========================= */

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

/* =========================
   CREATE INVOICE
========================= */

export async function createInvoice(formData: FormData) {
  const customerId = formData.get('customerId')?.toString();
  const amountStr = formData.get('amount')?.toString();
  const status = formData.get('status')?.toString();

  if (!customerId || !amountStr || !status) {
    throw new Error('Missing fields');
  }

  const amount = Math.round(Number(amountStr) * 100);

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amount}, ${status}, NOW())
  `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

/* =========================
   UPDATE INVOICE
========================= */

export async function updateInvoice(id: string, formData: FormData) {
  const customerId = formData.get('customerId')?.toString();
  const amountStr = formData.get('amount')?.toString();
  const status = formData.get('status')?.toString();

  if (!customerId || !amountStr || !status) {
    throw new Error('Missing fields');
  }

  const amount = Math.round(Number(amountStr) * 100);

  await sql`
    UPDATE invoices
    SET customer_id = ${customerId},
        amount = ${amount},
        status = ${status}
    WHERE id = ${id}
  `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}


/* =========================
   DELETE INVOICE
========================= */

export async function deleteInvoice(formData: FormData) {
  const id = formData.get('id')?.toString();

  if (!id) return;

  await sql`
    DELETE FROM invoices
    WHERE id = ${id}
  `;

  revalidatePath('/dashboard/invoices');
}
