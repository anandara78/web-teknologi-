'use client';

import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import { t } from '@/app/lib/i18n/i18n';

export default function Page() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang') === 'en' ? 'en' : 'id') as 'id' | 'en';
  const tr = t(lang);

  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <Image
          src="/logo/uia-logo.png"
          width={500}
          height={160}
          className="hidden md:block"
          alt="Banner UIA"
        />
      </div>

      <div className="m-auto flex flex-col justify-center gap-8 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
        <form action={formAction} className="space-y-3">
          <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
            <h1 className={`${lusitana.className} mb-3 text-2xl`}>
              {tr.loginTitle}
            </h1>

            <div className="w-full">
              {/* ================= EMAIL ================= */}
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="email"
                >
                  {tr.email}
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="email"
                    type="email"
                    name="email"
                    placeholder={tr.enterEmail}
                    required
                  />
                  <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>

              {/* ================= PASSWORD ================= */}
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="password"
                >
                  {tr.password}
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="password"
                    type="password"
                    name="password"
                    placeholder={tr.enterPassword}
                    required
                    minLength={6}
                  />
                  <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
            </div>

            {/* ================= SUBMIT ================= */}
            <Button className="mt-4 w-full" disabled={isPending}>
              {tr.login}
              <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
            </Button>

            {/* ================= ERROR ================= */}
            <div className="flex h-8 items-end space-x-1">
              {errorMessage && (
                <>
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
