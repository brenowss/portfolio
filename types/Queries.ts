export interface PostTranslations {
  id: string
  post_id: string
  title: string
  description: string
  content: string
  slug: string
  lang: string
  posts: Posts
}

export interface Posts {
  tags: string[]
  published_at: string
  cover_image_url: string
}
