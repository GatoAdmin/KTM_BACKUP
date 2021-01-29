import styled from 'styled-components';
import { mainColor, greyColor, lightGreyColor } from '@util/style/color';
import LogoIcon from '../../../assets/logo.svg';

export const LogoContainer = styled.div`
  width: 150px;
  margin: 0 auto 31px;
  font: normal normal 900 38px/51px Nunito;
  color: ${mainColor};
`;

export const Logo = styled(LogoIcon)`
  width: 132px;
  height: 132px;
  margin: 0 9px -32px;

  > path {
    fill: ${mainColor};
  }
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
  font: 11px/13px normal;
  color: ${greyColor};
  outline: none;
  :focus {
    border: 1px solid ${mainColor};
  }
`;

export const LoginAlert = styled.div`
  height: 10px;
  padding-left: 14px;
  font: normal 9px NEXON Lv1 Gothic;
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
  font: normal normal normal 13px/32px NEXON Lv1 Gothic;
  color: ${mainColor};
  text-align: center;
  cursor: pointer;
  outline: none;
`;

export const LoginTextContainer = styled.div`
  margin-bottom: 38px;
  font: 15px/19px;
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
  width: 160px;
  height: 30px;
  margin-right: 10px;
  padding-left: 21px;
  border: 1px solid ${lightGreyColor};
  border-radius: 25px;
  background: transparent;
  font: 9px/30px NEXON Lv1 Gothic;
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
  margin: 0 auto;
  padding: 0;
  border: 1px solid ${mainColor};
  border-radius: 20px;
  background: transparent;
  font: normal normal normal 13px/34px NEXON Lv1 Gothic;
  color: ${mainColor};
  text-align: center;
  text-decoration: none;
  cursor: pointer;
`;

// popup
export const LoadingPopup = styled.div`
  /* background-color: green; */
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0%;
  left: 0%;
  display: flex;
  justify-content: center;
  align-items: center;
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
