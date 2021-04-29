import { fontColor, mainColor } from '@util/style/color';
import styled from 'styled-components';

export const MyUniversityListContainer = styled.div`
  padding: 50px;
  min-height: 500px;
`;

export const UnivItemArea = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 450px);
  grid-column-gap: 20px;
`;
