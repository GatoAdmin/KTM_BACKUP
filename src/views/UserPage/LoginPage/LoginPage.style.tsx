import styled from "styled-components";
import LogoIcon from '../../../assets/logo.svg';
import {mainColor} from "@util/style/color";

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

export const LoginInputGroup = styled.div`

`

export const LoginInput = styled.input`

`;
