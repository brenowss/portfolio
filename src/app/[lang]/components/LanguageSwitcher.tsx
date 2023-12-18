import Link from 'next/link';
import { locales } from '../../i18n/settings';

export const LanguageSwitcher = () => {
  return (
    <div className="flex">
      {locales.map((language) => (
        <Link
          href={`/${language.locale}`}
          key={language.locale}
          className="mr-4 uppercase"
        >
          {language.label}
        </Link>
      ))}
    </div>
  );
};
