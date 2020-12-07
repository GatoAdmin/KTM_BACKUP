import * as React from 'react';

import Header from '@components/LandingPage/Header/Header';
import IntroductionSection from '@components/LandingPage/IntroductionSection/IntroductionSection';
import NumberSection from '@components/LandingPage/NumberSection/NumberSection';
import { NextPage } from 'next';
import useTranslate from '@util/hooks/useTranslate';
import {
  Content, ClickImage, ConsultImage, UnivImage, SubTitleContainer, FontProvider,
} from './LandingPage.style';
import i18nResource from '../../assets/i18n/landingPage.json';

const LandingPage: NextPage = () => {
  const { t, lang, changeLang } = useTranslate(i18nResource);
  return (
    <FontProvider lang={lang}>
      <Header
        t={t}
        lang={lang}
        changeLang={changeLang}
      />
      <Content>
        <IntroductionSection
          t={t}
        />
        <NumberSection
          buttonName={t('landing-section-1-button')}
          buttonHref="/recommend"
          number={1}
          Image={UnivImage}
          titleFirst={t('landing-section-1-title-1')}
          titleSecond={t('landing-section-1-title-2')}
        >
          {t('landing-section-1-subtitle-1')}
          <br />
          <SubTitleContainer dangerouslySetInnerHTML={{ __html: t('landing-section-1-subtitle-2') }} />
        </NumberSection>
        <NumberSection
          buttonName={t('landing-section-2-button')}
          buttonHref="/admission-consult"
          number={2}
          Image={ConsultImage}
          titleFirst={t('landing-section-2-title-1')}
          titleSecond={t('landing-section-2-title-2')}
        >
          <SubTitleContainer dangerouslySetInnerHTML={{ __html: t('landing-section-2-subtitle-1') }} />
          <br />
          {t('landing-section-2-subtitle-2')}
        </NumberSection>
        <NumberSection
          buttonName={t('landing-section-3-button')}
          buttonHref="/search-univ"
          number={3}
          Image={ClickImage}
          titleFirst={t('landing-section-3-title-1')}
          titleSecond={t('landing-section-3-title-2')}
        >
          {t('landing-section-3-subtitle-1')}
          <br />
          <SubTitleContainer dangerouslySetInnerHTML={{ __html: t('landing-section-3-subtitle-2') }} />
        </NumberSection>
      </Content>
    </FontProvider>
  );
};

export default LandingPage;
