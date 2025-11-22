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
import { authenticate } from '@/app/lib/actions'; // PERBAIKAN 1: Tambah '@/'

export default function Page() {
  // PERBAIKAN 2: Implementasi useActionState
  // argumen kedua (undefined) adalah initial state
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <Image
          src="/logo/uia-logo.png"
          width={500}
          height={360}
          className="hidden md:block"
          alt="Banner UIA"
        />
      </div>

      <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20 m-auto">
        {/* PERBAIKAN 3: Pasang action={formAction} */}
        <form action={formAction} className="space-y-4">
          
          {/* PERBAIKAN 4: Tambah backticks (`) */}
          <h1 className={`${lusitana.className} mb-3 text-2xl`}>
            Silahkan Masuk dengan akun Anda.
          </h1>

          <div>
            <label
              className="mb-2 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Ketikkan alamat email"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div>
            <label
              className="mb-2 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Kata Sandi
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Ketikkan kata sandi"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          {/* PERBAIKAN 5: Tambah aria-disabled untuk status loading */}
          <Button className="mt-4 w-full flex items-center justify-center gap-2" aria-disabled={isPending}>
            Masuk
            <ArrowRightIcon className="h-5 w-5 text-gray-50" />
          </Button>

          {/* PERBAIKAN 6: Tampilkan Error Message jika ada */}
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
