import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Router from 'next/router';
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

const LoginPage: NextPage = () => {
  const [formData, setFormData] = React.useState({
    email: null,
    password: null,
  });
  const [errMsg, setErrMsg] = React.useState({
    ERROR_NO_EMAIL: false,
    ERROR_NO_PASSWORD: false,
    ERROR_NOT_EXIST_EMAIL: false,
    ERROR_INVALID_PASSWORD: false,
  });
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleFormContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const prevFormData = { ...formData };
    const axiosFormData = new FormData();
    Object.keys(prevFormData).forEach((key: string) => axiosFormData.append(key, prevFormData[key]));

    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/login/',
      data: axiosFormData,
    }).then((res) => {
      const { status } = res.data;
      if (status !== 'success') {
        if (status === 'ERROR_NOT_YET_EMAIL_CONFIRM') {
          alert('이메일 인증을 완료해 주세요.');
        } else {
          setErrMsg((prev) => ({ ...prev, [status]: true }));
        }
        setLoading(false);
      } else {
        setLoading(false);
        Router.push('/');
      }
    });
  };

  React.useEffect(() => {
    if (loading) {
      const errObj = { ...errMsg };
      Object.entries(errObj).map(([key, val]) => (errObj[key] = false));
      setErrMsg(errObj);
    }
  }, [loading]);

  return (
    <UserLayout width={704} height={742}>
      {loading && (
        <LoadingPopup>
          <Loading />
        </LoadingPopup>
      )}
      <LogoContainer>
        <Logo />
        {/* katumm */}
      </LogoContainer>
      <LoginForm onSubmit={handleSubmit}>
        <LoginFieldset>
          <LoginLegend>카툼 로그인</LoginLegend>
          <LoginInputGroup>
            <LoginInput placeholder="이메일" name="email" autoComplete="username" onChange={handleFormContent} />
            {errMsg.ERROR_NO_EMAIL && <LoginAlert>이메일을 입력해 주세요.</LoginAlert>}
            {errMsg.ERROR_NOT_EXIST_EMAIL && <LoginAlert>등록되지 않은 이메일입니다.</LoginAlert>}
          </LoginInputGroup>
          <LoginInputGroup>
            <LoginInput
              placeholder="비밀번호"
              name="password"
              type="password"
              autoComplete="current-password"
              onChange={handleFormContent}
            />
            {errMsg.ERROR_NO_PASSWORD && <LoginAlert>비밀번호를 입력해 주세요.</LoginAlert>}
            {errMsg.ERROR_INVALID_PASSWORD && <LoginAlert>비밀번호가 올바르지 않습니다.</LoginAlert>}
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
