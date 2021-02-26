import React from 'react';
import Header from '@components/Shared/Header/Header';
import { NextPage } from 'next';
import useTranslate from '@util/hooks/useTranslate';
import i18nResource from '../../assets/i18n/landingPage.json';
import { FontProvider, Content } from './ConsultingPage.style';

const LandingPage: NextPage = () => {
  const { t, lang, changeLang } = useTranslate(i18nResource);
  return (
    <FontProvider lang={lang}>
      <Header
        t={t}
        lang={lang}
        changeLang={changeLang}
      />
      <Content />
    </FontProvider>
  );
};

export default LandingPage;
