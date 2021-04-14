import styled from 'styled-components';
import { fontColor } from '@util/style/color';
import UnChecked from '@assets/svg/unchecked_checkbox.svg';
import Checked from '@assets/svg/checked_checkbox.svg';
import { defaultFont } from '@util/style/font';

export const CheckboxLabel = styled.label`
  display: flex;
  font: normal bold 18px/25px ${defaultFont};
  color: ${fontColor};
  cursor: pointer;
`;

export const CheckboxIconContainer = styled.div`
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  margin-right: 16px;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  min-width: 100px;
`;

export const UnCheckedIcon = styled(UnChecked)`
  display: block;
  width: 18px;
  height: 18px;
  margin: 1px;
`;

export const CheckedIcon = styled(Checked)`
  display: none;
  width: 22px;
  height: 22px;
`;

export const CheckboxInput = styled.input.attrs({
  type: 'radio',
})`
  display: none;
  :checked + ${CheckboxLabel} ${UnCheckedIcon} {
    display: none;
  }
  :checked + ${CheckboxLabel} ${CheckedIcon} {
    display: block;
  }
`;
