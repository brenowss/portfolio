import { BasePage } from '@customTypes/BasePage';
import { dir } from 'i18next';
import { languages } from '../i18n/settings';
import { Inter } from 'next/font/google';
import '../globals.css';
import clsx from 'clsx';

interface RootLayoutProps extends BasePage {}

const inter = Inter({ subsets: ['latin'] });

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
  params: { lang },
}: RootLayoutProps) {
  return (
    <html lang={lang} dir={dir(lang)} className="scroll-smooth">
      <head />
      <body
        className={clsx(
          'bg-slate-900 leading-relaxed text-slate-400 antialiased selection:bg-purple-800 selection:text-white',
          inter.className
        )}
      >
        {children}
      </body>
    </html>
  );
}
