import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import Image from 'next/image';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import { t } from '@/app/lib/i18n/i18n';

export default function SideNav({ lang }: { lang: 'id' | 'en' }) {
  const tr = t(lang);

  return (
    <div className="flex h-full flex-col px-3 py-4">
      {/* LOGO */}
      <Link
        className="mb-4 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4"
        href="/dashboard"
      >
        <Image
          src="/logo/uia-logo.png"
          width={160}
          height={60}
          alt="UIA Logo"
          className="object-contain"
        />
      </Link>

      {/* LINKS */}
      <div className="flex flex-1 flex-col gap-2">
        <NavLinks lang={lang} />

        <div className="flex-1" />

        {/* LOGOUT */}
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex w-full items-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600">
            <PowerIcon className="w-5" />
            <span>{tr.signOut}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
