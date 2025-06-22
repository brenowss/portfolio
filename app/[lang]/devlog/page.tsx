import { PageWithSlug } from '@customTypes/BasePage'
import { PostTranslations } from '@customTypes/Queries'
import { Metadata } from 'next'
import { getDictionary } from '../../../get-dictionary'
import { DOMAIN } from '../../../lib/constants'
import { createServerClient } from '../../../lib/supabase/server'
import PostCard from '../components/PostCard'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Devlog | Breno Fiorese',
  description:
    'Follow my devlog to read quick thoughts, experiments, and behind-the-scenes on my projects.',
  openGraph: {
    title: 'Devlog | Breno Fiorese',
    description:
      'Short posts about development, side projects, and technical insights.',
    url: DOMAIN,
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Breno Fiorese',
      },
    ],
  },
  icons: {
    apple: {
      url: '/apple-touch-icon.png',
      sizes: '57x57',
      type: 'image/png',
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devlog | Breno Fiorese',
    description:
      "Real-time thoughts on code, projects, and things I'm learning along the way.",
    images: [`${DOMAIN}/og.jpg`],
  },
  alternates: {
    canonical: `${DOMAIN}/devlog`,
  },
}

export default async function Page({ params }: PageWithSlug) {
  const { lang } = await params

  const dictionary = await getDictionary(lang)

  const supabase = await createServerClient()
  const { data } = await supabase
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
    .order('published_at', { referencedTable: 'posts', ascending: false })
    .overrideTypes<Array<PostTranslations>, { merge: false }>()

  return (
    <div className="mx-auto min-h-screen max-w-(--breakpoint-xl) px-6 py-12 md:px-12 md:py-20 lg:px-24">
      <h1 className="animate-in fade-in-25 text-center text-4xl font-bold tracking-wide text-slate-200 duration-700 sm:text-5xl">
        {dictionary.devlog.title}
      </h1>
      <p className="animate-in fade-in-25 mt-4 text-center text-lg text-slate-400 delay-100 duration-700">
        {dictionary.devlog.subtitle}
      </p>

      <div className="flex w-full flex-col gap-4 pt-10">
        {data?.map((post, i) => (
          <PostCard
            key={post.id}
            variant="wide"
            title={post.title}
            description={post.description}
            coverImage={post.posts.cover_image_url}
            href={`/${lang}/devlog/${post.slug}`}
            badges={post.posts.tags}
            className={`animate-in fade-in-25 slide-in-from-bottom-10 delay-${i * 100} duration-700`}
          />
        ))}
      </div>
    </div>
  )
}
