import { BasePage, PageWithSlug } from '@customTypes/BasePage'
import { PostTranslations } from '@customTypes/Queries'
import { Metadata, ResolvingMetadata } from 'next'
import { DOMAIN } from '../../../../lib/constants'
import { createClient } from '../../../../lib/supabase/client'

// Gerar os slugs de todos os posts em português
export async function generateStaticParams() {
  const supabase = createClient()
  const { data: posts, error } = await supabase
    .from('post_translations')
    .select('slug')
    .eq('lang', 'pt')
    .overrideTypes<Array<PostTranslations>, { merge: false }>()

  if (error) throw new Error(`Erro ao buscar slugs: ${error.message}`)

  return posts?.map((p) => ({ slug: p.slug })) ?? []
}

export async function generateMetadata(
  { params }: PageWithSlug,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const supabase = createClient()
  const { slug, lang } = await params

  const { data: post, error } = await supabase
    .from('post_translations')
    .select(
      `
      title,
      description,
      slug,
      posts (
        cover_image_url
      )
    `
    )
    .eq('slug', slug)
    .eq('lang', 'pt')
    .single()
    .overrideTypes<PostTranslations, { merge: false }>()

  if (error || !post) return {}

  const parentMetadata = await parent

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [
        post.posts?.cover_image_url ?? '',
        ...(parentMetadata.openGraph?.images || []),
      ],
    },
    alternates: {
      canonical: `${DOMAIN}/${lang}/devlog/${slug}`,
      languages: {
        'x-default': `${DOMAIN}/pt/devlog/${slug}`,
        pt: `${DOMAIN}/pt/devlog/${slug}`,
        en: `${DOMAIN}/en/devlog/${slug}`,
      },
    },
    twitter: {
      card: 'summary_large_image',
    },
  }
}

export default async function Layout(props: Promise<BasePage>) {
  const { children } = await props

  return children
}
