import Link from 'next/link';
import { i18n } from '../../../i18n-config';

export const LanguageSwitcher = () => {
  const { locales } = i18n;
  return (
    <div className="flex">
      {locales.map((language) => (
        <Link href={`/${language}`} key={language} className="mr-4 uppercase">
          {language}
        </Link>
      ))}
    </div>
  );
};
