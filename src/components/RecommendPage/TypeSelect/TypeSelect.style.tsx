import styled from 'styled-components';
import { lightGreyColor, mainColor } from '@util/style/color';
import { defaultFont } from '@util/style/font';

export const TypeSelectContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: -1px;
  border-bottom: 1px solid ${lightGreyColor};
`;
export const TypeSelectOption = styled.input.attrs({
  type: 'radio',
})`
  display: none;
`;

export const TypeSelectLabel = styled.label`
  display: block;
  padding: 15px 20px;
  border-bottom: 1px solid ${lightGreyColor};
  font: normal bold 18px/25px ${defaultFont};
  color: ${lightGreyColor};
  cursor: pointer;
  
  ${TypeSelectOption}:checked + & {
    border-bottom-color: ${mainColor};
    color: ${mainColor};
  }
`;
