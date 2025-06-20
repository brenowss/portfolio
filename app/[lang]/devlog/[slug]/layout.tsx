import { BasePage, PageWithSlug } from '@customTypes/BasePage'
import { Metadata, ResolvingMetadata } from 'next'
import { DOMAIN } from '../../../../lib/constants'
import { createClient } from '../../../../lib/supabase/client'

export async function generateStaticParams() {
  const supabase = createClient()
  const { data: posts } = await supabase.from('posts').select('slug')
  return posts?.map((p) => ({ slug: p.slug })) ?? []
}

export async function generateMetadata(
  { params }: PageWithSlug,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params
  const supabase = createClient()
  const { data: post } = await supabase
    .from('posts')
    .select('title, excerpt, cover_image_url')
    .eq('slug', slug)
    .single()

  if (!post) return {}

  const parentMetadata = await parent
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        post.cover_image_url,
        ...(parentMetadata.openGraph?.images || []),
      ],
    },
    alternates: {
      canonical: `${DOMAIN}/devlog/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
    },
  }
}

export default async function Layout({ children }: BasePage) {
  return children
}
