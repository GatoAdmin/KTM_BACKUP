import { mainColor } from '@util/style/color';
import styled from 'styled-components';

export const UniversitySectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 50px;
`;

export const UniversityCardContainer = styled.div`
  display: grid;
  grid-template-columns: 490px 490px;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`;

export const Title = styled.p`
  font-family: Noto Sans KR;
  font-weight: bold;
  font-size: 32px;
  line-height: 46px;

  margin: 50px 0;
  text-align: center;
  font-color: ${mainColor}
`;
