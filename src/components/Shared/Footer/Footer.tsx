import { LogoContainer } from '@components/LandingPage/Header/Header.style';
import React from 'react';
import {
  FooterContainer,
  FooterContent, //
  Logo,
  SponsorContainer,
  SponsorImage,
} from './Footer.style';

const Footer: React.FC = () => (
  <FooterContainer>
    <FooterContent>
      <LogoContainer>
        <Logo />
        katumm
      </LogoContainer>
      <SponsorContainer>
        <SponsorImage src="/images/CN_support.png" alt="충남컨텐츠코리아랩" />
      </SponsorContainer>
    </FooterContent>
  </FooterContainer>
);

export default Footer;
