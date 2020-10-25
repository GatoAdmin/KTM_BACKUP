import * as React from "react";
import { NextPage } from "next";
import UserLayout from "@components/UserPage/UserPageLayout/UserLayout";
import {
  LoginForm,
  Logo,
  LogoContainer
} from "@views/UserPage/LoginPage/LoginPage.style";

const LoginPage: NextPage = () => {
  return (
    <UserLayout>
      <LogoContainer>
        <Logo />
        katumm
      </LogoContainer>
      <LoginForm>

      </LoginForm>
      
    </UserLayout>
  )
}

export default LoginPage;
