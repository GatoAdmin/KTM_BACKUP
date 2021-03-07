import React from 'react';
import Header from '@components/Shared/Header/Header';
import Footer from '@components/Shared/Footer/Footer';
import { NextPage } from 'next';
import useTranslate from '@util/hooks/useTranslate';
import { IntroductionSection, DetailForm } from '@components/ConsultingPage';
import i18nResource from '@assets/i18n/landingPage.json';

import {
  FontProvider, Introduction,
} from './DetailPage.style';

const DetailPage: NextPage = () => {
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
      <DetailForm t={t} />
      <Footer />
    </FontProvider>
  );
};

export default DetailPage;
