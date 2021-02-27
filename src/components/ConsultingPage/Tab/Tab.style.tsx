import styled from 'styled-components';
import { fontColor, mainColor } from '@util/style/color';

interface LocalizationSelectorProps {
  selectedIndex: number;
}

interface LocalizationButtonProps {
  isSelected: boolean;
}

export const LocalizationButtonContainer = styled.div`
  position: relative;
  margin-top: 20px;
`;

export const LocalizationSelector = styled.div<LocalizationSelectorProps>`
  position: absolute;
  top: 32px;
  left: 13px;
  width: 80px;
  border: 1px solid #DF4D3D;
  transition: transform ease 0.3s;
  transform: ${(props) => `translateX(${props.selectedIndex * 128}px)`};
`;

export const LocalizationButton = styled.button<LocalizationButtonProps>`
  display: inline-block;
  width: 108px;
  margin-right: 20px;
  padding: 0;
  border: 0;
  outline: none;
  color: ${(props) => (props.isSelected ? '#DF4D3D' : '#9E9E9E')};
  font-weight: bold;
  background-color: transparent;
  cursor: pointer;
  user-select: none;

  :last-of-type {
    margin: 0;
  }

  :nth-child(1):hover ~ ${LocalizationSelector} {
    transform: translateX(0);
  }
  :nth-child(2):hover ~ ${LocalizationSelector} {
    transform: translateX(128px);
  }
  :nth-child(3):hover ~ ${LocalizationSelector} {
    transform: translateX(256px);
  }
`;
