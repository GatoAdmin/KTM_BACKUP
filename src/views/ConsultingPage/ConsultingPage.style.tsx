import styled from 'styled-components';
import { mainColor } from '@util/style/color';

export const Content = styled.main`
  width: 100%;
  min-width: 1400px;
  overflow: hidden;
  margin: 116px 0 0 0;

  span {
    color: ${mainColor};
  }
`;

export const FontProvider = styled.div<{lang: string}>`
  display: flex;
  justify-content: center;
`;
