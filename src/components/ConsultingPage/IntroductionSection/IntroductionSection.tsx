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
}

const IntroductionSection: React.FC<IntroductionSectionProps> = ({ t }) => {
  const firstSection = React.useRef<HTMLDivElement>(null);
  const visible = useIntersection(firstSection);

  return (
    <IntroductionSectionContainer ref={firstSection}>
      <IntroductionSectionImageWrap>
        <IntroductionSectionBackground />
        <LinearBox />
        <TitleWrapBox show={visible}>
          <Title>
            유학 매니저와 1:1 상담을 통해
            성공적인 유학을 준비하세요
          </Title>
        </TitleWrapBox>
      </IntroductionSectionImageWrap>
    </IntroductionSectionContainer>
  );
};

export default IntroductionSection;
