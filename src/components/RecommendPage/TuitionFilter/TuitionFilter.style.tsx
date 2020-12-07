import styled from 'styled-components';
import { fontColor } from '@util/style/color';

export const TuitionFilterContainer = styled.div`
  position: relative;
`;

export const FilterButton = styled.button`
  width: 92px;
  height: 100%;
  border: 0;
  background: transparent;
  cursor: pointer;

  > svg {
    width: 48px;
    height: 48px;
    margin-bottom: 10px;
  }
`;

export const FilterCheckBoxContainer = styled.div`
  width: 100%;
  height: 15px;
  margin-bottom: 15px;
`;

export const FilterCheckLabelBox = styled.div`
  display: inline-block;
  position: relative;
  top: 0;
  width: 13px;
  height: 13px;
  margin-right: 9px;
  border: 1px solid white;
  border-radius: 4px;

  > svg {
    display: none;
    position: absolute;
    left: 1px;
    width: 15px;
  }
`;

export const FilterIconDescription = styled.div`
  width: 100%;
  font: normal normal normal 15px/18px NEXON Lv1 Gothic;
  color: white;
`;

interface LabelProps {
  htmlFor: string;
}

export const TuitionFilterCheckBoxContainer = styled.div`
  display: inline-block;
  width: 130px;
  height: 18px;
  margin: 0 20px 39px 0;

  :nth-child(4n + 1) {
    margin-right: 0;
  }
`;

export const TuitionFilterCheckLabelBox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 18px;
  height: 18px;
  border: 1px solid ${fontColor};
  border-radius: 3px;

  > svg {
    display: none;
    position: absolute;
    left: 2px;
    width: 21px;

    path {
      fill: black;
    }
  }
`;

export const TuitionFilterCheckBoxLabel = styled.label.attrs<LabelProps>(({ htmlFor }) => ({
  htmlFor,
}))`
  position: relative;
  display: flex;
  font: normal normal bold 13px/18px NEXON Lv1 Gothic;
  color: ${fontColor};
  cursor: pointer;
`;

interface CheckBoxProps {
  id: string;
  value: string;
  defaultChecked: boolean;
}

export const CheckBox = styled.input.attrs<CheckBoxProps>(({ id, value, defaultChecked }) => ({
  id,
  value,
  defaultChecked,
  type: 'checkbox',
}))`
  display: none;

  &:checked + ${TuitionFilterCheckBoxLabel} ${TuitionFilterCheckLabelBox} > svg {
    display: block;
  }
`;
