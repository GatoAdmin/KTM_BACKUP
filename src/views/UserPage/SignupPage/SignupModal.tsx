import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';
import Router from 'next/router';

import { Button } from '@views/UserPage/TermPage/TermPage.style';

const SignupModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  backdrop-filter: blur(5px);
`;

const Content = styled.div`
  position: absolute;
  top: calc(50% - 180px);
  left: calc(50% - 305px);
  width: 500px;
  height: 408px;

  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #9e9e9e;

  padding: 35px 55px 0px 55px;
`;

export const Title = styled.span`
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  color: #000;
  margin-top: 40px;
  margin-bottom: 37px;
`;

export const NotifySentence = styled.div`
  width: 100%;
  margin-bottom: 114px;

  font-size: 16px;
  line-height: 22px;
  text-align: center;

  color: #7f8a98;
`;

export const ButtonArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Notify = (email) => (
  <>
    <span>인증 메일이 {email}로 전송되었습니다.</span>
    <br />
    <span>인증 메일을 열어 버튼을 클릭하면 가입이 완료됩니다.</span>
  </>
);

const SignupModal: NextPage = ({ isVisible, email = 'example@naver.com', setModalVisibleStatus }) => (
  <SignupModalWrapper isVisible={isVisible}>
    <Content>
      <Title>이메일 인증</Title>
      <NotifySentence>{Notify(email)}</NotifySentence>
      <ButtonArea>
        <Button value="돌아가기" status="activate" onClick={() => Router.push('/login')} />
      </ButtonArea>
    </Content>
  </SignupModalWrapper>
);

export default SignupModal;
