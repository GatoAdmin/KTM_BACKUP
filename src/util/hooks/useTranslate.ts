import { useState } from 'react';
import { useSelector } from 'react-redux';

interface I18nResource {
  [key: string]: string;
}

const supportedLang = ['ko', 'vn'];
export type SupportedLang = typeof supportedLang[number];

type I18nStaticResources = {
  [key in SupportedLang]: I18nResource;
};
function useTranslate(
  resource: I18nStaticResources,
): { t: (s: string) => string; lang: SupportedLang; changeLang: (s: string) => void } {
  let sessionLang = 'ko';
  if (typeof window !== 'undefined') {
    sessionLang = sessionStorage.getItem('lang');
  }
  const [lang, setLang] = useState<SupportedLang>(sessionLang ? sessionLang : 'ko');
  // const lang = useSelector((state) => state.languageReducer);
  const t = (searchString: string) => resource[lang][searchString];

  return {
    t,
    lang,
    changeLang: (s: string) => {
      window.sessionStorage.setItem('lang', s);
      setLang(s);
    },
  };
}

export default useTranslate;
