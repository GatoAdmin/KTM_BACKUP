import React from 'react';
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
  SubTitleContainer,
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
      <IntroductionSectionBackground />
      <Introduction show={visible}>
        <IntroductionContent>
          <CompanyName>katumm</CompanyName>
          <Title>{t('landing-title')}</Title>
          <SubTitle>
            {t('landing-subtitle-1')}
            <br />
            <SubTitleContainer dangerouslySetInnerHTML={{ __html: t('landing-section-1-subtitle-2') }} />
          </SubTitle>
          <Link href="/introduction" passHref>
            <RouteIntroductionButton>
              <StormAnimatedText>{t('landing-introduce-button')}</StormAnimatedText>
            </RouteIntroductionButton>
          </Link>
        </IntroductionContent>
      </Introduction>
    </IntroductionSectionContainer>
  );
};

export default IntroductionSection;
