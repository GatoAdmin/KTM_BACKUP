import styled from 'styled-components';
import { borderColor, mainColor } from '@util/style/color';
import LogoIcon from '../../../assets/logo.svg';

export const FooterContainer = styled.footer`
  width: 100%;
  height: 200px;
  background-color: ${borderColor};
`;

export const FooterContent = styled.div`
  display: flex;
  width: 1400px;
  margin: 0 auto;
  padding: 50px 0;
`;

export const LogoContainer = styled.div`
  display: flex;
  height: 100px;
  margin-right: 100px;
  color: ${mainColor};
  font: 900 45px/100px Nunito, sans-serif;
`;

export const Logo = styled(LogoIcon)`
  width: 100px;
  height: 100px;
  margin-right: 20px;

  > path {
    fill: ${mainColor};
  }
`;

export const SponsorContainer = styled.div`
  display: flex;
  opacity: 0.6;
`;

export const SponsorImage = styled.img`
  width: 200px;
  height: 100px;
  object-fit: contain;
`;
