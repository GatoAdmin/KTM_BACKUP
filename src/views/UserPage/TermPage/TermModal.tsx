import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';

import { Button } from '@views/UserPage/TermPage/TermPage.style';

const TermModalWrapper = styled.div`
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
  top: calc(50% - 390px);
  left: calc(50% - 600px);
  width: 1100px;
  height: 740px;
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
`;

export const Textarea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 580px;

  margin-top: 19px;
  border-radius: 10px;
  border: 1px solid #9e9e9e;
  padding: 30px;
  overflow-y: scroll;
  resize: none;
`;

export const ButtonArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const TermType = {
  service: {
    title: '서비스 이용약관',
    content: ServiceTerm,
  },
  personal: {
    title: '개인정보수집 및 이용약관',
    content: PersonalTerm,
  },
};

const TermModal: NextPage = ({ type, isVisible, setTermVisibleStatus }) => (
  <TermModalWrapper isVisible={isVisible}>
    <Content>
      <Title>{TermType[type].title}</Title>
      <Textarea value={TermType[type].content} readOnly />
      <ButtonArea>
        <Button
          value="취소"
          status="activate"
          onClick={() => setTermVisibleStatus((prev) => ({ ...prev, [type]: false }))}
        />
      </ButtonArea>
    </Content>
  </TermModalWrapper>
);

export default TermModal;
