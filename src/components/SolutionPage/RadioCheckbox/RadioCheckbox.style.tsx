import styled from 'styled-components';
import { fontColor } from '@util/style/color';
import UnChecked from '@assets/svg/unchecked_checkbox.svg';
import Checked from '@assets/svg/checked_checkbox.svg';
import { defaultFont } from '@util/style/font';

export const RadioCheckboxContainer = styled.div`
  display:flex;
  align-items: center;
  margin-right: 40px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font: normal normal 16px/22px ${defaultFont};
  color: ${fontColor};
  cursor: pointer;
`;

export const CheckboxIconContainer = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`;

export const UnCheckedIcon = styled(UnChecked)`
  display: block;
  width: 14px;
  height: 14px;
  margin: 1px;
`;

export const CheckedIcon = styled(Checked)`
  display: none;
  width: 16px;
  height: 16px;
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
