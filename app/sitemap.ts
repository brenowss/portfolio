import type { MetadataRoute } from 'next'
import { DOMAIN } from '../lib/constants'
import { createClient } from '../lib/supabase/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient()
  const { data: posts } = await supabase
    .from('posts')
    .select('slug, published_at')

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
      const lastMod = post.published_at
        ? new Date(post.published_at)
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
