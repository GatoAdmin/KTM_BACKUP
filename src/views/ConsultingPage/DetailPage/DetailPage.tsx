import React from 'react';
import Header from '@components/Shared/Header/Header';
import Footer from '@components/Shared/Footer/Footer';
import { NextPage } from 'next';
import useTranslate from '@util/hooks/useTranslate';
import { IntroductionSection, DetailForm } from '@components/ConsultingPage';
import i18nResource from '@assets/i18n/consultPage.json';

import {
  FontProvider, Introduction,
} from './DetailPage.style';

const DetailPage: NextPage = () => {
  const { t, lang, changeLang } = useTranslate(i18nResource);
  return (
    <FontProvider lang={lang}>
      <Header
        background="dark"
        t={t}
        changeLang={changeLang}
      />
      <Introduction>
        <IntroductionSection t={t} lang={lang} />
      </Introduction>
      <DetailForm t={t} />
      <Footer />
    </FontProvider>
  );
};

export default DetailPage;
