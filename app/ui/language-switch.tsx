'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LanguageSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [currentLang, setCurrentLang] = useState<'id' | 'en'>('id');

  useEffect(() => {
    const match = document.cookie.match(/(^| )lang=([^;]+)/);
    if (match?.[2] === 'en') setCurrentLang('en');
  }, []);

  function setLang(lang: 'id' | 'en') {
    document.cookie = `lang=${lang}; path=/`;

    const newParams = new URLSearchParams(params.toString());
    // ❌ JANGAN SIMPAN LANG DI URL LAGI
    newParams.delete('lang');

    router.replace(`${pathname}?${newParams.toString()}`);
    router.refresh();
    setCurrentLang(lang);
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setLang('id')}
        className={`px-3 py-1 rounded ${
          currentLang === 'id' ? 'bg-blue-600 text-white' : 'bg-gray-200'
        }`}
      >
        🇮🇩 ID
      </button>

      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1 rounded ${
          currentLang === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200'
        }`}
      >
        🇺🇸 EN
      </button>
    </div>
  );
}
