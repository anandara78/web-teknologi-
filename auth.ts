import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
// Ganti impor sql dengan impor fungsi yang sudah dibuat
import { getUserByEmail } from '@/app/lib/data'; 
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';


// Catatan: Fungsi getUser yang lama dihapus, kita pakai getUserByEmail dari /lib/data
// Pastikan getUserByEmail di /lib/data.ts Anda mengambil id, name, email, dan "password".


export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'credentials',
      // Jika Anda tidak menggunakan default, ini opsional
      // credentials: {
      //   email: { label: "Email", type: "email" },
      //   password: { label: "Password", type: "password" }
      // },
      
      async authorize(credentials) {
        // 1. Validasi Input
        const parsedCredentials = z
          .object({ 
            email: z.string().email(), 
            password: z.string().min(1) // Ubah min(6) menjadi min(1) karena password angka mungkin pendek
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          
          // 2. Ambil User dari Database
          const user = await getUserByEmail(email); // Menggunakan fungsi dari /lib/data.ts
          if (!user) {
            console.log('User not found');
            return null;
          }
          
          // 3. Verifikasi Password
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            // 4. Sukses: HAPUS hash password sebelum disimpan ke sesi
            // Menggunakan rest operator untuk menghilangkan properti 'password'
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword; 
          }
        }

        // 5. Gagal
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  useSecureCookies: process.env.NODE_ENV === 'production',
});