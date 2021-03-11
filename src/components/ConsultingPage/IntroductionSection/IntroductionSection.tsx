import React from 'react';
import useIntersection from '@util/hooks/useInteraction';
import {
  IntroductionSectionBackground,
  IntroductionSectionContainer,
  IntroductionSectionImageWrap,
  LinearBox,
  Title,
  TitleWrapBox,
} from './IntroductionSection.style';

// temp interface for temporary translation(delete if change to next.js 10
interface IntroductionSectionProps {
  t: (s: string) => string;
  lang: string;
}

const IntroductionSection: React.FC<IntroductionSectionProps> = ({ t, lang }) => {
  const firstSection = React.useRef<HTMLDivElement>(null);
  const visible = useIntersection(firstSection);

  return (
    <IntroductionSectionContainer ref={firstSection}>
      <IntroductionSectionImageWrap>
        <IntroductionSectionBackground />
        <LinearBox />
        <TitleWrapBox show={visible}>
          <Title lang={lang}>
            {t('main-title')}
          </Title>
        </TitleWrapBox>
      </IntroductionSectionImageWrap>
    </IntroductionSectionContainer>
  );
};

export default IntroductionSection;
