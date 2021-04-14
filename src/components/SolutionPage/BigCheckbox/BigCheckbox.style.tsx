import styled from 'styled-components';
import { fontColor } from '@util/style/color';
import UnChecked from '@assets/svg/unchecked_checkbox.svg';
import Checked from '@assets/svg/checked_checkbox.svg';
import { defaultFont } from '@util/style/font';

export const CheckboxContainer = styled.div`
  display: flex;
  min-width: 100px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  font: normal bold 18px/25px ${defaultFont};
  color: ${fontColor};
  cursor: pointer;
`;

export const CheckboxIconContainer = styled.div`
  width: 16px;
  height: 16px;
  margin: auto 8px auto 0px;
`;

export const UnCheckedIcon = styled(UnChecked).attrs({
  viewBox: '0 0 16 16'
})`
  display: block;
  width: 16px;
  height: 16px;
  margin: 1px;
`;

export const CheckedIcon = styled(Checked).attrs({
  viewBox: '0 0 22 22'
})`
  display: none;
  width: 22px;
  height: 22px;
`;

export const CheckboxInput = styled.input.attrs({
  type: 'checkbox',
})`
  display: none;
  :checked + ${CheckboxLabel} ${UnCheckedIcon} {
    display: none;
  }
  :checked + ${CheckboxLabel} ${CheckedIcon} {
    display: block;
  }
`;
