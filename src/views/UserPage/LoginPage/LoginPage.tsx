import React from 'react';
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
  LoadingPopup,
  Loading,
} from '@views/UserPage/LoginPage/LoginPage.style';
import axios from 'axios';

const checkLoginValid = (
  e: React.FormEvent<HTMLFormElement>,
  email: string,
  pw: string,
  _setWarnLogin: React.Dispatch<React.SetStateAction<boolean>>,
  _setWarnPw: React.Dispatch<React.SetStateAction<boolean>>,
  _setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', pw);
  _setWarnPw(false);
  _setWarnLogin(false);
  _setLoading(true);

  axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/api/login/',
    // url: `${process.env.API_PATH}api/login/`,
    data: formData,
  })
    .then((res) => {
      const { status } = res.data;
      if (status === 'ERROR_INVALID_PASSWORD') {
        _setWarnPw(true);
      } else if (status === 'ERROR_NOT_EXIST_EMAIL') {
        _setWarnLogin(true);
      } else if (status == 'success') {
        console.log(res);
        console.log('nice');
      }
      _setLoading(false);
    })
    .catch((err) => console.log(err));
};

const LoginPage: NextPage = () => {
  const [email, setEmail] = React.useState<string>('');
  const [pw, setPw] = React.useState<string>('');
  const [warnLogin, setWarnLogin] = React.useState<boolean>(false);
  const [warnPw, setWarnPw] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <UserLayout width={704} height={742}>
      {loading && (
        <LoadingPopup>
          <Loading />
        </LoadingPopup>
      )}
      <LogoContainer>
        <Logo />
        katumm
      </LogoContainer>
      <LoginForm onSubmit={(e) => checkLoginValid(e, email, pw, setWarnLogin, setWarnPw, setLoading)}>
        <LoginFieldset>
          <LoginLegend>카툼 로그인</LoginLegend>
          <LoginInputGroup>
            <LoginInput placeholder="이메일" autoComplete="username" onChange={(e) => setEmail(e.target.value)} />
            {warnLogin && <LoginAlert>등록되지 않은 이메일입니다.</LoginAlert>}
          </LoginInputGroup>
          <LoginInputGroup>
            <LoginInput
              placeholder="비밀번호"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setPw(e.target.value)}
            />
            {warnPw && <LoginAlert>비밀번호가 올바르지 않습니다.</LoginAlert>}
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
};

export default LoginPage;
