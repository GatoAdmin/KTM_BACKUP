import styled from "styled-components";
import { fontColor, mainColor } from "src/util/style/color";


export const HeaderContainer = styled.header`
  display: flex;
  position: absolute;
  top: 0;
  justify-content: space-between;
	width: 100%;
	min-width: 1400px;
	height: 116px;
	line-height: 116px;
	background-color: transparent;
	user-select: none;
	z-index: 3;
`;

export const Logo = styled.img`
  width: 81px;
  height: 81px;
  margin-right: 19px;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 29px;
  color: ${mainColor};
  font: 900 45px/116px Nunito, sans-serif;
`;

export const Navigation = styled.div`
`;

export const NavigationContainer = styled.nav`
  display: flex;
  margin-right: 89px;
`;

export const NavLink = styled.a`
  margin-left: 60px;
  color: ${fontColor};
  text-decoration: none;
`;

export const LocalizationButtonContainer = styled.div`
  position: relative;
  width: 144px;
  margin-left: 90px;
`;

interface LocalizationSelectorProps {
  selectedIndex: number;
}

export const LocalizationSelector = styled.div<LocalizationSelectorProps>`
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 26px;
  border: 1px solid black;
  transition: transform ease .3s;
  transform: ${props => `translateX(${props.selectedIndex * 58}px)`};
`;

export const LocalizationButton = styled.button`
  display: inline-block;
  width: 26px;
  margin-right: 32px;
  padding: 0;
  border: 0;
  color: ${fontColor};
  background-color: transparent;
  cursor: pointer;
  
  :last-of-type {
    margin: 0;
  }
  
  :nth-child(1):hover~${LocalizationSelector} {
    transform: translateX(0);
  }
  :nth-child(2):hover~${LocalizationSelector} {
    transform: translateX(58px);
  }
  :nth-child(3):hover~${LocalizationSelector} {
    transform: translateX(116px);
  }
`


export const LoginLink = styled.a`
  margin-left: 50px;
  color: ${fontColor};
  text-decoration: none;
`;