import SideNav from '@/app/ui/dashboard/sidenav';
import LanguageSwitch from '@/app/ui/language-switch';
import { cookies } from 'next/headers';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const langCookie = (await cookieStore).get('lang')?.value;
  const lang: 'id' | 'en' = langCookie === 'en' ? 'en' : 'id';

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      {/* SIDEBAR */}
      <div className="w-full flex-none md:w-64">
        <SideNav lang={lang} />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-grow md:overflow-y-auto">
        {/* TOP BAR */}
        <div className="flex justify-end p-4 border-b bg-white">
          <LanguageSwitch />
        </div>

        {/* PAGE CONTENT */}
        <div className="p-6 md:p-12">{children}</div>
      </div>
    </div>
  );
}
