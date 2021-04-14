import React from 'react';
import {
  SelectTabContainer,
  LocalizationButtonContainer,
  LocalizationButton,
  LocalizationSelector,
} from './SelectTab.style';

interface SelectTabProps {
  onClick: (num:number) => void;
  selectedIndex?: number;
}

const SelectTab: React.FC<SelectTabProps> = ({ onClick, selectedIndex = 0 }) => (
  <SelectTabContainer>
    <LocalizationButtonContainer>
      <LocalizationButton isSelect={selectedIndex === 0} onClick={() => onClick(0)}>
        나의 입학 솔루션
      </LocalizationButton>
      <LocalizationButton isSelect={selectedIndex === 1} onClick={() => onClick(1)}>
        나의 대학 리스트
      </LocalizationButton>
      <LocalizationButton isSelect={selectedIndex === 2} onClick={() => onClick(2)}>
        개인정보 수정
      </LocalizationButton>
      <LocalizationSelector selectedIndex={selectedIndex} />
    </LocalizationButtonContainer>
  </SelectTabContainer>
);

export default SelectTab;
