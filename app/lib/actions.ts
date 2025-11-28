'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { signOut } from '@/auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // Panggil signIn, Auth.js akan otomatis mencari 'credentials' provider 
    // dan menjalankan logika di file auth.ts Anda.
    await signIn('credentials', formData); 
    // Jika signIn berhasil tanpa error, redirect user ke dashboard.
    // Catatan: NextAuth v5/Auth.js handles the redirect internally 
    // when using credentials, but explicit redirect is sometimes safer.
    // Jika Anda ingin mengontrol redirect:
    // redirect('/dashboard'); // <-- Opsional, tergantung konfigurasi Auth.js Anda

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          // Error ini dikembalikan ketika logika Authorize di auth.ts mengembalikan null/gagal.
          return 'Email atau Kata Sandi salah.'; // <-- Pesan error yang lebih ramah
        default:
          return 'Terjadi kesalahan yang tidak terduga.';
      }
    }

    // Penting: Throw error selain AuthError untuk penanganan error Next.js yang lebih baik
    throw error;
  }
}

export async function logout() {
    await signOut();
    redirect('/login');
}