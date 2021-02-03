import React from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
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
import { Loading, LoadingPopup } from '../LoginPage/LoginPage.style';

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

const RegisterPage: NextPage = () => {
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
  };

  React.useEffect(() => {
    if (loading) {
      const errObj = { ...errMsg };
      Object.entries(errObj).map(([key, val]) => (errObj[key] = false));
      setErrMsg(errObj);
    }
  }, [loading]);

  return (
    <UserLayout width={630} height={800}>
      {loading && (
        <LoadingPopup>
          <Loading />
        </LoadingPopup>
      )}
      <RegisterTitle>회원가입</RegisterTitle>
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
      <RegisterForm onSubmit={handleSubmit}>
        <RegisterLegend>카툼 회원가입</RegisterLegend>
        <RegisterFieldset>
          <RegisterInputRow>
            <RegisterInputSmallGroup>
              <RegisterInput placeholder="성" name="last_name" onChange={handleFormContent} />
              {errMsg.ERROR_NOT_EXIST_LAST_NAME && <RegisterAlert>성을 입력해 주세요.</RegisterAlert>}
              {errMsg.ERROR_LAST_NAME_ONLY_ENGLISH && <RegisterAlert>성을 영어로 입력해 주세요.</RegisterAlert>}
            </RegisterInputSmallGroup>
            <RegisterInputSmallGroup>
              <RegisterInput placeholder="이름" name="first_name" onChange={handleFormContent} />
              {errMsg.ERROR_NOT_EXIST_FIRST_NAME && <RegisterAlert>이름을 입력해 주세요.</RegisterAlert>}
              {errMsg.ERROR_FIRST_NAME_ONLY_ENGLISH && <RegisterAlert>이름을 영어로 입력해 주세요.</RegisterAlert>}
            </RegisterInputSmallGroup>
          </RegisterInputRow>

          <RegisterInputRow>
            <RegisterInputGroup>
              <RegisterInput placeholder="닉네임" name="username" onChange={handleFormContent} />
              {errMsg.ERROR_NOT_EXIST_USERNAME && <RegisterAlert>닉네임을 입력해 주세요.</RegisterAlert>}
            </RegisterInputGroup>
          </RegisterInputRow>

          <RegisterInputRow>
            <RegisterInputGroup>
              <RegisterInput placeholder="이메일" name="email" onChange={handleFormContent} />
              {errMsg.ERROR_NOT_EXIST_EMAIL && <RegisterAlert>이메일을 입력해 주세요.</RegisterAlert>}
              {errMsg.ERROR_EXIST_EMAIL && <RegisterAlert>이미 존재하는 이메일입니다.</RegisterAlert>}
            </RegisterInputGroup>
          </RegisterInputRow>

          <RegisterInputRow>
            <RegisterInputGroup>
              <RegisterInput
                type="password"
                placeholder="비밀번호"
                autoComplete="new-password"
                name="password"
                onChange={handleFormContent}
              />
              {errMsg.ERROR_NOT_EXIST_PASSWORD && <RegisterAlert>비밀번호를 입력해 주세요.</RegisterAlert>}
              {errMsg.ERROR_NOT_PROPER_PASSWORD && (
                <RegisterAlert>비밀번호는 8~15자리이며, 숫자와 영문, 특수문자 조합이어야 합니다.</RegisterAlert>
              )}
            </RegisterInputGroup>
          </RegisterInputRow>
          <RegisterInputRow>
            <RegisterInputGroup>
              <RegisterInput
                type="password"
                placeholder="비밀번호 확인"
                autoComplete="new-password"
                name="confirm"
                onChange={handleFormContent}
              />
              {errMsg.ERROR_NOT_EXIST_PASSWORD_CONFIRM && <RegisterAlert>비밀번호 확인을 입력해 주세요.</RegisterAlert>}
              {errMsg.ERROR_PASSWORD_CONFIRM_FAIL && <RegisterAlert>비밀번호가 일치하지 않습니다.</RegisterAlert>}
            </RegisterInputGroup>
          </RegisterInputRow>
          <RegisterInputRow>
            <RegisterInputGroup>
              <Select
                placeholder="국가 선택"
                options={countryArray}
                name="nationality"
                handleFormContent={handleFormContent}
              />
              {errMsg.ERROR_NOT_EXIST_NATIONALITY && <RegisterAlert>국가를 선택해 주세요.</RegisterAlert>}
            </RegisterInputGroup>
          </RegisterInputRow>

          <RegisterInputRow>
            <RegisterInputTitle>생년월일</RegisterInputTitle>

            <RegisterInputExtraSmallGroup>
              <Select placeholder="년도" options={yearArray} name="year" handleFormContent={handleFormContent} />
            </RegisterInputExtraSmallGroup>

            <RegisterInputExtraSmallGroup>
              <Select placeholder="월" options={monthArray} name="month" handleFormContent={handleFormContent} />
            </RegisterInputExtraSmallGroup>

            <RegisterInputExtraSmallGroup>
              <Select placeholder="일" options={dayArray} name="day" handleFormContent={handleFormContent} />
            </RegisterInputExtraSmallGroup>

            {errMsg.ERROR_NOT_EXIST_BIRTH_DATE && <RegisterAlert>생년월일을 선택해 주세요.</RegisterAlert>}
          </RegisterInputRow>

          <RegisterInputRow>
            <RegisterInputTitle>유학 단계</RegisterInputTitle>

            <RegisterInputGroup>
              <Select
                placeholder="현재 준비 중이신 단계를 입력해주세요."
                options={reasonArray}
                name="identity"
                handleFormContent={handleFormContent}
              />
              {errMsg.ERROR_NOT_EXIST_IDENTITY && <RegisterAlert>유학 단계를 선택해 주세요.</RegisterAlert>}
            </RegisterInputGroup>
          </RegisterInputRow>

          <RegisterInputRow>
            <RegisterInputTitle>TOPIK</RegisterInputTitle>

            <RegisterInputGroup>
              <Select
                placeholder="현재 가지고 있는 TOPIK 등급을 선택해주세요."
                options={topikArray}
                name="topik_level"
                handleFormContent={handleFormContent}
              />
              {errMsg.ERROR_NOT_EXIST_TOPIK_LEVEL && <RegisterAlert>TOPIK 등급을 선택해 주세요.</RegisterAlert>}
            </RegisterInputGroup>
          </RegisterInputRow>

          <RegisterButton type="submit">메일로 인증하기</RegisterButton>
        </RegisterFieldset>
      </RegisterForm>
    </UserLayout>
  );
};

export default RegisterPage;
