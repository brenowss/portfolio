import { PostTranslations } from '@customTypes/Queries'
import type { MetadataRoute } from 'next'
import { DOMAIN } from '../lib/constants'
import { createClient } from '../lib/supabase/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient()

  const { data: posts, error } = await supabase
    .from('post_translations')
    .select(
      `
      slug,
      lang,
      posts (
        published_at
      )
    `
    )
    .eq('lang', 'pt')
    .overrideTypes<Array<PostTranslations>, { merge: false }>()

  if (error) throw new Error(`Erro ao buscar posts: ${error.message}`)

  const staticRoutes = [
    { path: '', priority: 1.0 },
    { path: 'devlog', priority: 0.9 },
  ]

  const routes: MetadataRoute.Sitemap = []

  for (const route of staticRoutes) {
    const url = `${DOMAIN}/pt/${route.path}`
    routes.push({
      url,
      lastModified: new Date(),
      alternates: {
        languages: {
          pt: `${DOMAIN}/pt/${route.path}`,
          en: `${DOMAIN}/en/${route.path}`,
        },
      },
    })
  }

  if (posts) {
    for (const post of posts) {
      const lastMod = post.posts?.published_at
        ? new Date(post.posts.published_at)
        : new Date()
      routes.push({
        url: `${DOMAIN}/pt/devlog/${post.slug}`,
        lastModified: lastMod,
        alternates: {
          languages: {
            pt: `${DOMAIN}/pt/devlog/${post.slug}`,
            en: `${DOMAIN}/en/devlog/${post.slug}`,
          },
        },
      })
    }
  }

  return routes
}
