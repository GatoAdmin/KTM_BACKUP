import usePromise from '@util/hooks/usePromise';
import React, { useState } from 'react';
import API from '@util/api';
import {
  Title,
  EmptyFlame,
} from '@components/MyPage';
import {
  MyUniversityListContainer,
} from './MyUniversityList.style';

interface MyUniversityListProps {
  t: (s:string) => string;
}

const MyUniversityList: React.FC<MyUniversityListProps> = () => {
  const [page, setPage] = useState(0);
  const getMyService = async () => {
    const service = await API.getMyUniversityList(page);
    return service;
  };

  const [loading, resolved, error] = usePromise(getMyService, []);

  if (loading) return <EmptyFlame />; // 나중에 스피너나 빈프레임 넣으면 좋을 것 같습니다 ㅎㅎ
  if (error) window.location.href = '/';
  if (!resolved) return null;

  console.log(resolved);

  return (
    <MyUniversityListContainer>
      <Title>나의 대학 리스트</Title>
    </MyUniversityListContainer>
  );
};

export default MyUniversityList;
