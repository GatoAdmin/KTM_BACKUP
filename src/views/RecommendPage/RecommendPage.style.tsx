import styled, { css } from "styled-components";
import {fontColor, mainColor} from "@util/style/color";
import Filter from "../../assets/filter.svg";

export const SearchSectionContainer = styled.div`
  width: 100vw;
  min-width: 1400px;
  height: 397px;
  background: url("/images/search_background.jpg") center/cover no-repeat;
`;

export const SearchSection = styled.div`
  width: 754px;
  padding-top: 137px;
  margin: auto;
  font: bold 30px/35px NEXON Lv1 Gothic;
  color: white;
  text-align: center;
`;

export const SearchBarContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const SearchBar = styled.div`
  display: flex;
  justify-content: space-around;
  position: relative;
  width: 565px;
  height: 40px;
  padding: 0 5px 0 20px;
  margin: 43px auto 0;
  border-radius: 20px;
  background: white;
`;

export const SearchInput = styled.input`
  width: 520px;
  height: 24px;
  margin-top: 8px;
  border: 0;
  background: transparent;
  font: normal 20px/20px NEXON Lv1 Gothic;
`;

export const SearchButton = styled.button`
  width: 34px;
  height: 34px;
  margin-top: 3px;
  padding: 9px;
  border: 0;
  border-radius: 17px;
  background: ${mainColor};
  cursor: pointer;
`;

export const SearchIcon = styled.img`
  display: block;
  width: 16px;
  height: 16px;
`

export const FilterShowIcon = styled(Filter)`
  width: 25px;
  height: 25px;
`;

export const FilterShowLabel = styled.label.attrs({
  htmlFor: "filter-show-button"
})`
  position: absolute;
  top: 0;
  right: 0;
  width: 27px;
  height: 27px;
  padding: 3px;
  border: 2px solid white;
  border-radius: 37px;
  background: transparent;
  cursor: pointer;

  ::after {
    display: block;
    position: absolute;
    top: 49px;
    right: -2px;
    width: 37px;
    font: normal normal normal 10px/12px NEXON Lv1 Gothic;
    color: white;
    content: "필터";
  }
`

export const FilterShowButton = styled.input.attrs({
  id: "filter-show-button",
  type: "checkbox"
})`
  display: none;

  &:checked + ${FilterShowLabel} {
    background: white;
    border: 2px solid ${mainColor};
    
    ${FilterShowIcon} > path {
      fill: ${mainColor};
    }
  }
`;

interface FilterContainerProps {
  show: boolean
}

export const FilterContainer = styled.div<FilterContainerProps>`
  position: relative;
  justify-content: space-between;
  height: 84px;
  margin: 30px 0 0;
  
  ${props => props.show ?
    css`
      display: flex;
    ` :
    css`
      display: none;
    `}
`

export const FilterIconDescription = styled.div`
  width: 100%;
  font: normal normal normal 15px/18px NEXON Lv1 Gothic;
  color: white;
`;

export const SearchFilter = styled.div`
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

export const FilterInputContainer = styled.div`
  position: absolute;
  top: 0;
  right: -70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 54px;
  height: 100%;
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

interface LabelProps {
  htmlFor: string
}

interface CheckBoxProps {
  id: string
}

export const FilterCheckBoxLabel = styled.label.attrs<LabelProps>(({htmlFor}) => ({
  htmlFor
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

export const LocationFilterCheckLabelBox = styled.div`
  position: relative;
  width: 18px;
  height: 18px;
  margin-left: 25px;
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

export const LocationFilterCheckBoxLabel = styled.label.attrs<LabelProps>(({htmlFor}) => ({
  htmlFor
}))`
  display: flex;
  font: normal normal 700 18px/21px NEXON Lv1 Gothic;
  color: ${fontColor};
  cursor: pointer;
`;

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

export const TuitionFilterCheckBoxLabel = styled.label.attrs<LabelProps>(({htmlFor}) => ({
  htmlFor
}))`
  position: relative;
  display: flex;
  font: normal normal bold 13px/18px NEXON Lv1 Gothic;
  color: ${fontColor};
  cursor: pointer;
`;

export const TopikFilterCheckBoxContainer = styled.div`
  display: inline-block;
  width: 77px;
  height: 18px;
  margin: 0 75px 30px 0;
  
  :nth-child(3n + 1) {
    margin-left: 19px;
  }
  :nth-child(3n) {
    margin-right: 0;
  }
`;

export const TopikFilterCheckLabelBox = styled.div`
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

export const TopikFilterCheckBoxLabel = styled.label.attrs<LabelProps>(({htmlFor}) => ({
  htmlFor
}))`
  position: relative;
  display: flex;
  font: normal normal bold 18px/21px NEXON Lv1 Gothic;
  color: ${fontColor};
  cursor: pointer;
`;

export const CheckBox = styled.input.attrs<CheckBoxProps>(({id}) => ({
  id,
  type: "checkbox"
}))`
  display: none;
  
  &:checked + ${FilterCheckBoxLabel} > ${FilterCheckLabelBox} > svg,
  &:checked + ${LocationFilterCheckBoxLabel} ${LocationFilterCheckLabelBox} > svg,
  &:checked + ${TuitionFilterCheckBoxLabel} ${TuitionFilterCheckLabelBox} > svg,
  &:checked + ${TopikFilterCheckBoxLabel} ${TopikFilterCheckLabelBox} > svg {
    display: block;
  }
`;

export const UnivListSection = styled.div`
  width: 1400px;
  margin: 0 auto;
  padding: 42px 0 236px;
`;

export const UnivListTitle = styled.h3`
  display: block;
  margin: 0 0 46px;
  font: normal normal bold 30px/35px NEXON Lv1 Gothic;
  color: ${fontColor};
`

export const UnivListPagination = styled.div`
  margin-bottom: 159px;
  font: normal normal bold 30px/35px NEXON Lv1 Gothic;
  color: ${fontColor};
  text-align: center;
`;

export const UnivListPrevButton = styled.button`
  margin-right: 71px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;

  :after {
    display: block;
    width: 13px;
    height: 21px;
    clip-path: polygon(0 50%, 100% 0, 100% 100%);
    background: ${fontColor};
    content: "";
  }
`;

export const UnivListNextButton = styled.button`
  margin-left: 71px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;

  :after {
    display: block;
    width: 13px;
    height: 21px;
    clip-path: polygon(0 0, 100% 50%, 0 100%);
    background: ${fontColor};
    content: "";
  }
`;
