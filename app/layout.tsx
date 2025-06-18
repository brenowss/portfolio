import { Metadata } from 'next'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
