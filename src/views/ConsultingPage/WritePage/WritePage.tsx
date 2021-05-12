import React from 'react';
import Header from '@components/Shared/Header/Header';
import Footer from '@components/Shared/Footer/Footer';
import { NextPage } from 'next';
import useTranslate from '@util/hooks/useTranslate';
import { IntroductionSection, WriteForm } from '@components/ConsultingPage';
import i18nResource from '@assets/i18n/consultPage.json';

import { FontProvider, Introduction } from './WritePage.style';

const WritePage: NextPage = () => {
  const { t, lang, changeLang } = useTranslate(i18nResource);
  return (
    <FontProvider lang={lang}>
      <Header background="dark" t={t} changeLang={changeLang} lang={lang} />
      <Introduction>
        <IntroductionSection t={t} lang={lang} />
      </Introduction>
      <WriteForm t={t} />
      <Footer t={t} lang={lang} />
    </FontProvider>
  );
};

export default WritePage;
