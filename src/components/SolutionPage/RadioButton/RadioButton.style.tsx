import styled, { css } from 'styled-components';
import { fontColor } from '@util/style/color';
import { defaultFont } from '@util/style/font';

export const RadioLabel = styled.label`  
  display: flex;
  min-width: 53px;
  height: 50px;
  padding: 14px 28px 14px 28px;
  font: normal bold 16px/22px ${defaultFont};
  align-item: center;
  flex-direction: column;
  justify-content: center;
  margin: 0 10px 12px 0;

  color: ${fontColor};
  cursor: pointer;
  background: #FFFFFF;
  border: 2px solid #E5E5E5;
  box-sizing: border-box;
  border-radius: 9px;
`;
export const RadioInput = styled.input.attrs({
  type: 'radio',
})`
  display: none; 
  :checked + ${RadioLabel} {
    background: rgba(255, 114, 99, 0.08);
    border: 2px solid #DF4D3D;
    color: #DF4D3D;
  }
`;