import styled, { css } from 'styled-components';
import { fontColor, mainColor } from '@util/style/color';
import { defaultFont, logoFont } from '@util/style/font';
import LogoSVG from '@assets/header_logo.svg';

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

interface LocalizationSelectorProps {
  selectedIndex: number;
}

export const HeaderContainer = styled.header<HeaderContainerProps>`
  display: flex;
  align-items: center;
  top: 0;
  /* justify-content: space-between; */
  margin: 0 auto;
  padding: 22px 0;
  font: normal normal normal 14px/19px ${defaultFont};
  background-color: transparent;
  user-select: none;
  z-index: 3;

  ${(props) =>
    props.background === 'light'
      ? css`
          box-shadow: 0 0 5px #0f0f0f33;
        `
      : null}

  ${(props) =>
    props.position === 'relative'
      ? css`
          position: relative;
          padding: 22px 0;
        `
      : css`
          position: absolute;
        `}
`;

export const NavigationContainer = styled.nav`
  display: flex;
  /* margin-right: 50px; */
`;

export const Logo = styled(LogoSVG)`
  width: 143px;
  cursor: pointer;
`;

export const Navigation = styled.div`
  display: flex;
  width: 610px;
  justify-content: space-evenly;
  color: ${fontColor};
`;

export const NavLink = styled.a`
  color: inherit;
  text-decoration: none;
`;

export const LocalizationButtonContainer = styled.div`
  display: flex;
  position: relative;
`;

export const LocalizationSelector = styled.div<LocalizationSelectorProps>`
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 26px;
  border: 1px solid black;
  transition: transform ease 0.3s;
  transform: ${(props) => `translateX(${props.selectedIndex * 58}px)`};
`;

export const LocalizationButton = styled.button`
  display: inline-block;
  width: 26px;
  margin-right: 32px;
  padding: 0;
  border: 0;
  color: inherit;
  font: normal normal normal 14px/19px ${defaultFont};
  background-color: transparent;
  cursor: pointer;
  outline: none;

  :nth-child(1):hover ~ ${LocalizationSelector} {
    transform: translateX(0);
  }
  :nth-child(2):hover ~ ${LocalizationSelector} {
    transform: translateX(58px);
  }
`;

export const LoginLink = styled.a`
  width: 90px;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
`;
