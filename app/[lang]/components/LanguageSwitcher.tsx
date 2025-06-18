'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { i18n } from '../../../i18n-config'
import clsx from 'clsx'

interface LanguageSwitcherProps {
  isHome?: boolean
}

export function LanguageSwitcher({ isHome }: LanguageSwitcherProps) {
  const pathName = usePathname()
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <div
      className={clsx(
        'flex',
        isHome
          ? 'max-lg:absolute max-lg:-right-5 max-lg:-top-5'
          : 'items-center'
      )}
    >
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
  )
}
