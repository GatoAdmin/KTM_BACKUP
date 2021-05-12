/* eslint-disable prefer-spread */
import React from 'react';
import { NextPage } from 'next';
import { useRouter, withRouter } from 'next/router';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import UserLayout from '@components/UserPage/UserPageLayout/UserLayout';
import Select from '@components/UserPage/Select/Select';
import {
  RegisterTitle,
  RegisterForm,
  RegisterThirdPartyButtonContainer,
  RegisterThirdPartyButton,
  ThirdPartyLogo,
  RegisterLegend,
  RegisterFieldset,
  RegisterInputGroup,
  RegisterAlert,
  RegisterInput,
  RegisterInputRow,
  RegisterInputSmallGroup,
  RegisterButton,
  RegisterInputTitle,
  RegisterInputExtraSmallGroup,
} from '@views/UserPage/SignupPage/SignupPage.style';
import { FontProvider } from '@views/LandingPage/LandingPage.style';
import useTranslate from '@util/hooks/useTranslate';
import API from '@util/api';

import { Loading, LoadingPopup } from '../LoginPage/LoginPage.style';
import i18nSignupResource from '../../../assets/i18n/signupPage.json';
import SignupModal from './SignupModal';

export async function getServerSideProps({ req, res, params }) {
  if (!req.headers.referer) {
    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end();
  }
  return { props: {} };
}

const yearArray = Array.apply(null, Array(40)).map((value, index) => index + 1980);
const monthArray = Array.apply(null, Array(12)).map((value, index) => index + 1);
const dayArray = Array.apply(null, Array(31)).map((value, index) => index + 1);
const countryArray = (t: (s: string) => string) =>
  Array.apply(null, Array(36)).map((val, index) => t(`country-${index}`));
const reasonArray = (t: (s: string) => string) => Array.apply(null, Array(4)).map((val, index) => t(`reason-${index}`));
const topikArray = (t: (s: string) => string) => Array.apply(null, Array(7)).map((val, index) => t(`topik-${index}`));

const RegisterPage: NextPage = () => {
  const { t, lang } = useTranslate(i18nSignupResource);
  const Router = useRouter();
  const [isSignupModalVisible, setIsSignupModalVisible] = React.useState(false);
  const [formData, setFormData] = React.useState({
    username: null,
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    confirm: null,
    nationality: null,
    year: null,
    month: null,
    day: null,
    topik_level: null,
    identity: null,
  });
  const [errMsg, setErrMsg] = React.useState({
    ERROR_NOT_EXIST_USERNAME: false,
    ERROR_NOT_EXIST_LAST_NAME: false,
    ERROR_LAST_NAME_ONLY_ENGLISH: false,
    ERROR_NOT_EXIST_FIRST_NAME: false,
    ERROR_FIRST_NAME_ONLY_ENGLISH: false,
    ERROR_NOT_EXIST_EMAIL: false,
    ERROR_EXIST_EMAIL: false,
    ERROR_NOT_EXIST_PASSWORD: false,
    ERROR_NOT_EXIST_PASSWORD_CONFIRM: false,
    ERROR_NOT_EXIST_NATIONALITY: false,
    ERROR_NOT_EXIST_BIRTH_DATE: false,
    ERROR_NOT_EXIST_TOPIK_LEVEL: false,
    ERROR_NOT_EXIST_IDENTITY: false,
    ERROR_NOT_PROPER_PASSWORD: false,
    ERROR_PASSWORD_CONFIRM_FAIL: false,
    ERROR_NOT_VALID_EMAIL: false,
  });
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const changedFormData = JSON.parse(JSON.stringify(formData));
    if (formData.year !== null && formData.month !== null && formData.day !== null) {
      changedFormData.birth_date = `${formData.year}-${formData.month}-${formData.day}`;
    } else {
      changedFormData.birth_date = null;
    }

    delete changedFormData.year;
    delete changedFormData.month;
    delete changedFormData.day;

    const axiosFormData = new FormData();
    Object.keys(changedFormData).forEach((key) => axiosFormData.append(key, changedFormData[key]));
    axiosFormData.append('lang', lang);

    try {
      const res = await API.postSignup(axiosFormData);

      if (res.data.status !== 'success') {
        setErrMsg((prev) => ({ ...prev, [res.data.status]: true }));
      } else {
        setLoading(false);
        setIsSignupModalVisible(true);
      }
    } catch (err) {
      alert(t('signup-undefined-error'));
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormContent = (
    e?: React.ChangeEvent<HTMLInputElement>, //
    t?: string,
    v?: string | number,
  ) => {
    if (e !== undefined) {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    } else if (t !== undefined) {
      setFormData((prev) => ({ ...prev, [t]: v }));
    }
  };

  // React.useEffect(() => {
  //   if (queryLang !== undefined) {
  //     changeLang(queryLang);
  //   }
  // }, [queryLang]);

  React.useEffect(() => {
    if (loading) {
      const errObj = { ...errMsg };
      Object.entries(errObj).forEach(([key]) => {
        errObj[key] = false;
      });
      setErrMsg(errObj);
    }
  }, [loading, errMsg]);

  const pushSignupRemainScreen = (pid) => {
    if (pid !== undefined) Router.push(`/signup/remain/${pid}`);
  };

  return (
    <FontProvider lang={lang}>
      <UserLayout width={630} height={800}>
        {loading && (
          <LoadingPopup>
            <Loading />
          </LoadingPopup>
        )}
        <RegisterTitle>{t('register')}</RegisterTitle>
        <RegisterThirdPartyButtonContainer>
          <GoogleLogin
            clientId="841751381743-4ed7ekbs06i4n4n2l1iugia41jtlv42i.apps.googleusercontent.com"
            render={(renderProps) => (
              <RegisterThirdPartyButton
                onClick={renderProps.onClick} //
                disabled={renderProps.disabled}
              >
                <ThirdPartyLogo src="/images/google.png" alt={t('register-by-google')} />
                {t('register-by-google')}
              </RegisterThirdPartyButton>
            )}
            onSuccess={({ googleId }) => pushSignupRemainScreen(googleId)}
            onFailure={(err) => console.log(err)}
            cookiePolicy={'single_host_origin'}
          />

          <FacebookLogin
            appId="1190082198106418"
            autoLoad={false}
            callback={({ id }) => pushSignupRemainScreen(id)}
            render={(renderProps) => (
              <RegisterThirdPartyButton onClick={renderProps.onClick}>
                <ThirdPartyLogo src="/images/facebook_logo.png" alt={t('register-by-facebook')} />
                {t('register-by-facebook')}
              </RegisterThirdPartyButton>
            )}
          />
        </RegisterThirdPartyButtonContainer>
        <RegisterForm onSubmit={handleSubmit}>
          <RegisterLegend>{t('register-legend')}</RegisterLegend>
          <RegisterFieldset>
            <RegisterInputRow>
              <RegisterInputSmallGroup>
                <RegisterInput placeholder={t('last-name')} name="last_name" onChange={handleFormContent} />
                {errMsg.ERROR_NOT_EXIST_LAST_NAME && <RegisterAlert>{t('warn-1')}</RegisterAlert>}
                {errMsg.ERROR_LAST_NAME_ONLY_ENGLISH && <RegisterAlert>{t('warn-2')}</RegisterAlert>}
              </RegisterInputSmallGroup>
              <RegisterInputSmallGroup>
                <RegisterInput placeholder={t('first-name')} name="first_name" onChange={handleFormContent} />
                {errMsg.ERROR_NOT_EXIST_FIRST_NAME && <RegisterAlert>{t('warn-3')}</RegisterAlert>}
                {errMsg.ERROR_FIRST_NAME_ONLY_ENGLISH && <RegisterAlert>{t('warn-4')}</RegisterAlert>}
              </RegisterInputSmallGroup>
            </RegisterInputRow>

            <RegisterInputRow>
              <RegisterInputGroup>
                <RegisterInput placeholder={t('username')} name="username" onChange={handleFormContent} />
                {errMsg.ERROR_NOT_EXIST_USERNAME && <RegisterAlert>{t('warn-5')}</RegisterAlert>}
              </RegisterInputGroup>
            </RegisterInputRow>

            <RegisterInputRow>
              <RegisterInputGroup>
                <RegisterInput placeholder={t('email')} name="email" onChange={handleFormContent} />
                {errMsg.ERROR_NOT_EXIST_EMAIL && <RegisterAlert>{t('warn-6')}</RegisterAlert>}
                {errMsg.ERROR_EXIST_EMAIL && <RegisterAlert>{t('warn-7')}</RegisterAlert>}
                {errMsg.ERROR_NOT_VALID_EMAIL && <RegisterAlert>{t('warn-16')}</RegisterAlert>}
              </RegisterInputGroup>
            </RegisterInputRow>

            <RegisterInputRow>
              <RegisterInputGroup>
                <RegisterInput
                  type="password"
                  placeholder={t('password')}
                  autoComplete="new-password"
                  name="password"
                  onChange={handleFormContent}
                />
                {errMsg.ERROR_NOT_EXIST_PASSWORD && <RegisterAlert>{t('warn-8')}</RegisterAlert>}
                {errMsg.ERROR_NOT_PROPER_PASSWORD && <RegisterAlert>{t('warn-9')}</RegisterAlert>}
              </RegisterInputGroup>
            </RegisterInputRow>
            <RegisterInputRow>
              <RegisterInputGroup>
                <RegisterInput
                  type="password"
                  placeholder={t('confirm')}
                  autoComplete="new-password"
                  name="confirm"
                  onChange={handleFormContent}
                />
                {errMsg.ERROR_NOT_EXIST_PASSWORD_CONFIRM && <RegisterAlert>{t('warn-10')}</RegisterAlert>}
                {errMsg.ERROR_PASSWORD_CONFIRM_FAIL && <RegisterAlert>{t('warn-11')}</RegisterAlert>}
              </RegisterInputGroup>
            </RegisterInputRow>
            <RegisterInputRow>
              <RegisterInputGroup>
                <Select
                  placeholder={t('choice-nation')}
                  options={countryArray(t)}
                  name="nationality"
                  handleFormContent={handleFormContent}
                />
                {errMsg.ERROR_NOT_EXIST_NATIONALITY && <RegisterAlert>{t('warn-12')}</RegisterAlert>}
              </RegisterInputGroup>
            </RegisterInputRow>

            <RegisterInputRow>
              <RegisterInputTitle>{t('choice-birth-date')}</RegisterInputTitle>

              <RegisterInputExtraSmallGroup>
                <Select
                  placeholder={t('choice-year')}
                  options={yearArray}
                  name="year"
                  handleFormContent={handleFormContent}
                />
              </RegisterInputExtraSmallGroup>

              <RegisterInputExtraSmallGroup>
                <Select
                  placeholder={t('choice-month')}
                  options={monthArray}
                  name="month"
                  handleFormContent={handleFormContent}
                />
              </RegisterInputExtraSmallGroup>

              <RegisterInputExtraSmallGroup>
                <Select
                  placeholder={t('choice-day')}
                  options={dayArray}
                  name="day"
                  handleFormContent={handleFormContent}
                />
              </RegisterInputExtraSmallGroup>

              {errMsg.ERROR_NOT_EXIST_BIRTH_DATE && <RegisterAlert>{t('warn-13')}</RegisterAlert>}
            </RegisterInputRow>

            <RegisterInputRow>
              <RegisterInputTitle>{t('choice-identity')}</RegisterInputTitle>

              <RegisterInputGroup>
                <Select
                  placeholder={t('choice-identity-label')}
                  options={reasonArray(t)}
                  name="identity"
                  handleFormContent={handleFormContent}
                />
                {errMsg.ERROR_NOT_EXIST_IDENTITY && <RegisterAlert>{t('warn-14')}</RegisterAlert>}
              </RegisterInputGroup>
            </RegisterInputRow>

            <RegisterInputRow>
              <RegisterInputTitle>TOPIK</RegisterInputTitle>

              <RegisterInputGroup>
                <Select
                  placeholder={t('choice-topik-level')}
                  options={topikArray(t)}
                  name="topik_level"
                  handleFormContent={handleFormContent}
                />
                {errMsg.ERROR_NOT_EXIST_TOPIK_LEVEL && <RegisterAlert>{t('warn-15')}</RegisterAlert>}
              </RegisterInputGroup>
            </RegisterInputRow>

            <RegisterButton type="submit">{t('register-button')}</RegisterButton>
          </RegisterFieldset>
          <SignupModal
            isVisible={isSignupModalVisible} //
            email={formData.email}
            lang={lang}
          />
        </RegisterForm>
      </UserLayout>
    </FontProvider>
  );
};

export default withRouter(RegisterPage);
