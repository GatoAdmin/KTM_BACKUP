import styled from 'styled-components';
import CategorySVG from '@assets/svg/category_icon.svg';
import { fontColor } from '@util/style/color';
import { defaultFont } from '@util/style/font';

export const CategoryFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const CategoryIcon = styled(CategorySVG)`
  margin: 12px auto 0;
`;

export const CategoryFilterTitle = styled.h2`
  margin: 5px auto 0;
  font: normal bold 14px/19px ${defaultFont};
  color: ${fontColor};
  text-align: center;
`;

export const CategoryCheckboxContainer = styled.div`
  width: 130px;
  margin: 34px auto 0;
`;

export const CategoryCheckbox = styled.div`
  margin-bottom: 14px;
`;
