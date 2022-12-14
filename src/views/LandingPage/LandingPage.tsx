import React from 'react';
import Header from '@components/LandingPage/Header/Header';
import {
  IntroductionSection,
  UniversitySection,
  ConsultBanner,
  ReviewSection,
  SolutionSection,
} from '@components/LandingPage/';
import { NextPage } from 'next';
import useTranslate from '@util/hooks/useTranslate';
import Footer from '@components/Shared/Footer/Footer';
import i18nResource from '../../assets/i18n/landingPage.json';
import { Content, FontProvider } from './LandingPage.style';

const LandingPage: NextPage = () => {
  const { t, lang, changeLang } = useTranslate(i18nResource);
  return (
    <FontProvider lang={lang}>
      <Header t={t} lang={lang} changeLang={changeLang} />
      <Content>
        <IntroductionSection t={t} />
        <UniversitySection t={t} lang={lang} />
        <ConsultBanner t={t} />
        <ReviewSection t={t} lang={lang} />
        <SolutionSection t={t} lang={lang} />
      </Content>
      <Footer t={t} lang={lang} />
    </FontProvider>
  );
};

export default LandingPage;
