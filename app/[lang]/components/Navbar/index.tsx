'use client'

import { LanguageSwitcher } from '../LanguageSwitcher'
import { getDictionary } from '../../../../get-dictionary'
import NavLinks from '../Navigation/NavLinks'
import Link from 'next/link'
import { useState } from 'react'
import { CommonParams } from '@customTypes/BasePage'

interface NavbarProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
  lang: CommonParams['lang']
}

export default function Navbar({ dictionary, lang }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="relative px-5 md:px-20">
      <div className="flex items-center justify-between py-4">
        <Link
          href={`/${lang}`}
          className="text-3xl font-bold tracking-tight text-slate-200"
        >
          B
        </Link>

        <div className="hidden md:block">
          <NavLinks dictionary={dictionary} lang={lang} isHome={false} />
        </div>

        <div className="hidden md:block">
          <LanguageSwitcher isHome={false} />
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-6 bg-slate-200 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`h-0.5 w-6 bg-slate-200 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`h-0.5 w-6 bg-slate-200 transition-transform duration-300 ${isMobileMenuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full right-0 left-0 z-50 bg-slate-900/95 backdrop-blur-xs transition-all duration-300 md:hidden ${isMobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
      >
        <div className="flex flex-col items-center gap-4 p-6">
          <NavLinks dictionary={dictionary} lang={lang} isHome={false} />
          <div className="mt-2">
            <LanguageSwitcher isHome={false} />
          </div>
        </div>
      </div>
    </header>
  )
}
