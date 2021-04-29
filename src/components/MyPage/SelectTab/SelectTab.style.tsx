import { fontColor, mainColor } from '@util/style/color';
import styled from 'styled-components';

export const SelectTabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 100vw;
  border-bottom: 0.8px solid rgba(196, 196, 196, 0.8);
  margin-top: 80px;
`;

export const LocalizationButtonContainer = styled.div`
  display: flex;
  position: relative;
  margin: 0 0 0 90px;
`;

interface LocalizationSelectorProps {
  selectedIndex: number;
  isKorean: boolean;
}

interface LocalizationButtonProps {
  isSelect: boolean;
  isKorean: boolean;
}

export const LocalizationSelector = styled.div<LocalizationSelectorProps>`
  position: absolute;
  left: ${({ isKorean }) => (isKorean ? '7px' : '9px')};
  top: 37px;
  width: ${({ isKorean }) => (isKorean ? '100px' : '150px')};
  border: 3px solid ${mainColor};
  transition: transform ease 0.3s;
  transform: ${({ selectedIndex, isKorean }) => `translateX(${selectedIndex * (isKorean ? 220 : 275)}px)`
};
`;

export const LocalizationButton = styled.button<LocalizationButtonProps>`
  display: inline-block;
  width: ${(props) => (props.isKorean ? '120px' : '174px')};
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
    transform: translateX(${({ isKorean }) => (isKorean ? '220px' : '275px')});
  }
  :nth-child(3):hover ~ ${LocalizationSelector} {
    transform: translateX(${({ isKorean }) => (isKorean ? '440px' : '550px')});
  }
`;
