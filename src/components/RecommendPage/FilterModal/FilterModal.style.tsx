import styled, { css } from 'styled-components';
import { fontColor } from '@util/style/color';

interface FilterModalContainerProps {
  width: string;
  height: string;
  show: boolean;
  hasDescription: boolean;
}

export const FilterModalContainer = styled.div<FilterModalContainerProps>`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  flex-wrap: wrap;
  position: absolute;
  top: 58px;
  border-radius: 11px;
  background: white;
  box-sizing: border-box;
  box-shadow: 3px 3px 5px #00000029;
  z-index: 4;

  ${(props) => css`
      width: ${props.width};
      height: ${props.height};
      padding: ${props.hasDescription ? '59px 21px 33px' : '33px 21px'};
    `}
`;

export const FilterModalDescription = styled.div`
  position: absolute;
  top: 14px;
  left: 14px;
  font: normal normal bold 15px/18px NEXON Lv1 Gothic;
  color: ${fontColor};
`;

export const FilterModalButtonContainer = styled.div`
  position: absolute;
  right: 33px;
  bottom: 21px;
`;

export const FilterModalButton = styled.button`
  width: 67px;
  height: 20px;
  margin: 0;
  padding: 0;
  border: 1px solid ${fontColor};
  border-radius: 11px;
  background: white;
  font: normal normal normal 9px/20px NEXON Lv1 Gothic;
  color: ${fontColor};
  cursor: pointer;
`;

export const FilterModalDoneButton = styled(FilterModalButton)`
  margin-right: 18px;
  :hover {
    background: ${fontColor};
    color: white;
  }
`;
