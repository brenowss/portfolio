import { PageWithSlug } from '@customTypes/BasePage'
import { getDictionary } from '../../../../get-dictionary'
import PostCard from '../../components/PostCard'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { createClient } from '../../../../lib/supabase/server'
import { marked } from 'marked'

export default async function Page({ params }: PageWithSlug) {
  const { lang, slug } = await params
  const dictionary = await getDictionary(lang)

  const supabase = await createClient()

  // Buscar post pelo slug
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!post || error) return notFound()

  const { data: recentPosts } = await supabase
    .from('posts')
    .select('*')
    .neq('slug', slug)
    .order('published_at', { ascending: false })
    .limit(3)

  const htmlContent = marked(post.content)

  return (
    <div className="mx-auto min-h-screen max-w-screen-md px-6 py-12 md:px-12 md:py-20 lg:px-0">
      <h1 className="mb-6 text-4xl font-bold leading-tight tracking-wide text-slate-100">
        {post.title}
      </h1>

      <div className="mb-8 flex flex-wrap items-center gap-2">
        {post.badges?.map((badge: string, i: number) => (
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
          src={post.cover_image_url}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>

      <div
        className="prose prose-invert max-w-none prose-h2:mt-10 prose-h2:text-slate-100 prose-p:text-slate-300 prose-code:rounded prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-li:marker:text-slate-500"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      <div className="mt-20 border-t border-slate-800 pt-10">
        <h2 className="mb-6 text-2xl font-semibold text-slate-100">
          {dictionary.devlog.morePosts}
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {recentPosts?.map((item) => (
            <PostCard
              key={item.slug}
              variant="vertical"
              title={item.title}
              excerpt={item.excerpt}
              coverImage={item.cover_image_url}
              href={`/devlog/${item.slug}`}
              badges={item.badges}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
