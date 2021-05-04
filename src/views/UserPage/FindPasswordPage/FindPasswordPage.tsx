/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import Router from 'next/router';

import UserLayout from '@components/UserPage/UserPageLayout/UserLayout';
import { FontProvider } from '@views/LandingPage/LandingPage.style';
import useTranslate from '@util/hooks/useTranslate';

import API from '@util/api';
import {
  RegisterAlert, //
  RegisterInput,
  RegisterInputGroup,
  RegisterInputRow,
} from '../SignupPage/SignupPage.style';
import { Button } from '../TermPage/TermPage.style';
import i18nFindPasswordResource from '../../../assets/i18n/findpasswordPage.json';
import { Loading, LoadingPopup } from '../LoginPage/LoginPage.style';

const Content = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
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

const Notify = (lang: string) => (
  <>
    {lang === 'ko' && (
      <>
        <span>회원가입 하신 이메일 주소를 입력해주세요.</span>
        <br />
        <span>로그인에 필요한 임시 비밀번호를 전송해드립니다.</span>
      </>
    )}
    {lang === 'vn' && (
      <>
        <span>Vui lòng nhập địa chỉ email bạn đã đăng kí.</span>
        <br />
        <span>Chúng tôi sẽ gửi cho bạn mật khẩu tạm thời để đăng nhập.</span>
      </>
    )}
  </>
);

const MailSentNotify = (lang: string) => (
  <>
    {lang === 'ko' && (
      <>
        <span>입력하신 이메일 주소로 임시 비밀번호 전송을 완료했습니다.</span>
        <br />
        <span>받은 메일함을 확인해 주세요.</span>
      </>
    )}
    {lang === 'vn' && (
      <>
        <span>Mật khẩu tạm thời đã được gửi đến email của bạn.</span>
        <br />
        <span>Bạn vui lòng kiểm tra ở hộp thư đến.</span>
      </>
    )}
  </>
);

const FindPasswordPage: NextPage = () => {
  const { t, lang } = useTranslate(i18nFindPasswordResource);
  const [inputEmail, setInputEmail] = useState('');
  const [isEmailValidate, setIsEmailValidate] = useState(true);
  const [isAbleEmailSend, setIsAbleEmailSend] = useState('nonactivate');
  const [isMailSent, setIsMailSent] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  React.useEffect(() => {
    const emailValidator = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (inputEmail !== '' && !emailValidator.test(inputEmail)) {
      setIsEmailValidate(false);
      setIsAbleEmailSend('nonactivate');
    } else if (inputEmail !== '' && emailValidator.test(inputEmail)) {
      setIsEmailValidate(true);
      setIsAbleEmailSend('activate');
    }
  }, [inputEmail]);

  React.useEffect(() => {
    if (inputEmail === '') setIsAbleEmailSend('nonactivate');
  }, [inputEmail]);

  const sendEmail = async () => {
    if (isAbleEmailSend === 'activate') {
      setLoading(true);
      const formData = new FormData();

      formData.append('email', inputEmail);

      try {
        const response = await API.postSendEmailFindPassword(formData);
        if (response.data.status === 'success') setIsMailSent(true);
      } catch (err) {
        throw new Error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <FontProvider lang={lang}>
        <UserLayout width={704} height={742}>
          {loading && (
            <LoadingPopup>
              <Loading />
            </LoadingPopup>
          )}
          <Content>
            {!isMailSent && <Title>{t('title')}</Title>}
            {isMailSent && <Title>{t('complete-send')}</Title>}
            {!isMailSent && <NotifySentence>{Notify(lang)}</NotifySentence>}
            {isMailSent && <NotifySentence>{MailSentNotify(lang)}</NotifySentence>}
            {!isMailSent && (
              <RegisterInputRow style={{ marginBottom: '71px' }}>
                <RegisterInputGroup>
                  <RegisterInput
                    type="email"
                    placeholder={t('placeholder')}
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
                  <Button
                    value={t('cancel')} //
                    style={{ marginRight: '17px' }}
                    status="activate"
                  />
                  <Button
                    value={t('send')} //
                    status={isAbleEmailSend}
                    onClick={() => sendEmail()}
                  />{' '}
                </>
              )}
              {isMailSent && (
                <Button
                  value={t('back')} //
                  status="activate"
                  onClick={() => Router.push('/login')}
                />
              )}
            </ButtonWrapper>
          </Content>
        </UserLayout>
      </FontProvider>
    </>
  );
};

export default FindPasswordPage;
