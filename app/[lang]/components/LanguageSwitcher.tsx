'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { i18n } from '../../../i18n-config';

export const LanguageSwitcher = () => {
  const pathName = usePathname();
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <div className="flex">
      {i18n.locales.map((locale) => (
        <Link
          href={redirectedPathName(locale)}
          className="mr-4 uppercase"
          key={locale}
        >
          {locale}
        </Link>
      ))}
    </div>
  );
};
