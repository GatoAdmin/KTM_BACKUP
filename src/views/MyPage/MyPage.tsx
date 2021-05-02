import React, { useState } from 'react';
import Header from '@components/Shared/Header/Header';
import Footer from '@components/Shared/Footer/Footer';
import { NextPage } from 'next';
import useTranslate from '@util/hooks/useTranslate';
import i18nResource from '@assets/i18n/myPage.json';
import {
  MainArea, SelectTab,
} from '@components/MyPage';
import MainPageContainer from './MyPage.style';

const MyPage: NextPage = () => {
  const { t, lang, changeLang } = useTranslate(i18nResource);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [refundMode, setRefundMode] = useState(false);
  const [payId, setPayId] = useState(0);

  const handlingClickSelectTab = (num: number) => {
    setSelectedIndex(num);
    setRefundMode(false);
  };

  const handlingClickRefundButton = (responsePayId: number) => {
    setPayId(responsePayId);
    setRefundMode(true);
  };

  return (
    <MainPageContainer lang={lang}>
      <Header
        background="dark"
        t={t}
        changeLang={changeLang}
        lang={lang}
      />
      <SelectTab
        selectedIndex={selectedIndex}
        onClick={handlingClickSelectTab}
        t={t}
        lang={lang}
      />
      <MainArea
        t={t}
        lang={lang}
        refundMode={refundMode}
        payId={payId}
        handlingClickRefundButton={handlingClickRefundButton}
        selectedIndex={selectedIndex}
      />
      <Footer />
    </MainPageContainer>
  );
};

export default MyPage;
