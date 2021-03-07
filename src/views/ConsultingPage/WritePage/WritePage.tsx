import React from 'react';
import Header from '@components/Shared/Header/Header';
import Footer from '@components/Shared/Footer/Footer';
import { NextPage } from 'next';
import useTranslate from '@util/hooks/useTranslate';
import { IntroductionSection, WriteForm } from '@components/ConsultingPage';
import i18nResource from '@assets/i18n/landingPage.json';

import {
  FontProvider, Introduction,
} from './WritePage.style';

const WritePage: NextPage = () => {
  const { t, lang, changeLang } = useTranslate(i18nResource);
  return (
    <FontProvider lang={lang}>
      <Header
        t={t}
        lang={lang}
        changeLang={changeLang}
      />
      <Introduction>
        <IntroductionSection t={t} />
      </Introduction>
      <WriteForm t={t} />
      <Footer />
    </FontProvider>
  );
};

export default WritePage;
