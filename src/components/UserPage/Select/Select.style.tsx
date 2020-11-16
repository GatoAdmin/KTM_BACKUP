import styled, { css } from 'styled-components';
import { greyColor } from '@util/style/color';

export const SelectContainer = styled.div`
  display: flex;
  position: relative;
  width: calc(100% - 9px);
  height: 22px;
  padding-left: 7px;
  border: 1px solid ${greyColor};
  border-radius: 20px;
  cursor: pointer;

  ::after {
    position: absolute;
    top: 9px;
    right: 9px;
    display: block;
    width: 8px;
    height: 8px;
    background: ${greyColor};
    content: '';
    clip-path: polygon(0 0, 100% 0, 50% 100%);
  }
`;

export const SelectDisplay = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  font: 9px/22px normal NEXON Lv1 Gothic;
  color: ${greyColor};
  cursor: pointer;
`;

interface showProps {
  show: boolean;
}

export const OptionContainer = styled.div<showProps>`
  position: absolute;
  top: 26px;
  left: 0;
  width: calc(100% - 20px);
  height: 80px;
  padding: 9px;
  border: 1px solid ${greyColor};
  border-radius: 10px;
  background: white;
  overflow-y: scroll;
  cursor: default;
  scrollbar-width: none;
  z-index: 3;

  ${(props) =>
    props.show
      ? css`
          display: block;
        `
      : css`
          display: none;
        `}

  ::-webkit-scrollbar {
    width: 0;
  }
`;

export const Option = styled.div`
  width: 100%;
  height: 9px;
  margin-bottom: 6px;
  font: 8px/9px NEXON Lv1 Gothic;
  color: ${greyColor};
  cursor: pointer;
`;
