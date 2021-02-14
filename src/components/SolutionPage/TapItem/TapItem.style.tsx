import styled, { css } from 'styled-components';
import { fontColor } from '@util/style/color';
import { defaultFont } from '@util/style/font';

export const TapLabel = styled.label`  
  display: flex;

  font: normal bold 16px/22px ${defaultFont};

  text-decoration: none;
  padding: 21px 8px 18px 8px;
  cursor: pointer;
  color: ${(props)=>(props.color||'#9E9E9E')};
`;

export const TapInput = styled.input.attrs({
  type: 'radio',
})`
  display: none; 
  :checked + ${TapLabel} {
    color: #DF4D3D;
    border-bottom: 3px solid #DF4D3D;
  }
`;