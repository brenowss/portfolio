export interface CommonParams {
  lang: 'pt' | 'en'
}

export interface BasePage {
  children?: React.ReactNode
  params: Promise<CommonParams>
}

export interface PageWithSlug {
  params: Promise<
    CommonParams & {
      slug: string
    }
  >
}
