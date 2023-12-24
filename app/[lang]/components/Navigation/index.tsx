import { BasePage } from '@customTypes/BasePage';
import { LanguageSwitcher } from '../LanguageSwitcher';
import NavLinks from './NavLinks';

export default function Navigation({ params: { lang } }: BasePage) {
  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
          Breno Fiorese
        </h1>
        <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
          Experienced Front-end Engineer
        </h2>
        <p className="mt-4 max-w-xs leading-normal">
          I build exceptional and accessible digital experiences for the web.
        </p>
      </div>

      <NavLinks />

      <LanguageSwitcher />
    </header>
  );
}
