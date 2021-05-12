import React from 'react';
import useIntersection from '@util/hooks/useInteraction';
import {
  Introduction,
  IntroductionContent,
  IntroductionSectionBackground,
  IntroductionSectionContainer,
  SubTitle,
  Title,
  SubTitleContainer,
  InputUniversity,
  InputWrap,
  SearchIcon,
} from './IntroductionSection.style';
import { useRouter } from 'next/router';

// temp interface for temporary translation(delete if change to next.js 10
interface IntroductionSectionProps {
  t: (s: string) => string;
}

const IntroductionSection: React.FC<IntroductionSectionProps> = ({ t }) => {
  const firstSection = React.useRef<HTMLDivElement>(null);
  const router = useRouter();
  const visible = useIntersection(firstSection);
  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <IntroductionSectionContainer ref={firstSection}>
      <IntroductionSectionBackground />
      <Introduction show={visible}>
        <IntroductionContent>
          <Title>{t('landing-title')}</Title>
          <SubTitle>
            {t('landing-subtitle-1')}
            <br />
            <SubTitleContainer dangerouslySetInnerHTML={{ __html: t('landing-subtitle-2') }} />
          </SubTitle>
        </IntroductionContent>
        <InputWrap>
          <InputUniversity
            placeholder={t('landing-input-placeholder')}
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchTerm !== '') {
                router.push(`/recommend?location=&tuition=&topik=&exam=&scholarship=&category=&word=${searchTerm}`);
              }
            }}
          />
          <SearchIcon />
        </InputWrap>
      </Introduction>
    </IntroductionSectionContainer>
  );
};

export default IntroductionSection;
