import React from 'react';
import {
  LocalizationButton,
  LocalizationSelector,
  LocalizationButtonContainer,
} from './Tab.style';

interface TabProps {
  index: number;
  setIndex: (idx: number) => void;
  t: (s: string) => string;
  lang: string;
}

const Tab: React.FC<TabProps> = ({
  index, setIndex, t, lang,
}) => (
  <LocalizationButtonContainer>
    <LocalizationButton isSelected={index === 0} onClick={() => setIndex(0)} lang={lang}>
      {t('tab-1')}
    </LocalizationButton>
    <LocalizationButton isSelected={index === 1} onClick={() => setIndex(1)} lang={lang}>
      {t('tab-2')}
    </LocalizationButton>
    <LocalizationButton isSelected={index === 2} onClick={() => setIndex(2)} lang={lang}>
      {t('tab-3')}
    </LocalizationButton>
    <LocalizationSelector selectedIndex={index} lang={lang} />
  </LocalizationButtonContainer>
);

export default Tab;
