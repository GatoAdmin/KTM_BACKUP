import React, { useState } from 'react';
import {
  SelectTab,
  MySolutionSection,
  MyUniversityList,
  MyInfomation,
} from '@components/MyPage';
import MainAreaContainer from './MainArea.style';

interface MainAreaProps {
  t: (s:string) => string;
}

const MainArea: React.FC<MainAreaProps> = ({ t }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [refundMode, setRefundMode] = useState(false);

  const selectSection = () => {
    switch (selectedIndex) {
      case 0:
        return <MySolutionSection t={t} />;
      case 1:
        return <MyUniversityList t={t} />;
      case 2:
        return <MyInfomation t={t} />;
      default:
        break;
    }
    return <></>;
  };

  return (
    <MainAreaContainer>
      <SelectTab selectedIndex={selectedIndex} onClick={(num: number) => setSelectedIndex(num)} />
      {selectSection()}
    </MainAreaContainer>
  );
};

export default MainArea;
