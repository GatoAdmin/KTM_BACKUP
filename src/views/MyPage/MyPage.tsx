import React from 'react';
import Header from '@components/Shared/Header/Header';
import Footer from '@components/Shared/Footer/Footer';
import { NextPage } from 'next';
import useTranslate from '@util/hooks/useTranslate';
import i18nResource from '@assets/i18n/myPage.json';
import {
  MainArea,
} from '@components/MyPage';
import MainPageContainer from './MyPage.style';

const MyPage: NextPage = () => {
  const { t, lang, changeLang } = useTranslate(i18nResource);

  return (
    <MainPageContainer lang={lang}>
      <Header
        background="dark"
        t={t}
        changeLang={changeLang}
        lang={lang}
      />
      <MainArea t={t} />
      <Footer />
    </MainPageContainer>
  );
};

export default MyPage;
