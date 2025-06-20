import { BasePage } from '@customTypes/BasePage'
import { getDictionary } from '../../../get-dictionary'
import Navbar from '../components/Navbar'

export default async function Layout({ children, params }: BasePage) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return (
    <div>
      <Navbar dictionary={dictionary} />
      {children}
    </div>
  )
}
