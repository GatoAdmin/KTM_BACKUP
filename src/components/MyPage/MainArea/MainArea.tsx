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
}

const MainArea: React.FC<MainAreaProps> = ({ t }) => {
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

  const selectSection = () => {
    if (refundMode) return <RefundSection t={t} payId={payId} />;
    switch (selectedIndex) {
      case 0:
        return <MySolutionSection t={t} onRefundClick={handlingClickRefundButton} />;
      case 1:
        return <MyUniversityList t={t} />;
      case 2:
        return <MyInfomation t={t} />;
      default:
        break;
    }
    return <EmptyFlame> </EmptyFlame>;
  };

  return (
    <MainAreaContainer>
      <SelectTab
        selectedIndex={selectedIndex}
        onClick={handlingClickSelectTab}
      />
      {selectSection()}
    </MainAreaContainer>
  );
};

export default MainArea;
