import React from 'react';
import styled from 'styled-components';
import { mainBackgroundColor, whiteColor } from '@util/style/color';

const LayoutBackground = styled.div`
  min-height: 100vh;
  background: ${mainBackgroundColor};
`;

const ContentContainer = styled.div`
  margin: 0 auto;
  /* width: 1100px; */
  min-width: 1100px;
  min-height: 100vh;
  background: ${whiteColor};
`;

const DefaultLayout: React.FC = ({ children }) => (
  <LayoutBackground>
    <ContentContainer>{children}</ContentContainer>
  </LayoutBackground>
);

export default DefaultLayout;
