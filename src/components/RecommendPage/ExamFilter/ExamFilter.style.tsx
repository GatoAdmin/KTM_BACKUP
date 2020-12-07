import styled from 'styled-components';
import { fontColor } from '@util/style/color';

export const ExamFilterContainer = styled.div`
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

export const FilterIconContainer = styled.div`
  position: relative;
  width: 92px;
  height: 100%;

  > svg {
    width: 48px;
    height: 48px;
    margin-bottom: 10px;
  }
`;

export const FilterIconDescription = styled.div`
  width: 100%;
  font: normal normal normal 15px/18px NEXON Lv1 Gothic;
  color: white;
`;

export const ExamFilterRow = styled.div`
  display: flex;
`;

export const ExamFilterRowTitle = styled.div`
  flex: 0 0 auto;
  width: 90px;
  font: normal normal bold 20px/17px NEXON Lv1 Gothic;
  color: ${fontColor};
`;

export const ExamFilterRowContent = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

interface LabelProps {
  htmlFor: string;
}

export const ExamFilterCheckBoxContainer = styled.div`
  display: inline-block;
  width: 90px;
  height: 18px;
  margin: 0 20px 10px 0;
  
  :nth-child(3n) {
    margin-right: 0;
  }
`;

export const ExamFilterCheckBoxDescription = styled.div`
  flex: 1 1 0;
  text-align: center;
`;

export const ExamFilterCheckLabelBox = styled.div`
  display: inline-block;
  position: relative;
  width: 18px;
  height: 18px;
  margin-left: 20px;
  border: 1px solid ${fontColor};
  border-radius: 3px;
  
  ${ExamFilterCheckBoxDescription} + & {
    margin-left: auto;
  }

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

export const ExamFilterCheckBoxLabel = styled.label.attrs<LabelProps>(({ htmlFor }) => ({
  htmlFor,
}))`
  position: relative;
  display: flex;
  font: normal normal bold 15px/18px NEXON Lv1 Gothic;
  color: ${fontColor};
  text-align: center;
  cursor: pointer;
`;

interface CheckBoxProps {
  id: string;
  checked: boolean;
}

export const CheckBox = styled.input.attrs<CheckBoxProps>(({ id, checked }) => ({
  id,
  checked,
  type: 'checkbox',
}))`
  display: none;

  &:checked + ${ExamFilterCheckBoxLabel} > ${ExamFilterCheckLabelBox} > svg {
    display: block;
  }
`;
