import React from 'react';
import { NextPage } from 'next';
import Router, { withRouter } from 'next/router';
import UserLayout from '@components/UserPage/UserPageLayout/UserLayout';
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
} from '@views/UserPage/RegisterPage/RegisterPage.style';
import Select from '@components/UserPage/Select/Select';
import axios from 'axios';
import useTranslate from '@util/hooks/useTranslate';
import { Loading, LoadingPopup } from '../LoginPage/LoginPage.style';
import i18nLoginResource from '../../../assets/i18n/registerPage.json';

const countryArray = [
  '베트남',
  '대한민국',
  '미국',
  '일본',
  '아르헨티나',
  '호주',
  '벨기에',
  '캐나다',
  '캄보디아',
  '중국',
  '체코',
  '이집트',
  '프랑스',
  '독일',
  '그리스',
  '홍콩',
  '헝가리',
  '인도',
  '인도네시아',
  '이란',
  '이라크',
  '이탈리아',
  '네덜란드',
  '멕시코',
  '뉴질랜드',
  '노르웨이',
  '페루',
  '필리핀',
  '포르투갈',
  '폴란드',
  '싱가포르',
  '스페인',
  '스웨덴',
  '대만',
  '터키',
  '영국',
];
const yearArray = Array.apply(null, Array(40)).map((value, index) => index + 1980);
const monthArray = Array.apply(null, Array(12)).map((value, index) => index + 1);
const dayArray = Array.apply(null, Array(31)).map((value, index) => index + 1);
const reasonArray = [
  '한국유학에 관심이 있거나 준비 중입니다.',
  '한국어학원에서 공부하며 대학교 입학을 준비 중입니다.',
  '한국의 대학교에서 공부하는 대학생입니다.',
  '일반인',
];
const topikArray = ['없음', '1급', '2급', '3급', '4급', '5급', '6급'];

const RegisterPage: NextPage = ({
  router: {
    query: { lang: queryLang },
  },
}) => {
  const { t, lang, changeLang } = useTranslate(i18nLoginResource);
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
  });
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/signup/',
      // url: `${process.env.API_PATH}api/login/`,
      data: axiosFormData,
    })
      .then((res) => {
        const {
          data: { status },
        } = res;
        console.log(status);
        if (status !== 'success') {
          setErrMsg((prev) => ({ ...prev, [status]: true }));
        } else {
          alert('이메일 인증을 완료해주세요.');
          setLoading(false);
          Router.push('/login');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFormContent = (e?: React.ChangeEvent<HTMLInputElement>, t?: string, v?: string | number) => {
    if (e !== undefined) {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    } else if (t !== undefined) {
      setFormData((prev) => ({ ...prev, [t]: v }));
    }
    console.log(formData);
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

  React.useEffect(() => {
    console.log({ ...formData });
  }, [formData]);

  return (
    <UserLayout width={630} height={800}>
      {loading && (
        <LoadingPopup>
          <Loading />
        </LoadingPopup>
      )}
      <RegisterTitle>{t('register')}</RegisterTitle>
      <RegisterThirdPartyButtonContainer>
        <RegisterThirdPartyButton>
          <ThirdPartyLogo src="/images/google.png" alt={t('register-by-google')} />
          {t('register-by-google')}
        </RegisterThirdPartyButton>
        <RegisterThirdPartyButton>
          <ThirdPartyLogo src="/images/facebook_logo.png" alt={t('register-by-facebook')} />
          {t('register-by-facebook')}
        </RegisterThirdPartyButton>
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
                options={countryArray}
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
                lang={lang}
                placeholder={t('choice-identity-label')}
                options={reasonArray}
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
                options={topikArray}
                name="topik_level"
                handleFormContent={handleFormContent}
              />
              {errMsg.ERROR_NOT_EXIST_TOPIK_LEVEL && <RegisterAlert>{t('warn-15')}</RegisterAlert>}
            </RegisterInputGroup>
          </RegisterInputRow>

          <RegisterButton type="submit">{t('register-button')}</RegisterButton>
        </RegisterFieldset>
      </RegisterForm>
    </UserLayout>
  );
};

export default withRouter(RegisterPage);
