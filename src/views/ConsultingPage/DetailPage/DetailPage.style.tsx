import styled from 'styled-components';
import { mainColor } from '@util/style/color';

export const Introduction = styled.main`
  width: 100%;
  min-width: 1400px;
  overflow: hidden;
  margin: 116px 0 0 0;
`;

export const FontProvider = styled.div<{lang: string}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BoardContainer = styled.article`
  display: flex;
  justify-content: flex-start;
  width: 1000px;
  padding: 20px;
`;
