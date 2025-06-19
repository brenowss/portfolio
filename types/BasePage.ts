export interface BasePage {
  children?: React.ReactNode
  params: {
    lang: 'pt' | 'en'
  }
}

export interface PageWithSlug extends BasePage {
  params: BasePage['params'] & {
    slug: string
  }
}
