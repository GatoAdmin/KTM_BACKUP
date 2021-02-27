import React from 'react';
import Header from '@components/Shared/Header/Header';
import { NextPage } from 'next';
import useTranslate from '@util/hooks/useTranslate';
import { IntroductionSection, QnA, ConsultingBoard } from '@components/ConsultingPage';
import i18nResource from '../../assets/i18n/landingPage.json';
import {
  FontProvider, Introduction,
} from './ConsultingPage.style';

const LandingPage: NextPage = () => {
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
      <QnA t={t} lang={lang} changeLang={changeLang} />
      <ConsultingBoard t={t} lang={lang} changeLang={changeLang} />
    </FontProvider>
  );
};

export default LandingPage;
