import styled from 'styled-components';
import {
  fontColor, lightBackgroundColor, mainColor, whiteColor,
} from '@util/style/color';
import { defaultFont } from '@util/style/font';

export const BadgeCheckboxLabel = styled.label`
  display: inline-block;
  height: 16px;
  padding: 5px 15px;
  border-radius: 13px;
  background: ${lightBackgroundColor};
  font: normal bold 12px/12px ${defaultFont};
  color: ${fontColor};
  cursor: pointer;
`;

export const BadgeCheckboxInput = styled.input.attrs({
  type: 'checkbox',
})`
  display: none;
  :checked + ${BadgeCheckboxLabel} {
    background: ${mainColor};
    color: ${whiteColor};
  }
`;
