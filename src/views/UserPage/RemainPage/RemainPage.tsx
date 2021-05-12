/* eslint-disable prefer-spread */
import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import useTranslate from '@util/hooks/useTranslate';
import UserLayout from '@components/UserPage/UserPageLayout/UserLayout';
import API from '@util/api';
import Select from '@components/UserPage/Select/Select';
import { FontProvider } from '@views/LandingPage/LandingPage.style';
import {
  RegisterTitle,
  RegisterForm,
  RegisterFieldset,
  RegisterInputGroup,
  RegisterAlert,
  RegisterInput,
  RegisterInputRow,
  RegisterInputSmallGroup,
  RegisterInputTitle,
  RegisterInputExtraSmallGroup,
} from '@views/UserPage/SignupPage/SignupPage.style';
import { Loading, LoadingPopup } from '../LoginPage/LoginPage.style';
import i18nSignupResource from '../../../assets/i18n/signupPage.json';
import { Button, ButtonSection } from '../TermPage/TermPage.style';

const yearArray = Array.apply(null, Array(40)).map((value, index) => index + 1980);
const monthArray = Array.apply(null, Array(12)).map((value, index) => index + 1);
const dayArray = Array.apply(null, Array(31)).map((value, index) => index + 1);
const countryArray = (t: (s: string) => string) =>
  Array.apply(null, Array(36)).map((val, index) => t(`country-${index}`));
const reasonArray = (t: (s: string) => string) => Array.apply(null, Array(4)).map((val, index) => t(`reason-${index}`));
const topikArray = (t: (s: string) => string) => Array.apply(null, Array(7)).map((val, index) => t(`topik-${index}`));

// export async function getServerSideProps(data) {
//   console.log(data);
// }

export async function getServerSideProps({ req, res, params }) {
  if (!req.headers.referer) {
    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end();
  }
  return { props: {} };
}

const checkValidation = (form) => {
  if (
    form.username !== '' &&
    form.first_name !== '' &&
    form.last_name !== '' &&
    form.nationality !== null &&
    form.year !== null &&
    form.month !== null &&
    form.day !== null &&
    form.topik_level !== null &&
    form.identity !== null
  )
    return true;
  else return false;
};

const RemainPage: NextPage = () => {
  const router = useRouter();
  const { t, lang } = useTranslate(i18nSignupResource);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [buttonStatus, setButtonStatus] = React.useState({
    cancel: 'activate',
    next: 'nonactivate',
  });
  const [formData, setFormData] = React.useState({
    username: '',
    first_name: '',
    last_name: '',
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

  const handleSubmit = async () => {
    if (buttonStatus.next === 'activate') {
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
      const { pid } = router.query;
      axiosFormData.append('email', pid);
      Object.keys(changedFormData) //
        .forEach((key) => axiosFormData.append(key, changedFormData[key]));

      try {
        const res = await API.postSignupRemain(axiosFormData);

        if (res.data.status !== 'success') {
          if (res.data.status === 'ERROR_EXIST_EMAIL') {
            alert(t('already-signup'));
            router.push('/login');
          } else alert('회원가입에 실패했습니다. 관리자에게 문의해주세요.');
          setErrMsg((prev) => ({ ...prev, [res.data.status]: true }));
        } else {
          alert(t('complete-signup'));
          router.push('/login');
        }
      } catch (error) {
        alert('회원가입에 실패했습니다. 관리자에게 문의해주세요.');
        throw new Error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  React.useEffect(() => {
    if (checkValidation(formData)) setButtonStatus((prev) => ({ ...prev, next: 'activate' }));
    else setButtonStatus((prev) => ({ ...prev, next: 'nonactivate' }));
  }, [formData]);

  return (
    <FontProvider lang={lang}>
      <UserLayout width={630} height={800}>
        {loading && (
          <LoadingPopup>
            <Loading />
          </LoadingPopup>
        )}
        <RegisterTitle>{t('sns-register')}</RegisterTitle>
        <RegisterForm as="div" style={{ marginBottom: '0px' }}>
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
          </RegisterFieldset>

          <ButtonSection style={{ marginTop: '30px' }}>
            <Button
              value={t('cancel')}
              style={{ marginRight: '17px' }}
              status={buttonStatus.cancel}
              // onClick={() => pushLoginScreen()}
            />
            <Button value={t('next')} status={buttonStatus.next} onClick={() => handleSubmit()} />
          </ButtonSection>
        </RegisterForm>
      </UserLayout>
    </FontProvider>
  );
};

export default RemainPage;
