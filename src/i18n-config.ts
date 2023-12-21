export const i18n = {
  locales: ['en', 'pt'],
  defaultLocale: 'pt',
} as const;

export type Locale = (typeof i18n)['locales'][number];
