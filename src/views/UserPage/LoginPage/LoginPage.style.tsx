import styled, { css } from 'styled-components';

import { mainColor, greyColor, lightGreyColor, fontColor } from '@util/style/color';
import { defaultFont } from '@util/style/font';
import LogoIcon from '../../../assets/logo.svg';

const putCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LogoContainer = styled.div`
  width: 100%;
  font: normal normal 900 38px/51px Nunito;
  color: ${mainColor};
  ${putCenter};
`;

export const Logo = styled(LogoIcon)`
  margin: 40px 0 60px 0;
  cursor: pointer;
`;

export const LanguageConvertWrapper = styled.div`
  position: absolute;
  top: 105px;
  right: 95px;

  display: flex;
  justify-content: space-between;

  width: 70px;
  height: 25px;
`;

export const Language = styled.span`
  font-size: 18px;
  color: #000;
  cursor: pointer;
`;

export const LoginForm = styled.form`
  width: 323px;
  margin: 0 auto 42px;
`;

export const LoginFieldset = styled.fieldset`
  clear: both;
  margin: 0;
  padding: 0;
  border: 0;
`;

export const LoginLegend = styled.legend`
  display: block;
  overflow: hidden;
  position: absolute;
  width: 0;
  height: 0;
  line-height: 0;
`;

export const LoginInputGroup = styled.div`
  width: 100%;
  height: 54px;
  margin-bottom: 22px;
`;

export const LoginInput = styled.input`
  width: calc(100% - 16px);
  height: 34px;
  margin-bottom: 10px;
  padding-left: 14px;
  border: 1px solid ${greyColor};
  border-radius: 20px;
  font: 14px/13px ${defaultFont};
  color: ${fontColor};
  outline: none;
  :focus {
    border: 1px solid ${mainColor};
  }
`;

export const LoginAlert = styled.div`
  height: 10px;
  padding-left: 14px;
  font: normal 12px ${defaultFont};
  color: ${mainColor};
  text-align: left;
`;

export const LoginButton = styled.button`
  display: block;
  width: 323px;
  height: 34px;
  margin: 0 auto;
  padding: 0;
  border: 1px solid ${mainColor};
  border-radius: 20px;
  background: transparent;
  font: normal normal normal 13px/32px ${defaultFont};
  color: ${mainColor};
  text-align: center;
  cursor: pointer;
  outline: none;
`;

export const LoginTextContainer = styled.div`
  margin-bottom: 38px;
  font: 15px/19px ${defaultFont};
  color: ${greyColor};
  text-align: center;
`;

export const LoginHelpLink = styled.a`
  margin: 0 10px;
  color: inherit;
  text-decoration: none;
`;

export const RegisterThirdPartyButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto 40px;
`;

export const RegisterThirdPartyButton = styled.button`
  display: inline-flex;
  align-items: center;
  width: 190px;
  height: 30px;
  margin-right: 10px;
  padding-left: 21px;
  border: 1px solid ${lightGreyColor};
  border-radius: 25px;
  background: transparent;
  font: 12px/30px ${defaultFont};
  color: ${greyColor};
  cursor: pointer;

  :last-child {
    margin: 0;
  }
`;

export const ThirdPartyLogo = styled.img`
  width: 13px;
  height: 13px;
  margin-right: 7px;
  object-fit: contain;
`;

export const RegisterLink = styled.a`
  display: block;
  width: 323px;
  height: 34px;
  margin: 0 auto 40px;
  padding: 0;
  border: 1px solid ${mainColor};
  border-radius: 20px;
  background: transparent;
  font: normal normal normal 13px/34px ${defaultFont};
  color: ${mainColor};
  text-align: center;
  text-decoration: none;
  cursor: pointer;
`;

// popup
export const LoadingPopup = styled.div`
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0%;
  left: 0%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Loading = styled.div`
  width: 100px;
  height: 100px;
  border-right: 3px solid ${mainColor};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-animation: rotation 1.1s infinite linear;
  animation: rotation 1.1s infinite linear;
  @-webkit-keyframes rotation {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes rotation {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;
