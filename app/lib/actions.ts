'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

// 1. Skema Validasi untuk Create Invoice
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

// 2. Fungsi untuk Membuat Invoice Baru (Versi Perbaikan)
export async function createInvoice(formData: FormData): Promise<void> {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // Karena return type-nya Promise<void>, kita gunakan console.error 
    // atau throw error agar sesuai dengan standar Server Action tanpa state
    console.error('Database Error:', error);
    throw new Error('Database Error: Gagal Membuat Invoice.');
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// 3. Fungsi Autentikasi
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
          return 'Email atau Kata Sandi salah.';
        default:
          return 'Terjadi kesalahan yang tidak terduga.';
      }
    }
    throw error;
  }
}

// 4. Fungsi Logout
export async function logout() {
  await signOut();
  redirect('/login');
}