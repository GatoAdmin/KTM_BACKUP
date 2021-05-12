import styled from 'styled-components';
import { fontColor, mainColor } from '@util/style/color';
import LogoIcon from '../../../assets/logo.svg';
import MyPageIcon from '../../../assets/svg/mypage.svg';

interface HeaderContainerProps {
  show: boolean;
  isTop: boolean;
}

export const HeaderContainer = styled.header<HeaderContainerProps>`
  display: flex;
  position: fixed;
  top: 0;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 1400px;
  height: 90px;
  line-height: 116px;
  background-color: ${(props) => (props.isTop ? 'rgba(255, 255, 255, 0.6);' : 'white')};
  user-select: none;
  z-index: 3;
  transition: transform 0.5s ease 1.6s;
  transform: ${(props) => (props.show ? 'scaleY(1)' : 'scaleY(0)')};
  transform-origin: top center;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  font-family: Montserrat;
  font-size: 24px;
  font-weight: bold;
  line-height: 29px;
  color: ${fontColor};
`;

export const NavigationContainer = styled.nav`
  display: flex;
  margin-right: 100px;
`;

export const Navigation = styled.div`
  /* font-weight: bold;
  font-size: 14px; */
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

interface LocalizationSelectorProps {
  selectedIndex: number;
}

export const LocalizationSelector = styled.div<LocalizationSelectorProps>`
  position: absolute;
  left: 0;
  bottom: 35px;
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
  height: 90px;
  width: fit-content;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
`;

export const LinkButtonContainer = styled.div`
  margin-left: 50px;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MyPageLink = styled(MyPageIcon)`
  width: 30px;
  height: 30px;
  margin-right: 20px;
  cursor: pointer;
  display: block;
`;
