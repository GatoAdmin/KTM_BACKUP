import React from 'react';
import {
  LocalizationButton,
  LocalizationSelector,
  LocalizationButtonContainer,
} from './Tab.style';

interface TabProps {
  index: number;
  setIndex: (idx: number) => void;
}

const Tab: React.FC<TabProps> = ({ index, setIndex }) => (
  <LocalizationButtonContainer>
    <LocalizationButton isSelected={index === 0} onClick={() => setIndex(0)}>
      입학 상담
    </LocalizationButton>
    <LocalizationButton isSelected={index === 1} onClick={() => setIndex(1)}>
      입학솔루션 이용
    </LocalizationButton>
    <LocalizationButton isSelected={index === 2} onClick={() => setIndex(2)}>
      결제 및 환불
    </LocalizationButton>
    <LocalizationSelector selectedIndex={index} />
  </LocalizationButtonContainer>
);

export default Tab;
