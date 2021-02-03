import styled from 'styled-components';
import { defaultFont } from '@util/style/font';
import { mainColor, greyColor, lightGreyColor } from '@util/style/color';

export const RegisterTitle = styled.h1`
  width: 150px;
  margin: 0 auto 33px;
  font: 20px/23px ${defaultFont};
  color: ${greyColor};
  text-align: center;
`;

export const RegisterForm = styled.form`
  width: 323px;
  margin: 0 auto 42px;
`;

export const RegisterFieldset = styled.fieldset`
  margin: 0;
  padding: 0;
  border: 0;
  clear: both;
`;

export const RegisterLegend = styled.legend`
  display: block;
  overflow: hidden;
  position: absolute;
  width: 0;
  height: 0;
  line-height: 0;
`;

export const RegisterInputRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 323px;
  margin-bottom: 22px;
  font: normal 300 20px ${defaultFont};
  color: ${greyColor};
`;

export const RegisterInputGroup = styled.div`
  width: 100%;
`;

export const RegisterInputSmallGroup = styled.div`
  width: 140px;
`;

export const RegisterInputExtraSmallGroup = styled.div`
  width: 100px;
`;

export const RegisterInput = styled.input`
  width: calc(100% - 16px);
  height: 22px;
  margin-bottom: 10px;
  padding-left: 9px;
  border: 1px solid ${greyColor};
  border-radius: 20px;
  font: 9px/23px ${defaultFont};
  color: ${greyColor};
`;

export const RegisterAlert = styled.div`
  height: 10px;
  padding-left: 9px;
  font: normal 300 9px ${defaultFont};
  color: ${mainColor};
  text-align: left;
`;

export const RegisterButton = styled.button`
  display: block;
  width: 323px;
  height: 32px;
  margin: 0 auto;
  padding: 0;
  border: 1px solid ${mainColor};
  border-radius: 20px;
  background: transparent;
  font: normal normal normal 14px/30px ${defaultFont};
  color: ${mainColor};
  text-align: center;
  cursor: pointer;
  outline: none;
`;

export const RegisterSelect = styled.div`
  display: flex;
  position: relative;
  width: calc(100% - 9px);
  height: 22px;
  padding-left: 7px;
  border: 1px solid ${greyColor};
  border-radius: 20px;
  cursor: pointer;

  ::after {
    position: absolute;
    top: 9px;
    right: 9px;
    display: block;
    width: 8px;
    height: 8px;
    background: ${greyColor};
    content: '';
    clip-path: polygon(0 0, 100% 0, 50% 100%);
  }
`;

export const RegisterSelectDisplayInput = styled.input.attrs(() => ({
  disabled: true,
}))`
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  font: 9px/13px normal ${defaultFont};
  color: ${greyColor};
  cursor: pointer;
`;

export const RegisterInputTitle = styled.h3`
  display: block;
  width: 323px;
  margin: 0 0 14px;
  font: normal 11px/13px ${defaultFont};
  color: ${greyColor};
`;

export const RegisterThirdPartyButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto 40px;
`;

export const RegisterThirdPartyButton = styled.button`
  display: inline-flex;
  align-items: center;
  width: 170px;
  height: 30px;
  margin-right: 14px;
  padding-left: 21px;
  border: 1px solid ${lightGreyColor};
  border-radius: 25px;
  background: transparent;
  font: 9px/30px ${defaultFont};
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
  font: normal normal normal 13px/34px ${defaultFont};
  color: ${mainColor};
  text-align: center;
  text-decoration: none;
  cursor: pointer;
`;
