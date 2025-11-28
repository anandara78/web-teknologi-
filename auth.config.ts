import type { NextAuthConfig } from 'next-auth';
// --- TAMBAHKAN IMPORT INI ---
import Credentials from 'next-auth/providers/credentials'; 
// ----------------------------

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl} }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            
            // Logika 1: Jika berada di dashboard
            if (isOnDashboard) {
                if (isLoggedIn) return true; // Izinkan jika sudah login
                return false; // Redirect ke /login jika belum login
            }
            
            // Logika 2: Jika sudah login tapi mencoba mengakses halaman yang tidak diproteksi (misal: /login)
            else if (isLoggedIn) {
                // Redirect user yang sudah login dari halaman login/root ke dashboard
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            
            // Logika 3: Izinkan akses ke halaman publik (kecuali sudah di-handle di Logika 2)
            return true;
        },
    },
    // --- TAMBAHKAN INI ---
    // Di file ini, kita hanya mendefinisikan bahwa ada provider 'credentials'.
    // Logika verifikasinya (authorize) akan berada di file utama 'auth.ts'.
    providers: [
        Credentials({}), 
    ],
    // ----------------------
} satisfies NextAuthConfig;