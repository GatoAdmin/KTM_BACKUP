,import React from 'react';
import { NextPage } from 'next';
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

const countryArray = ['가나', '가봉', '가이아나', '감비아', '과테말라', '그레나다', '대한민국'];
const yearArray = Array.apply(null, Array(40)).map((value, index) => index + 1980);
const monthArray = Array.apply(null, Array(12)).map((value, index) => index + 1);
const dayArray = Array.apply(null, Array(31)).map((value, index) => index + 1);
const reasonArray = [
  '한국유학에 관심이 있거나 준비 중입니다.',
  '한국어학원에서 공부하며 대학교 입학을 준비 중입니다.',
  '한국의 대학교에서 공부하는 대학생입니다.',
  '일반인',
];

const RegisterPage: NextPage = () => (
  <UserLayout width={630} height={700}>
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
    <RegisterForm>
      <RegisterLegend>카툼 회원가입</RegisterLegend>
      <RegisterFieldset>
        <RegisterInputRow>
          <RegisterInputSmallGroup>
            <RegisterInput placeholder="성" />
            {/* <RegisterAlert>영문으로 기입해주세요.</RegisterAlert> */}
          </RegisterInputSmallGroup>
          <RegisterInputSmallGroup>
            <RegisterInput placeholder="이름" />
            {/* <RegisterAlert>영문으로 기입해주세요.</RegisterAlert> */}
          </RegisterInputSmallGroup>
        </RegisterInputRow>

        <RegisterInputRow>
          <RegisterInputSmallGroup>
            <RegisterInput placeholder="이메일" />
            {/* <RegisterAlert>형식이 맞지 않습니다.</RegisterAlert> */}
          </RegisterInputSmallGroup>
          @
          <RegisterInputSmallGroup>
            <RegisterInput />
          </RegisterInputSmallGroup>
        </RegisterInputRow>
        <RegisterInputRow>
          <RegisterInputGroup>
            <RegisterInput type="password" placeholder="비밀번호" autoComplete="new-password" />
            {/* <RegisterAlert>비밀번호는 최대 15자리이며, 숫자와 영문 조합이어야 합니다.</RegisterAlert> */}
          </RegisterInputGroup>
        </RegisterInputRow>
        <RegisterInputRow>
          <RegisterInputGroup>
            <RegisterInput type="password" placeholder="비밀번호 확인" autoComplete="new-password" />
            {/* <RegisterAlert>비밀번호가 일치하지 않습니다.</RegisterAlert> */}
          </RegisterInputGroup>
        </RegisterInputRow>
        <RegisterInputRow>
          <Select placeholder="국가 선택" options={countryArray} />
        </RegisterInputRow>

        <RegisterInputRow>
          <RegisterInputTitle>생년월일</RegisterInputTitle>

          <RegisterInputExtraSmallGroup>
            <Select placeholder="년도" options={yearArray} />
          </RegisterInputExtraSmallGroup>

          <RegisterInputExtraSmallGroup>
            <Select placeholder="월" options={monthArray} />
          </RegisterInputExtraSmallGroup>

          <RegisterInputExtraSmallGroup>
            <Select placeholder="일" options={dayArray} />
          </RegisterInputExtraSmallGroup>
        </RegisterInputRow>

        <RegisterInputRow>
          <RegisterInputTitle>유학 단계</RegisterInputTitle>

          <RegisterInputGroup>
            <Select placeholder="현재 준비 중이신 단계를 입력해주세요." options={reasonArray} />
          </RegisterInputGroup>
        </RegisterInputRow>
        <RegisterButton type="submit">메일로 인증하기</RegisterButton>
      </RegisterFieldset>
    </RegisterForm>
  </UserLayout>
);

export default RegisterPage;
