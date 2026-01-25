import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang: 'id' | 'en' =
    (await cookies()).get('lang')?.value === 'en' ? 'en' : 'id';

  return (
    <html lang={lang}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
