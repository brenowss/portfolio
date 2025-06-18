import { BasePage } from '@customTypes/BasePage'
import { getDictionary } from '../../../get-dictionary'
import Provider from '../Provider'

export default async function Page({ params }: BasePage) {
  const { lang } = await params

  const dictionary = await getDictionary(lang as 'pt' | 'en')
  console.log('🚀 ~ Page ~ dictionary:', dictionary.sections.about)

  return (
    <Provider>
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
        <h1 className="text-center text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
          Devlog
        </h1>
      </div>
    </Provider>
  )
}
