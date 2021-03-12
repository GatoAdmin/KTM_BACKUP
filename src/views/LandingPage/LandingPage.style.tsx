import styled from 'styled-components';
import { mainColor } from '@util/style/color';

export const Content = styled.main`
  width: 100%;
  min-width: 1400px;
  overflow: hidden;
  
  span {
    color: ${mainColor};
  }
`;

export const FontProvider = styled.div<{lang: string}>`
`;
