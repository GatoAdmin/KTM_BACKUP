import styled, { css } from 'styled-components';
import LogoIcon from '../../../assets/logo.svg';
import { fontColor, mainColor } from "@util/style/color";


export const Logo = styled(LogoIcon)`
	width: 81px;
	height: 81px;
	margin-right: 19px;

	> path {
		fill: white;
	}
`;

export const LogoContainer = styled.div`
	display: flex;
	align-items: center;
	margin-left: 29px;
	font: 900 45px/116px Nunito, sans-serif;
`;

interface HeaderContainerProps {
	background: 'light' | 'dark';
}

export const HeaderContainer = styled.header<HeaderContainerProps>`
	display: flex;
	position: absolute;
	top: 0;
	justify-content: space-between;
	width: 100%;
	min-width: 1400px;
	height: 116px;
	font: normal normal normal 20px/116px NEXON Lv1 Gothic;
	background-color: transparent;
	user-select: none;
	z-index: 3;
	
	${props => props.background === 'light' ?
	css`
			color: ${fontColor};
			border-color: ${fontColor};
			
			${LogoContainer} {
				color: ${mainColor};
			}
			
			${Logo} > path {
				fill: ${mainColor};
			}
			
			box-shadow: 0 0 5px #0F0F0F33;
		` :
	css`
			color: white;
			border-color: white;
		`}
`;

export const Navigation = styled.div``;

export const NavigationContainer = styled.nav`
	display: flex;
	margin-right: 89px;
`;

export const NavLink = styled.a`
	margin-left: 60px;
	color: inherit;
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
	border: 1px solid currentColor;
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

	:last-of-type {
		margin: 0;
	}

	:nth-child(1):hover ~ ${LocalizationSelector} {
		transform: translateX(0);
	}
	:nth-child(2):hover ~ ${LocalizationSelector} {
		transform: translateX(58px);
	}
	:nth-child(3):hover ~ ${LocalizationSelector} {
		transform: translateX(116px);
	}
`;

export const LoginLink = styled.a`
	margin-left: 50px;
	color: inherit;
	text-decoration: none;
`;
