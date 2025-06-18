import { BasePage } from '@customTypes/BasePage'
import { getDictionary } from '../../../../get-dictionary'
import PostCard from '../../components/PostCard'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export default async function Page({ params }: BasePage) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  const post = {
    title: 'Como otimizei o carregamento do meu app Tauri em 40%',
    excerpt:
      'Compartilho as estratégias que utilizei para reduzir drasticamente o tempo de boot do Breakpoints no desktop.',
    content: `
      <p>O tempo de boot de um app pode ser crítico para a experiência do usuário. Aqui detalho como fiz para otimizar meu app desktop <strong>Breakpoints</strong> usando <code>Tauri</code>, <code>Rust</code> e um pouco de profiling na unha.</p>
      <h2>1. Medindo o problema</h2>
      <p>Antes de otimizar, é preciso entender onde está o gargalo. Usei <code>console.time</code> na camada JS e <code>tracing</code> no backend em Rust.</p>
      <h2>2. Estratégias aplicadas</h2>
      <ul>
        <li>Lazy load de módulos pesados</li>
        <li>Compressão de assets</li>
        <li>Evitar renderizações desnecessárias no React</li>
      </ul>
    `,
    coverImage: 'https://placehold.co/1920x1080.png',
    projectBadge: 'Breakpoints',
    extraBadges: ['Tauri', 'Rust', 'Performance'],
  }

  if (!post) return notFound()

  return (
    <div className="mx-auto min-h-screen max-w-screen-md px-6 py-12 md:px-12 md:py-20 lg:px-0">
      <h1 className="mb-6 text-4xl font-bold leading-tight tracking-wide text-slate-100 sm:text-5xl">
        {post.title}
      </h1>

      <div className="mb-8 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-slate-700 px-4 py-1 text-sm font-medium text-slate-300">
          {post.projectBadge}
        </span>
        {post.extraBadges.map((badge, i) => (
          <span
            key={i}
            className="rounded-full bg-slate-700 px-3 py-1 text-xs font-medium text-slate-400"
          >
            {badge}
          </span>
        ))}
      </div>

      <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-2xl">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>

      <div
        className="prose prose-invert prose-p:text-slate-300 prose-h2:mt-10 prose-h2:text-slate-100 prose-li:marker:text-slate-500 prose-code:rounded prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mt-20 border-t border-slate-800 pt-10">
        <h2 className="mb-6 text-2xl font-semibold text-slate-100">
          {dictionary.devlog.morePosts}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <PostCard
            variant="vertical"
            title="Usando framer-motion para animar interações com foco"
            excerpt="Melhorei a acessibilidade visual do meu portfólio usando animações discretas com framer-motion."
            coverImage="https://placehold.co/1920x1080.png"
            href="/devlog/framer-focus"
            projectBadge="Portfolio"
            extraBadges={['React', 'A11y']}
          />
          <PostCard
            variant="vertical"
            title="Como centralizei toda a tipografia do projeto com Tailwind"
            excerpt="Criei um sistema tipográfico responsivo e dark-mode friendly com base nas diretrizes do projeto."
            coverImage="https://placehold.co/1920x1080.png"
            href="/devlog/tipografia-tailwind"
            projectBadge="Breakpoints"
            extraBadges={['Tailwind', 'Design System']}
          />
        </div>
      </div>
    </div>
  )
}
