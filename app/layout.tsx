import { Metadata } from 'next'
import { BasePage } from '@customTypes/BasePage'
import clsx from 'clsx'

import { Outfit } from 'next/font/google'

const outfitFont = Outfit({ subsets: ['latin'] })

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
}

export default async function RootLayout({ children, params }: BasePage) {
  const { lang } = await params

  return (
    <html lang={lang}>
      <body
        suppressHydrationWarning
        className={clsx(
          'bg-slate-900 bg-gradient-radial from-slate-900 via-slate-800 to-gray-900 bg-no-repeat leading-relaxed text-slate-400 antialiased selection:bg-purple-800 selection:text-white',
          outfitFont.className
        )}
      >
        {children}
      </body>
    </html>
  )
}
