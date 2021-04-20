/* eslint-disable camelcase */
import React from 'react';
import {
  Title,
  EmptyFlame,
} from '@components/MyPage';
import API from '@util/api';
import usePromise from '@util/hooks/usePromise';
import {
  MyInfomationContainer,
  EmptyArea,
} from './MyInfomation.style';
import UserInfo from './UserInfo/UserInfo';
import ChangePasswordArea from './UserInfo/ChangePasswordArea';

interface MyInfomationProps {
  t: (s:string) => string;
}

const MyInfomation: React.FC<MyInfomationProps> = ({ t }) => {
  const getMyInfomation = async () => {
    const Infomation = await API.getMyInfomation();
    return Infomation;
  };

  const [loading, resolved, error] = usePromise(getMyInfomation, []);

  if (loading) return <EmptyFlame />; // 나중에 스피너나 빈프레임 넣으면 좋을 것 같습니다 ㅎㅎ
  if (error) window.location.href = '/';
  if (!resolved) return null;

  return (
    <MyInfomationContainer>
      <Title> 개인정보 변경 </Title>
      <UserInfo t={t} userInfo={resolved} />
      <EmptyArea />
      <Title> 비밀번호 변경 </Title>
      <ChangePasswordArea t={t} />
    </MyInfomationContainer>
  );
};

export default MyInfomation;
