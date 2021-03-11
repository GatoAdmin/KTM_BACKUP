import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';

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
import API from '@util/api';
import useTranslate from '@util/hooks/useTranslate';
import { FontProvider } from '@views/LandingPage/LandingPage.style';
import i18nLoginResource from '../../../assets/i18n/loginPage.json';

const LoginPage: NextPage = ({
  router: {
    query: { lang: queryLang },
  },
}) => {
  const { t, lang, changeLang } = useTranslate(i18nLoginResource);
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

  const handleFormContent = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const prevFormData = { ...formData };
    const axiosFormData = new FormData();
    const appendFuntion = (key: string) => axiosFormData.append(key, prevFormData[key]);
    Object.keys(prevFormData).forEach(appendFuntion);

    const res = await API.login(axiosFormData);

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
      const {
        data: { sid },
      } = res;
      sessionStorage.setItem('sid', sid);
      Router.push('/');
    }
  };

  React.useEffect(() => {
    if (queryLang !== undefined) {
      changeLang(queryLang);
    }
  }, [queryLang]);

  React.useEffect(() => {
    if (loading) {
      const errObj = { ...errMsg };
      Object.entries(errObj).map(([key, val]) => (errObj[key] = false));
      setErrMsg(errObj);
    }
  }, [loading]);

  return (
    <FontProvider lang={lang}>
      <UserLayout width={704} height={742}>
        {loading && (
          <LoadingPopup>
            <Loading />
          </LoadingPopup>
        )}
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <LoginForm onSubmit={handleSubmit}>
          <LoginFieldset>
            <LoginLegend>카툼 로그인</LoginLegend>
            <LoginInputGroup>
              <LoginInput placeholder={t('email')} name="email" autoComplete="username" onChange={handleFormContent} />
              {errMsg.ERROR_NO_EMAIL && <LoginAlert>{t('warn-email-1')}</LoginAlert>}
              {errMsg.ERROR_NOT_EXIST_EMAIL && <LoginAlert>{t('warn-email-2')}</LoginAlert>}
            </LoginInputGroup>
            <LoginInputGroup>
              <LoginInput
                placeholder={t('password')}
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={handleFormContent}
              />
              {errMsg.ERROR_NO_PASSWORD && <LoginAlert>{t('warn-password-1')}</LoginAlert>}
              {errMsg.ERROR_INVALID_PASSWORD && <LoginAlert>{t('warn-password-2')}</LoginAlert>}
            </LoginInputGroup>
            <LoginButton type="submit">{t('login')}</LoginButton>
          </LoginFieldset>
        </LoginForm>
        <LoginTextContainer>
          <Link href="/" passHref>
            <LoginHelpLink>{t('find-password')}</LoginHelpLink>
          </Link>
        </LoginTextContainer>
        <RegisterThirdPartyButtonContainer>
          <RegisterThirdPartyButton>
            <ThirdPartyLogo src="/images/google.png" alt={t('login-by-google')} />
            {t('login-by-google')}
          </RegisterThirdPartyButton>
          <RegisterThirdPartyButton>
            <ThirdPartyLogo src="/images/facebook_logo.png" alt={t('login-by-facebook')} />
            {t('login-by-facebook')}
          </RegisterThirdPartyButton>
        </RegisterThirdPartyButtonContainer>
        <LoginTextContainer>{t('register-label')}</LoginTextContainer>
        <Link href={{ pathname: '/register', query: { lang } }} passHref>
          <RegisterLink>{t('register-button')}</RegisterLink>
        </Link>
      </UserLayout>
    </FontProvider>
  );
};

export default withRouter(LoginPage);
