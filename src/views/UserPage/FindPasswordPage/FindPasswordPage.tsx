/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import Router from 'next/router';

import UserLayout from '@components/UserPage/UserPageLayout/UserLayout';
import { FontProvider } from '@views/LandingPage/LandingPage.style';
import useTranslate from '@util/hooks/useTranslate';

import i18nLoginResource from '../../../assets/i18n/registerPage.json';
import { fontColor, greyColor, mainColor } from '@util/style/color';
import { defaultFont } from '@util/style/font';
import { RegisterAlert, RegisterInput, RegisterInputGroup, RegisterInputRow } from '../SignupPage/SignupPage.style';
import { Button } from '../TermPage/TermPage.style';

const Content = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  /* height: 500px; */
  padding: 40px 120px 70px;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  color: #000;
  margin-top: 40px;
  margin-bottom: 37px;
`;

const NotifySentence = styled.div`
  width: 100%;
  margin-bottom: 39px;

  font-size: 16px;
  line-height: 22px;
  text-align: center;

  color: #7f8a98;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Notify = () => (
  <>
    <span>회원가입 하신 이메일 주소를 입력해주세요.</span>
    <br />
    <span>로그인에 필요한 임시 비밀번호를 전송해드립니다.</span>
  </>
);

const MailSentNotify = () => (
  <>
    <span>입력하신 이메일 주소로 임시 비밀번호 전송을 완료했습니다.</span>
    <br />
    <span>받은 메일함을 확인해 주세요.</span>
  </>
);

const FindPasswordPage: NextPage = () => {
  const { t, lang } = useTranslate(i18nLoginResource);
  const [inputEmail, setInputEmail] = useState('');
  const [isEmailValidate, setIsEmailValidate] = useState(true);
  const [isAbleEmailSend, setIsAbleEmailSend] = useState('nonactivate');
  const [isMailSent, setIsMailSent] = useState(false);

  const emailValidator = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  React.useEffect(() => {
    if (inputEmail !== '' && !emailValidator.test(inputEmail)) {
      setIsEmailValidate(false);
      setIsAbleEmailSend('nonactivate');
    } else if (inputEmail !== '' && emailValidator.test(inputEmail)) {
      setIsEmailValidate(true);
      setIsAbleEmailSend('activate');
    }
  }, [inputEmail, emailValidator]);

  React.useEffect(() => {
    if (inputEmail === '') setIsAbleEmailSend('nonactivate');
  }, [inputEmail]);

  return (
    <>
      <FontProvider lang={lang}>
        <UserLayout width={704} height={742}>
          <Content>
            {!isMailSent && <Title>비밀번호 찾기</Title>}
            {isMailSent && <Title>메일 전송 완료!</Title>}
            {!isMailSent && <NotifySentence>{Notify()}</NotifySentence>}
            {isMailSent && <NotifySentence>{MailSentNotify()}</NotifySentence>}
            {!isMailSent && (
              <RegisterInputRow style={{ marginBottom: '71px' }}>
                <RegisterInputGroup>
                  <RegisterInput
                    type="email"
                    placeholder="회원가입 하신 이메일 주소를 입력하세요."
                    name="email"
                    onChange={(e) => setInputEmail(e.target.value)}
                    value={inputEmail}
                  />
                  {!isEmailValidate && <RegisterAlert>{t('warn-16')}</RegisterAlert>}
                </RegisterInputGroup>
              </RegisterInputRow>
            )}
            <ButtonWrapper>
              {!isMailSent && (
                <>
                  <Button value="취소" style={{ marginRight: '17px' }} status="activate" />
                  <Button value="메일 전송" status={isAbleEmailSend} />{' '}
                </>
              )}
              {isMailSent && <Button value="돌아가기" status="activate" onClick={() => Router.push('/')} />}
            </ButtonWrapper>
          </Content>
        </UserLayout>
      </FontProvider>
    </>
  );
};

export default FindPasswordPage;
