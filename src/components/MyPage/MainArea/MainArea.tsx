import React, { useEffect, useState } from 'react';
import {
  SelectTab,
  MySolutionSection,
  MyUniversityList,
  MyInfomation,
  RefundSection,
  EmptyFlame,
} from '@components/MyPage';
import MainAreaContainer from './MainArea.style';

interface MainAreaProps {
  t: (s:string) => string;
  lang: string;
  refundMode: boolean;
  payId: number;
  selectedIndex: number;
  handlingClickRefundButton: (responsePayId: number) => void;
}

const MainArea: React.FC<MainAreaProps> = ({
  t, lang, handlingClickRefundButton, refundMode, payId, selectedIndex,
}) => {
  const selectSection = () => {
    if (refundMode) return <RefundSection t={t} payId={payId} lang={lang} />;
    switch (selectedIndex) {
      case 0:
        return <MySolutionSection t={t} onRefundClick={handlingClickRefundButton} />;
      case 1:
        return <MyUniversityList t={t} lang={lang} />;
      case 2:
        return <MyInfomation t={t} />;
      default:
        break;
    }
    return <EmptyFlame> </EmptyFlame>;
  };

  return (
    <MainAreaContainer>
      {selectSection()}
    </MainAreaContainer>
  );
};

export default MainArea;
