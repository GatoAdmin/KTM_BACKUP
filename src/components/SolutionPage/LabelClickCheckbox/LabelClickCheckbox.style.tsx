import styled from 'styled-components';
import { fontColor } from '@util/style/color';
import UnChecked from '@assets/svg/unchecked_checkbox.svg';
import Checked from '@assets/svg/checked_checkbox.svg';
import { defaultFont } from '@util/style/font';

export const CheckboxLabel = styled.label`
  display: flex;
  font: normal bold 12px/16px ${defaultFont};
  color: ${fontColor};
  cursor: pointer;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  min-width: 100px;
`;
