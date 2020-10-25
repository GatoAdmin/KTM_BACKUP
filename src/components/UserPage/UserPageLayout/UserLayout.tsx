import * as React from "react";
import {
  ContentContainer,
  Layout
} from "@components/UserPage/UserPageLayout/UserLayout.style";

const UserLayout: React.FC = ({
  children
}) => {
  return (
    <Layout>
      <ContentContainer>
        { children }
      </ContentContainer>
    </Layout>
  )
}

export default UserLayout;
