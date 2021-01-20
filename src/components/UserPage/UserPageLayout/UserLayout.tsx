,import React from 'react';
import { ContentContainer, Layout } from '@components/UserPage/UserPageLayout/UserLayout.style';

interface UserLayoutProps {
  width: number;
  height: number;
}

const UserLayout: React.FC<UserLayoutProps> = ({ width, height, children }) => (
  <Layout>
    <ContentContainer width={width} height={height}>
      {children}
    </ContentContainer>
  </Layout>
);

export default UserLayout;
