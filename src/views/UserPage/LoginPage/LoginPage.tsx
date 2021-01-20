,import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import UserLayout from '@components/UserPage/UserPageLayout/UserLayout';
import {
  LoginForm,
  Logo,
  LogoContainer,
  LoginInput,
  LoginInputGroup,
  LoginFieldset,
  LoginLegend,
  LoginAlert,
  LoginButton,
  LoginTextContainer,
  LoginHelpLink,
  RegisterThirdPartyButtonContainer,
  RegisterThirdPartyButton,
  ThirdPartyLogo,
  RegisterLink,
} from '@views/UserPage/LoginPage/LoginPage.style';

const LoginPage: NextPage = () => (
  <UserLayout width={704} height={742}>
    <LogoContainer>
      <Logo />
      katumm
    </LogoContainer>
    <LoginForm>
      <LoginFieldset>
        <LoginLegend>카툼 로그인</LoginLegend>
        <LoginInputGroup>
          <LoginInput placeholder="이메일" autoComplete="username" />
          {/* <LoginAlert>등록되지 않은 이메일입니다.</LoginAlert> */}
        </LoginInputGroup>
        <LoginInputGroup>
          <LoginInput placeholder="비밀번호" type="password" autoComplete="current-password" />
          {/* <LoginAlert>비밀번호가 올바르지 않습니다.</LoginAlert> */}
        </LoginInputGroup>
        <LoginButton type="submit">로그인</LoginButton>
      </LoginFieldset>
    </LoginForm>
    <LoginTextContainer>
      <Link href="/" passHref>
        <LoginHelpLink>비밀번호 찾기</LoginHelpLink>
      </Link>
    </LoginTextContainer>
    <RegisterThirdPartyButtonContainer>
      <RegisterThirdPartyButton>
        <ThirdPartyLogo src="/images/google.png" alt="구글로 로그인" />
        Google로 계속하기
      </RegisterThirdPartyButton>
      <RegisterThirdPartyButton>
        <ThirdPartyLogo src="/images/facebook_logo.png" alt="페이스북으로 로그인" />
        Facebook으로 계속하기
      </RegisterThirdPartyButton>
    </RegisterThirdPartyButtonContainer>
    <LoginTextContainer>아직 계정이 없으신가요?</LoginTextContainer>
    <Link href="/register" passHref>
      <RegisterLink>회원가입</RegisterLink>
    </Link>
  </UserLayout>
);

export default LoginPage;
