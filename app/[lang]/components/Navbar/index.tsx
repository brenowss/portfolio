import { LanguageSwitcher } from '../LanguageSwitcher'
import { getDictionary } from '../../../../get-dictionary'
import NavLinks from '../Navigation/NavLinks'
import Link from 'next/link'

interface NavbarProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
}

export default function Navbar({ dictionary }: NavbarProps) {
  return (
    <header className="flex items-center justify-between px-20">
      <Link
        href="/"
        className="text-3xl font-bold tracking-tight text-slate-200"
      >
        B
      </Link>

      <NavLinks dictionary={dictionary} isHome={false} />

      <LanguageSwitcher isHome={false} />
    </header>
  )
}
