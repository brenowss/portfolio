import { BasePage } from '@customTypes/BasePage'
import { getDictionary } from '../../../get-dictionary'
import PostCard from '../components/PostCard'

export default async function Page({ params }: BasePage) {
  const { lang } = await params

  const dictionary = await getDictionary(lang)

  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
      <h1 className="text-center text-4xl font-bold tracking-wide text-slate-200 sm:text-5xl">
        {dictionary.devlog.title}
      </h1>
      <p className="mt-4 text-center text-lg text-slate-400">
        {dictionary.devlog.subtitle}
      </p>

      <div className="pt-10">
        <PostCard
          variant="wide"
          title="Como otimizei o carregamento do meu app Tauri em 40%"
          excerpt="Compartilho as estratégias que utilizei para reduzir drasticamente o tempo de boot do Breakpoints no desktop."
          coverImage="https://placehold.co/600x400.png"
          href="/devlog/otimizacao-tauri"
          projectBadge="Breakpoints"
          extraBadges={['Tauri', 'Rust', 'Performance']}
        />
      </div>
    </div>
  )
}
