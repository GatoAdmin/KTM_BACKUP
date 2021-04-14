import { fontColor, mainColor } from '@util/style/color';
import styled from 'styled-components';

export const SelectTabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  border-bottom: 0.8px solid rgba(196, 196, 196, 0.8);
`;

export const LocalizationButtonContainer = styled.div`
  display: flex;
  position: relative;
  margin: 0 0 0 90px;
`;

interface LocalizationSelectorProps {
  selectedIndex: number;
}

interface LocalizationButtonProps {
    isSelect: boolean;
}

export const LocalizationSelector = styled.div<LocalizationSelectorProps>`
  position: absolute;
  left: 7px;
  top: 37px;
  width: 100px;
  border: 3px solid ${mainColor};
  transition: transform ease 0.3s;
  transform: ${(props) => `translateX(${props.selectedIndex * 220}px)`};
`;

export const LocalizationButton = styled.button<LocalizationButtonProps>`
  display: inline-block;
  width: 120px;
  margin-right: 100px;
  padding: 0;
  border: 0;
  color: ${(props) => (props.isSelect ? mainColor : fontColor)};
  background-color: transparent;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  outline: none;

  :last-of-type {
    margin: 0;
  }

  :nth-child(1):hover ~ ${LocalizationSelector} {
    transform: translateX(0);
  }
  :nth-child(2):hover ~ ${LocalizationSelector} {
    transform: translateX(220px);
  }
  :nth-child(3):hover ~ ${LocalizationSelector} {
    transform: translateX(440px);
  }
`;
