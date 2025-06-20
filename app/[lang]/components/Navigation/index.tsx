import { LanguageSwitcher } from '../LanguageSwitcher'
import NavLinks from './NavLinks'
import { getDictionary } from '../../../../get-dictionary'
import Socials from './Socials'
import { CommonParams } from '@customTypes/BasePage'

interface NavigationProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
  lang: CommonParams['lang']
}

export default function Navigation({ dictionary, lang }: NavigationProps) {
  return (
    <header className="relative lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
          Breno Fiorese
        </h1>
        <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
          {dictionary.about.title}
        </h2>
        <p className="mt-4 max-w-xs leading-normal">{dictionary.about.motto}</p>
      </div>

      <NavLinks dictionary={dictionary} lang={lang} />

      <div>
        <LanguageSwitcher />

        <Socials />
      </div>
    </header>
  )
}
