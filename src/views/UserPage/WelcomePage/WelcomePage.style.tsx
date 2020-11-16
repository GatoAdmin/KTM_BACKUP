import styled from 'styled-components';
import { fontColor, mainColor } from '@util/style/color';
import LogoIcon from '../../../assets/logo.svg';

export const WelcomePageBackground = styled.div`
  width: 100vw;
  min-width: 562px;
  height: 100vh;
  min-height: 620px;
  overflow: hidden;
`;

export const WelcomePageContainer = styled.div`
  position: relative;
  top: calc(50% - 260px);
  width: 620px;
  height: 520px;
  margin: 0 auto;
  text-align: center;
`;

export const Logo = styled(LogoIcon)`
  display: block;
  width: 192px;
  height: 192px;
  margin: 0 auto;

  > path {
    fill: ${mainColor};
  }
`;

export const LogoText = styled.div`
  margin: -30px 0 46px;
  font: normal 900 50px/69px Nunito;
  color: ${mainColor};
`;

export const WelcomeTitle = styled.h1`
  margin-bottom: 38px;
  font: normal bold 45px/40px NEXON Lv1 Gothic;
  color: ${fontColor};
`;

export const WelcomeSubTitle = styled.h2`
  margin-bottom: 84px;
  font: normal normal 900 37px/50px Nunito;
  color: ${fontColor};
`;

export const LogoSpan = styled.span`
  font: normal 900 50px/69px Nunito;
  color: ${mainColor};
`;

export const MoreInformationLink = styled.a`
  display: block;
  width: 266px;
  height: 63px;
  margin: 0 auto;
  border: 2px solid ${mainColor};
  border-radius: 25px;
  font: normal normal bold 20px/63px NEXON Lv1 Gothic;
  color: ${mainColor};
  text-decoration: none;
`;
