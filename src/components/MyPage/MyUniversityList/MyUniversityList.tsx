import usePromise from '@util/hooks/usePromise';
import React, { useState } from 'react';
import API from '@util/api';
import {
  Title,
  EmptyFlame,
  UnivItem,
  EmptyUnivItem,
} from '@components/MyPage';
import {
  MyUniversityListContainer,
  UnivItemArea,
} from './MyUniversityList.style';

interface MyUniversityListProps {
  t: (s:string) => string;
  lang: string;
}

const MyUniversityList: React.FC<MyUniversityListProps> = ({ t, lang }) => {
  const [page, setPage] = useState(0);
  const getMyService = async () => {
    const service = await API.getMyUniversityList(page);
    return service;
  };

  const [loading, resolved, error] = usePromise(getMyService, []);

  if (loading) return <EmptyFlame />; // 나중에 스피너나 빈프레임 넣으면 좋을 것 같습니다 ㅎㅎ
  if (error) window.location.href = '/';
  if (!resolved) return null;

  const makeUnivItems = resolved[0].map((univInfo: any, idx: number) => (
    <UnivItem
      id={univInfo.univ_code}
      name={univInfo.kor_name}
      nameEng={univInfo.eng_name}
      category={univInfo.category}
      city={univInfo.kor_short_address}
      tuition={univInfo.tuition}
      topik={univInfo.topik}
      thumbnail={univInfo.photos[1].file}
      hasOwnExam
      t={t}
      lang={lang}
    />
  ));

  return (
    <MyUniversityListContainer>
      <Title>{t('tab_university_list')}</Title>
      <UnivItemArea>
        {resolved[0].length !== 0
          ? makeUnivItems
          : <EmptyUnivItem t={t} />}
      </UnivItemArea>
    </MyUniversityListContainer>
  );
};

export default MyUniversityList;
