import { BasePage } from '@customTypes/BasePage';
import { dir } from 'i18next';
import { Inter } from 'next/font/google';
import '../globals.css';
import clsx from 'clsx';
import { Metadata } from 'next';
import { i18n } from '../../i18n-config';

interface RootLayoutProps extends BasePage {}

export const metadata: Metadata = {
  title: 'Breno Fiorese',
  description: 'Breno Fiorese - Software Engineer',
  openGraph: {
    title: 'Breno Fiorese',
    description: 'Breno Fiorese - Software Engineer',
    type: 'website',
    locale: 'en_US',
    url: 'https://brenofiorese.dev',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Breno Fiorese',
      },
    ],
  },
  icons: {
    apple: {
      url: '/apple-touch-icon.png',
      sizes: '57x57',
      type: 'image/png',
    },
  },
};

const inter = Inter({ subsets: ['latin'] });

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
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
