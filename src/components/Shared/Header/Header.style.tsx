import styled, { css } from 'styled-components';
import { fontColor, mainColor } from '@util/style/color';
import { defaultFont, logoFont } from '@util/style/font';

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 50px 0 60px;
  font: 700 24px/29px ${logoFont};
  color: ${fontColor};
`;

interface HeaderContainerProps {
  background: 'light' | 'dark';
  position: 'relative' | 'absolute';
}

export const HeaderContainer = styled.header<HeaderContainerProps>`
  display: flex;
  align-items: center;
  top: 0;
  justify-content: space-between;
  padding: 44px 0 22px;
  width: 1100px;
  font: normal normal normal 14px/19px ${defaultFont};
  background-color: transparent;
  user-select: none;
  z-index: 3;

  ${(props) => (props.background === 'light'
    ? css`
          box-shadow: 0 0 5px #0f0f0f33;
        `
    : null)}

  ${(props) => (props.position === 'relative'
    ? css`
          position: relative;
          padding: 22px 0;
        `
    : css`
          position: absolute;
        `)}
`;

export const Navigation = styled.div`
  display: flex;
  justify-content: space-around;
  flex: 1 1 0;
  padding: 0 30px;
  color: ${fontColor};
`;

export const NavigationContainer = styled.nav`
  display: flex;
  flex: 1 1 0;
  margin-right: 50px;
`;

export const NavLink = styled.a`
  color: inherit;
  text-decoration: none;
`;

export const LocalizationButtonContainer = styled.div`
  display: flex;
  position: relative;
  width: 50px;
`;

export const LocalizationButton = styled.button`
  display: inline-block;
  width: 26px;
  padding: 0;
  border: 0;
  color: inherit;
  font: normal normal normal 14px/19px ${defaultFont};
  background-color: transparent;
  cursor: pointer;
`;

export const LoginLink = styled.a`
  margin-left: 30px;
  color: inherit;
  text-decoration: none;
`;
