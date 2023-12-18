export const fallbackLng = 'pt-BR';
export const languages = [fallbackLng, 'en-US'];
export const locales = languages.map((lng) => {
  return {
    locale: lng,
    label: lng.split('-')[0],
  };
});
export const defaultNS = 'translation';
export const cookieName = 'i18next';
export type LocaleTypes = (typeof languages)[number];

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
