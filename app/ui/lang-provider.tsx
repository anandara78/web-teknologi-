'use client';

import { useEffect, useState } from 'react';

export default function LangProvider({
  children,
}: {
  children: (lang: 'id' | 'en') => React.ReactNode;
}) {
  const [lang, setLang] = useState<'id' | 'en'>('id');

  useEffect(() => {
    const match = document.cookie.match(/(^| )lang=([^;]+)/);
    if (match?.[2] === 'en') setLang('en');
    else setLang('id');
  }, []);

  return <>{children(lang)}</>;
}
