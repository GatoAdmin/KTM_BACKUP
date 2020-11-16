import * as React from 'react';
import Link from 'next/link';
import useIntersection from '@util/hooks/useInteraction';
import {
  CompanyName,
  EmphasisTitle,
  Introduction,
  IntroductionContent,
  IntroductionSectionBackground,
  IntroductionSectionContainer,
  SubTitle,
  StormAnimatedText,
  Title,
  RouteIntroductionButton,
} from './IntroductionSection.style';

const IntroductionSection: React.FC = () => {
  const firstSection = React.useRef<HTMLDivElement>(null);
  const visible = useIntersection(firstSection);

  return (
    <IntroductionSectionContainer ref={firstSection}>
      <IntroductionSectionBackground />
      <Introduction show={visible}>
        <IntroductionContent>
          <CompanyName>katumm</CompanyName>
          <Title>한국 유학의 모든 정보를 담다</Title>
          <SubTitle>
            유학 준비부터 입학신청까지,
            <br />
            <EmphasisTitle>카툼</EmphasisTitle>과 성공적인 유학을 함께하세요
          </SubTitle>
          <Link href="/introduction" passHref>
            <RouteIntroductionButton>
              <StormAnimatedText>회사 소개 바로가기</StormAnimatedText>
            </RouteIntroductionButton>
          </Link>
        </IntroductionContent>
      </Introduction>
    </IntroductionSectionContainer>
  );
};

export default IntroductionSection;
