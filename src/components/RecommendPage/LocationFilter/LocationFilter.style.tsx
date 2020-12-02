import styled from "styled-components";
import {fontColor} from "@util/style/color";

export const LocationFilterContainer = styled.div`
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

export const LocationFilterCheckLabelBox = styled.div`
  position: relative;
  width: 18px;
  height: 18px;
  margin-left: 25px;
  border: 1px solid ${fontColor};
  border-radius: 3px;

  svg {
    display: none;
    position: absolute;
    left: 2px;
    width: 21px;

    path {
      fill: black;
    }
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

export const FilterCheckBoxLabel = styled.label.attrs<LabelProps>(({ htmlFor }) => ({
  htmlFor,
}))`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 15px;
  font: normal normal normal 10px/15px NEXON Lv1 Gothic;
  cursor: pointer;
`;

export const LocationFilterCheckBoxContainer = styled.div`
  display: inline-block;
  width: 80px;
  height: 21px;
  margin: 0 46px 34px 0;

  :nth-child(5n) {
    margin-right: 0;
  }
`;

export const LocationFilterCheckBoxLabel = styled.label.attrs<LabelProps>(({ htmlFor }) => ({
  htmlFor,
}))`
  display: flex;
  font: normal normal 700 18px/21px NEXON Lv1 Gothic;
  color: ${fontColor};
  cursor: pointer;
`;

interface CheckBoxProps {
  id: string;
  defaultChecked: boolean;
}

export const CheckBox = styled.input.attrs<CheckBoxProps>(({ id, defaultChecked }) => ({
  id,
  defaultChecked,
  type: 'checkbox',
}))`
  display: none;

  &:checked + ${LocationFilterCheckBoxLabel} > ${LocationFilterCheckLabelBox} > svg {
    display: block;
  }
`;