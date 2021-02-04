import styled, { css } from 'styled-components';
import { greyColor } from '@util/style/color';
import { defaultFont } from '@util/style/font';

export const SelectContainer = styled.div`
  display: flex;
  position: relative;
  width: calc(100% - 9px);
  height: 34px;
  padding-left: 7px;
  border: 1px solid ${greyColor};
  border-radius: 20px;
  cursor: pointer;
  margin-bottom: 10px;

  ::after {
    position: absolute;
    top: 14px;
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
  width: 92%;
  margin: 0;
  padding-left: 5px;
  border: 0;
  background: transparent;
  font: 14px/34px ${defaultFont};
  color: ${greyColor};
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

interface showProps {
  show: boolean;
}

export const OptionContainer = styled.div<showProps>`
  position: absolute;
  top: 38px;
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

  ${(props) => (props.show
    ? css`
          display: block;
        `
    : css`
          display: none;
        `)}

  ::-webkit-scrollbar {
    width: 0;
  }
`;

export const Option = styled.div`
  width: 100%;
  height: 15px;
  margin-bottom: 6px;
  font: 12px/8px ${defaultFont};
  color: ${greyColor};
  cursor: pointer;
`;
