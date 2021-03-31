import styled, { css } from 'styled-components';
import { fontColor, greyColor, mainColor600, whiteColor } from '@util/style/color';
import { defaultFont } from '@util/style/font';

export const SelectContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 32px;
  cursor: pointer;
`;

interface showProps {
  show: boolean;
  is_placeholder?: boolean;
}

export const SelectDisplay = styled.div<showProps>`
  width: 92%;
  margin: auto 0;
  border: 0;
  background: transparent;
  font: 16px/22px ${defaultFont};
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  ::after {
    position: absolute;
    right: 9px;
    display: block;
    width: 8px;
    height: 8px;
    content: '';
    
    ${(props) => (props.show
      ? css`
            top: 10px;
            border-top: 1px solid #232323;
            border-right: 1px solid #232323;
            transform: rotate(315deg);
          `
      : css`
            top: 6px;
            border-top: 1px solid #232323;
            border-right: 1px solid #232323;
            transform: rotate(135deg);
          `)}
  }
  
  ${(props) => (props.is_placeholder
    ? css`
          color: ${greyColor};
        `
    : css`
          color: ${fontColor};
        `)}
`;

export const OptionContainer = styled.div<showProps>`
  position: absolute;
  top: 38px;
  left: 0;
  width: calc(100% - 25px);
  height: 150px;
  padding: 9px;
  background: white;
  overflow-y: scroll;
  cursor: default;
  scrollbar-width: none;
  z-index: 3;

  ${(props) => (props.show
    ? css`
          display: block;
        `
    : css`
          display: none;
        `)}

  ::-webkit-scrollbar {
    width: 11px;
    background: rgba(255, 114, 99, 0.08);
  }
  ::-webkit-scrollbar-thumb {
    width: 5px;
    border-radius: 5px;
    background: ${greyColor};
    background-clip: padding-box;
    border: 3px solid transparent;    
}
`;

export const Option = styled.div`
  width: 100%;
  height: 25px;
  margin-bottom: 6px;
  font: 16px/22px ${defaultFont};
  color: ${fontColor};
  cursor: pointer;

  :hover{
      color:${mainColor600};
  }
`;
