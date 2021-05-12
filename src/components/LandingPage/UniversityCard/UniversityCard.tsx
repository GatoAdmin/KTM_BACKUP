/* eslint-disable camelcase */
import React from 'react';
import Button from '@components/Shared/Button/Button';
import { useRouter } from 'next/router';
import {
  UniversityCardContainer,
  Img,
  CardInfo,
  CardInfoTitle,
  CardInfoSubTitle,
  CardInfoLine,
  SmileIcon,
  CardInfoCommentWrap,
  CardInfoComment,
  CardInfoDetail,
  DetailTextWrap,
} from './UniversityCard.style';

interface UniversityCardProps {
  data: UniversityInfo;
  lang: string;
}

interface UniversityInfo {
  catch_phrase: string;
  eng_name: string;
  kor_name: string;
  photo: string;
  univ_code: string;
  vn_catch_phrase: string;
}

const UniversityCard: React.FC<UniversityCardProps> = ({ data, lang }) => {
  const detailKorText = data.catch_phrase.split(' <br> ').map((text) => <CardInfoDetail>{text}</CardInfoDetail>);
  const detailVnText = data.vn_catch_phrase.split(' <br> ').map((text) => <CardInfoDetail>{text}</CardInfoDetail>);
  const router = useRouter();

  return (
    <UniversityCardContainer>
      <Img alt="#" src={data.photo} />
      <CardInfo>
        <CardInfoTitle>{data.kor_name}</CardInfoTitle>
        <CardInfoSubTitle>{data.eng_name}</CardInfoSubTitle>
        <CardInfoLine />
        <CardInfoCommentWrap>
          <SmileIcon />
          <CardInfoComment> Comment </CardInfoComment>
        </CardInfoCommentWrap>
        <DetailTextWrap>{lang === 'ko' ? detailKorText : detailVnText}</DetailTextWrap>
        <Button onClick={() => router.replace(`/recommand/${data.univ_code}`)}>
          {lang === 'ko' ? '상세보기' : 'Xem chi tiết'}
        </Button>
      </CardInfo>
    </UniversityCardContainer>
  );
};

export default UniversityCard;
