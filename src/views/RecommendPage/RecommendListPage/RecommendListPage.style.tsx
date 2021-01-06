import styled from 'styled-components';
import { fontColor, mainBackgroundColor, whiteColor } from '@util/style/color';
import { defaultFont } from '@util/style/font';

export const UnivListSection = styled.section`
  position: relative;
  width: 1000px;
  margin: 0 auto;
  padding: 42px 0 100px;
`;

export const UnivListTitle = styled.h3`
  display: block;
  margin: 0 0 46px;
  font: normal normal bold 30px/35px NEXON Lv1 Gothic;
  color: ${fontColor};
`;

export const UnivListLoadTrigger = styled.div`
  position: absolute;
  bottom: 490px;
`;

export const SearchSectionContainer = styled.div`
  position: relative;
  height: 340px;
  background: linear-gradient(rgba(255,255,255, 0.5), rgba(255,255,255, 0.5)), url("/images/search_background.jpg") center/cover no-repeat;
`;

export const SearchSectionTitle = styled.h1`
  display: inline-block;
  width: 100%;
  padding: 0;
  margin: 165px 0 0;
  font: normal bold 26px/35px ${defaultFont};
  text-align: center;
`;

export const SearchSectionContent = styled.div`
  display: flex;
  width: 660px;
  margin: 33px auto 0;
`;

export const SearchFilterContainer = styled.div`

`;

export const SearchFilterButton = styled.button`
  flex: 0 0 auto;
  width: 50px;
  height: 50px;
  padding: 0;
  margin: 0 10px 0 0;
  border: 0;
  border-radius: 25px;
  background-color: ${whiteColor};
  cursor: pointer;
`;

export const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 600px;
  height: 50px;
  padding: 0 30px;
  border-radius: 25px;
  background-color: ${whiteColor};
`;

export const SearchInput = styled.input.attrs({
  placeholder: '궁금한 대학교를 검색해보세요!',
})`
  width: 490px;
  height: 20px;
  margin-right: 20px;
  padding: 15px 0;
  border: 0;
  font: normal bold 14px/20px ${defaultFont};
`;

export const SearchButton = styled.button`
  width: 20px;
  height: 20px;
  padding: 0;
  margin: 0;
  border: 0;
  background: ${whiteColor};
  cursor: pointer;
`;

interface FilterModalContainerProps {
  show: boolean;
}

export const FilterModalContainer = styled.div<FilterModalContainerProps>`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  position: absolute;
  top: 298px;
  left: 110px;
  width: 880px;
  height: 280px;
  padding: 20px 0;
  border-radius: 20px;
  background: ${whiteColor};
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  z-index: 2;
  cursor: default;
`;

export const FilterSection = styled.div`
  width: 180px;
  height: 100%;
  border-right: 1px solid ${mainBackgroundColor};
  box-sizing: border-box;
  
  :last-child {
    border: 0;
  }
`;
