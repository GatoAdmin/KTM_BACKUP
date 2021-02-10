
import styled, { css } from 'styled-components';
import ChangeCircleSVG from '@assets/svg/change_circle.svg';
import ClickHandSVG from '@assets/svg/click_hand_icon.svg';
import { fontColor, mainColor } from '@util/style/color';
import { defaultFont, logoFont } from '@util/style/font';
import { PropTypes } from 'mobx-react';

interface StepContainerProps {
    step: number;
}
interface NavItemProps {
    // color: string;
    // background : string;
    isStep : boolean;
}

export const ClickIcon = styled(ClickHandSVG)`
    display: block;
    margin: 0px auto 19px;
`;
export const ChangeCircleIcon = styled(ChangeCircleSVG)`
    display: block;
    margin: 0px auto 19px;
`;
export const SolutionHeader = styled.div`
    display: block;
    align-items: center;
    top: 0;
    justify-content: space-between;
    width: 1100px;
    font: normal normal normal 14px/19px ${defaultFont};
    background-color: transparent;
    user-select: none;
    z-index: 3;
`;

export const UnivContainer = styled.div`
    width: 1000px;
    display: inline-flex;
    justify-content: space-between;
    border-bottom: 0.8px solid rgba(196, 196, 196, 0.8);
    padding: 16px 50px;
`;


export const StepContainer = styled.header`
  display: flex;
  align-items: center;
  top: 0;
  justify-content: space-between;
  width: 1100px;
  border-bottom: 0.8px solid rgba(196, 196, 196, 0.8);

`;

export const Navigation = styled.div`
  display: flex;
  justify-content: space-around;
  flex: 1 1 0;
  padding: 0 250px;
  color: ${fontColor};
`;

export const NavigationContainer = styled.nav`
  display: flex;
  flex: 1 1 0;
  margin-right: 50px;
  width: 50%;
`;

export const NavLink = styled.a`
  color: inherit;
  text-decoration: none;
`;


export const NavItem = styled.div<NavItemProps>`
  text-decoration: none;
  font-weight: bold;
  padding: 21px 8px 18px 8px;
  ${(props)=>(props.isStep
    ?css`
    color: #DF4D3D;
    border-bottom: 3px solid #DF4D3D;
    `
    :css`
    color: ${(props.color||'inherit')};
    `
      
  )}
`;

export const UnivSelectButton = styled.button`
    width: 110px;
    height: 118px;
    background: #FFFFFF;
    color: #DF4D3D;
    font-weight: bold;
    border: 0.8px solid #C4C4C4;
    box-sizing: border-box;
    border-radius: 9px;
    right: 10px;
    > svg {
      fill: none;
    }
`;

interface UnivItemProps{
  logo: string;
};
export const UnivLogo = styled.img`
  width: 75px;
  height: 75px;
  margin: auto 20px auto 0;
`;
export const UnivItem = styled.div`
  display:flex;
  justify-content: space-between;
  min-width: 320px;
  min-heigh: 75px;
`;
export const UnivTextContainer = styled.div`
  display:inline-block;
  margin:auto 0 auto 0;
`;

export const UnivNameContainer = styled.div`
  display:flex;
  justify-content: left;
  padding-bottom:7px;
`;
export const UnivName = styled.div`
  font-weight: bold;
  font-size: 22px;
  line-height: 30px;
`;
export const UnivCategory = styled.div`
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  margin: auto 0 auto 12px;
  color: #DF4D3D;
`;
export const UnivDetailText = styled.div`
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;

  color: #9E9E9E;
`;