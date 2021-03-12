/* eslint-disable camelcase */
import React from 'react';
import Button from '@components/Shared/Button/Button';
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
}

interface UniversityInfo {
  catch_phrase: string;
  eng_name: string;
  kor_name: string;
  photo: string;
  univ_code: string;
  vn_catch_phrase: string;
}

const UniversityCard: React.FC<UniversityCardProps> = ({ data }) => {
  const detailText = data.catch_phrase.split(' <br> ').map((text) => <CardInfoDetail>{text}</CardInfoDetail>);
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
        <DetailTextWrap>
          {detailText}
        </DetailTextWrap>
        <Button onClick={() => console.log('hi')}> 상세보기 </Button>
      </CardInfo>
    </UniversityCardContainer>
  );
};

export default UniversityCard;
