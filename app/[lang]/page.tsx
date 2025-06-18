import Navigation from './components/Navigation'
import Main from './components/Main'
import Provider from './Provider'
import { getDictionary } from '../../get-dictionary'
import { BasePage } from '@customTypes/BasePage'

export default async function Page({ params }: BasePage) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return (
    <Provider>
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          <Navigation dictionary={dictionary} />
          <Main dictionary={dictionary} lang={lang} />
        </div>
      </div>
    </Provider>
  )
}
