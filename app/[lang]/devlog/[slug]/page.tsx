import { getDictionary } from '../../../../get-dictionary'
import PostCard from '../../components/PostCard'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { createServerClient } from '../../../../lib/supabase/server'
import { marked } from 'marked'
import { PageWithSlug } from '@customTypes/BasePage'
import { DOMAIN } from '../../../../lib/constants'
import type { BlogPosting, WithContext } from 'schema-dts'
import { PostTranslations } from '@customTypes/Queries'

export const revalidate = 86400

export default async function Page({ params }: PageWithSlug) {
  const { lang, slug } = await params
  const dictionary = await getDictionary(lang)

  const supabase = await createServerClient()

  const { data: postBySlug, error } = await supabase
    .from('post_translations')
    .select(
      `
      id,
      post_id,
      title,
      description,
      content,
      slug,
      lang,
      posts (
        cover_image_url,
        tags,
        published_at
        )
      `
    )
    .eq('slug', slug)
    .eq('lang', lang)
    .limit(1)
    .single()
    .overrideTypes<PostTranslations, { merge: false }>()

  if (!postBySlug || error) return notFound()

  const { data: recentPosts } = await supabase
    .from('post_translations')
    .select(
      `
    id,
    post_id,
    title,
    description,
    slug,
    lang,
    posts (
      cover_image_url,
      tags,
      published_at
    )
  `
    )
    .eq('lang', lang)
    .neq('slug', slug)
    .order('published_at', { referencedTable: 'posts', ascending: false })
    .limit(2)
    .overrideTypes<Array<PostTranslations>, { merge: false }>()

  const htmlContent = marked(postBySlug.content)

  const jsonLd: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: postBySlug.title,
    description: postBySlug.description,
    datePublished: postBySlug.posts.published_at,
    dateModified: postBySlug.posts.published_at,
    author: {
      '@type': 'Person',
      name: 'Breno Fiorese',
      url: DOMAIN,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Breno Fiorese',
      logo: {
        '@type': 'ImageObject',
        url: `${DOMAIN}/og.jpg`,
      },
    },
    image: postBySlug.posts.cover_image_url,
    url: `${DOMAIN}/${lang}/devlog/${postBySlug.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${DOMAIN}/${lang}/devlog/${postBySlug.slug}`,
    },
  }

  return (
    <>
      <div className="mx-auto min-h-screen max-w-(--breakpoint-md) px-6 py-12 md:px-12 md:py-20 lg:px-0">
        <h1 className="animate-in fade-in-25 slide-in-from-top-10 mb-6 text-4xl leading-tight font-bold tracking-wide text-slate-100 duration-700">
          {postBySlug.title}
        </h1>

        <div className="mb-8 flex flex-wrap items-center gap-2">
          {postBySlug.posts.tags?.map((badge: string, i: number) => (
            <span
              key={i}
              className={`animate-in fade-in-25 rounded-full bg-slate-700 px-3 py-1 text-xs font-medium text-slate-400 delay-${i * 100} duration-700`}
            >
              {badge}
            </span>
          ))}
        </div>

        <div className="animate-in fade-in-25 relative mb-12 aspect-video w-full overflow-hidden rounded-2xl delay-200 duration-700">
          <Image
            src={postBySlug.posts.cover_image_url}
            alt={postBySlug.title}
            fill
            className="object-cover"
          />
        </div>

        <div
          className="prose prose-invert prose-h1:text-3xl prose-h2:mt-10 prose-h2:text-slate-100 prose-p:text-slate-300 prose-code:rounded-sm prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-li:marker:text-slate-500 animate-in fade-in-25 slide-in-from-bottom-10 max-w-none delay-300 duration-700"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        <div className="mt-20 border-t border-slate-800 pt-10">
          <h2 className="animate-in fade-in-25 slide-in-from-left-10 mb-6 text-2xl font-semibold text-slate-100 duration-700">
            {dictionary.devlog.morePosts}
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {recentPosts?.map((item, i) => (
              <PostCard
                key={item.slug}
                variant="vertical"
                title={item.title}
                description={item.description}
                coverImage={item.posts.cover_image_url}
                href={`/${lang}/devlog/${item.slug}`}
                badges={item.posts.tags}
                className={`animate-in fade-in-25 slide-in-from-bottom-10 delay-${i * 150} duration-700`}
              />
            ))}
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
    </>
  )
}
