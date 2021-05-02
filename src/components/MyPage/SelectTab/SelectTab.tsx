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
  t: (s: string) => string;
  lang: string;
}

const SelectTab: React.FC<SelectTabProps> = ({
  onClick, selectedIndex = 0, t, lang,
}) => (
  <SelectTabContainer>
    <LocalizationButtonContainer>
      <LocalizationButton
        isSelect={selectedIndex === 0}
        onClick={() => onClick(0)}
        isKorean={lang === 'ko'}
      >
        {t('tab_solution')}
      </LocalizationButton>
      <LocalizationButton
        isSelect={selectedIndex === 1}
        onClick={() => onClick(1)}
        isKorean={lang === 'ko'}
      >
        {t('tab_university_list')}
      </LocalizationButton>
      <LocalizationButton
        isSelect={selectedIndex === 2}
        onClick={() => onClick(2)}
        isKorean={lang === 'ko'}
      >
        {t('tab_patch_infomation')}
      </LocalizationButton>
      <LocalizationSelector
        selectedIndex={selectedIndex}
        isKorean={lang === 'ko'}
      />
    </LocalizationButtonContainer>
  </SelectTabContainer>
);

export default SelectTab;
