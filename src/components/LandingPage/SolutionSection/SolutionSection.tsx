/* eslint-disable camelcase */
import React from 'react';
import { useRouter } from 'next/router';
import Button from '@components/Shared/Button/Button';
import {
  SolutionSectionContainer,
  SolutionSectionInnerBox,
  Box,
  BackSolutionImg,
  FrontSolutionImg,
  Title,
  Detail,
  TextWrap,
} from './SolutionSection.style';

interface SolutionSectionProps {
  t: (s: string) => string;
  lang: string;
}

const SolutionSection: React.FC<SolutionSectionProps> = ({ t, lang }) => {
  const router = useRouter();

  return (
    <SolutionSectionContainer>
      <SolutionSectionInnerBox>
        <Box>
          <BackSolutionImg />
          <FrontSolutionImg />
        </Box>
        <Box>
          <TextWrap>
            <Title lang={lang}>{t('landing-solution-section-title')}</Title>
            <Detail>
              {t('landing-solution-section-detail-1')}
              <br />
              {t('landing-solution-section-detail-2')}
            </Detail>
            <Button onClick={() => { router.replace('/'); }}>{t('landing-solution-section-button')}</Button>
          </TextWrap>
        </Box>
      </SolutionSectionInnerBox>
    </SolutionSectionContainer>
  );
};

export default SolutionSection;
