import React from 'react';
import { Title } from '@components/MyPage';
import API from '@util/api';
import usePromise from '@util/hooks/usePromise';
import {
  MyInfomationContainer,
} from './MyInfomation.style';

interface MyInfomationProps {
  t: (s:string) => string;
}

const MyInfomation: React.FC<MyInfomationProps> = () => {
  const getMyService = async () => {
    const service = await API.getMyService();
    return service;
  };

  const [loading, resolved, error] = usePromise(getMyService, []);

  if (loading) return <> </>; // 나중에 스피너나 빈프레임 넣으면 좋을 것 같습니다 ㅎㅎ
  if (error) window.location.href = '/';
  if (!resolved) return null;

  return (
    <MyInfomationContainer>
      <Title> 개인정보 변경 </Title>
    </MyInfomationContainer>
  );
};

export default MyInfomation;
