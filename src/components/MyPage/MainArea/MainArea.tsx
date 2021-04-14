import React, { useState } from 'react';
import {
  SelectTab,
  MySolutionSection,
} from '@components/MyPage';
import MainAreaContainer from './MainArea.style';

interface MainAreaProps {
  t: (s:string) => string;
}

const MainArea: React.FC<MainAreaProps> = ({ t }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <MainAreaContainer>
      <SelectTab selectedIndex={selectedIndex} onClick={(num: number) => setSelectedIndex(num)} />
      <MySolutionSection t={t} />
    </MainAreaContainer>
  );
};

export default MainArea;
