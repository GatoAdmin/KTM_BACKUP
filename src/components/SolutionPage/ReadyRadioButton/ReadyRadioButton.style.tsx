import styled, { css } from 'styled-components';
import { fontColor,mainColor600 } from '@util/style/color';
import { defaultFont } from '@util/style/font';

export const RadioLabel = styled.label`
  display: inline-block;
  min-width: 52px;
  min-height: 19px;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  align-items: center;
  text-align: center;
  padding: 10px 22px; 
  border: 2px solid ${mainColor600};
  box-sizing: border-box;
  border-radius: 100px;
  background:${mainColor600};
  color: #FFFFFF;
`;

export const RadioInput = styled.input.attrs({
  type: 'radio',
})`
  display: none; 
  :checked + ${RadioLabel} {
    background:rgba(255, 114, 99, 0.08);
    color: ${mainColor600};
  }
`;