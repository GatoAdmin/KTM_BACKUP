import React from 'react';
import { LogoContainer } from '@components/LandingPage/Header/Header.style';
import useTranslate from '@util/hooks/useTranslate';
import i18nResource from '../../../assets/i18n/landingPage.json';
import {
  FooterContainer,
  FooterContent, //
  SponsorContainer,
  SponsorImage,
} from './Footer.style';

const Footer: React.FC = ({ t, lang }) => {
  return (
    <FooterContainer>
      <FooterContent>
        <LogoContainer>{t('university')}</LogoContainer>
        <SponsorContainer>
          <SponsorImage src="/images/CN_support.png" alt="충남컨텐츠코리아랩" />
        </SponsorContainer>
      </FooterContent>
    </FooterContainer>
  );
};
export default Footer;
