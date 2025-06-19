import { BasePage } from '@customTypes/BasePage'
import { getDictionary } from '../../../get-dictionary'
import { createClient } from '../../../lib/supabase/server'
import PostCard from '../components/PostCard'

export default async function Page({ params }: BasePage) {
  const { lang } = await params

  const dictionary = await getDictionary(lang)

  const supabase = await createClient()
  const { data } = await supabase
    .from('posts')
    .select()
    .order('published_at', { ascending: false })

  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
      <h1 className="text-center text-4xl font-bold tracking-wide text-slate-200 sm:text-5xl">
        {dictionary.devlog.title}
      </h1>
      <p className="mt-4 text-center text-lg text-slate-400">
        {dictionary.devlog.subtitle}
      </p>

      <div className="flex w-full flex-col gap-4 pt-10">
        {data?.map((post) => (
          <PostCard
            key={post.id}
            variant="wide"
            title={post.title}
            excerpt={post.description}
            coverImage={post.cover_image_url}
            href={`/devlog/${post.slug}`}
            badges={post.tags}
          />
        ))}
      </div>
    </div>
  )
}
