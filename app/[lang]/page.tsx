import Navigation from './components/Navigation'
import Main from './components/Main'
import { getDictionary } from '../../get-dictionary'
import { PageWithSlug } from '@customTypes/BasePage'

export default async function Page({ params }: PageWithSlug) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return (
    <div className="mx-auto min-h-screen max-w-(--breakpoint-xl) px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
      <div className="lg:flex lg:justify-between lg:gap-4">
        <Navigation dictionary={dictionary} lang={lang} />
        <Main dictionary={dictionary} lang={lang} />
      </div>
    </div>
  )
}
