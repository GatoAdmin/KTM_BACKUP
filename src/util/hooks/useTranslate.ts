import { useState } from 'react';

interface I18nResource {
  [key: string]: string
}

const supportedLang = ['ko', 'vn'];
export type SupportedLang = typeof supportedLang[number];

type I18nStaticResources = {
  [key in SupportedLang]: I18nResource;
}
function useTranslate(
  resource: I18nStaticResources,
): {t: (s: string) => string, lang: SupportedLang, changeLang: (s: string) => void} {
  const [lang, setLang] = useState<SupportedLang>('ko');
  const t = (searchString: string) => resource[lang][searchString];

  return { t, lang, changeLang: (s: string) => setLang(s) };
}

export default useTranslate;
