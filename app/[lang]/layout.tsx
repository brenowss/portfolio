import { i18n } from '../../i18n-config'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '../globals.css'
import { BasePage } from '@customTypes/BasePage'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function Root({ children }: BasePage) {
  return (
    <>
      {children}
      <Analytics />
      <SpeedInsights />
    </>
  )
}
