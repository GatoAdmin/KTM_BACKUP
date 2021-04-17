import React from 'react';
import styled from 'styled-components';
import { borderColor, mainColor } from '@util/style/color';
import LogoIcon from '../../../assets/logo.svg';

const FooterContainer = styled.footer`
  width: 100%;
  height: 200px;
  background-color: ${borderColor};
`;

const FooterContent = styled.div`
  display: flex;
  width: 1400px;
  margin: 0 auto;
  padding: 50px 0;
`;

const LogoContainer = styled.div`
  display: flex;
  height: 100px;
  margin-right: 100px;
  color: ${mainColor};
  font: 900 45px/100px Nunito, sans-serif;
`;

const Logo = styled(LogoIcon)`
  width: 100px;
  height: 100px;
  margin-right: 20px;

  > path {
    fill: ${mainColor};
  }
`;

const SponsorContainer = styled.div`
  display: flex;
  opacity: 0.6;
`;

const SponsorImage = styled.img`
  width: 200px;
  height: 100px;
  object-fit: contain;
`;

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
