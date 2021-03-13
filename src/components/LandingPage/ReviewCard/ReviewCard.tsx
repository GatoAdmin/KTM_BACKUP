/* eslint-disable camelcase */
import React from 'react';
import {
  ReviewCardContainer,
  NameText,
  DetailText,
  ReviewDetailBox,
  UniversityBox,
  PaddingBox,
  UniverSityImg,
  UniversityFlexBox,
  UniversityDetailBox,
  UniversityNameText,
  UniversityEnglishNameText,
} from './ReviewCard.style';

interface ReviewCardProps {
  data: ReviewInfo;
  lang: string;
}

interface ReviewInfo {
  eng_name: string,
  kor_name: string,
  logo: string,
  review: string,
  reviewer: string,
  univ_code: string,
  vn_review: string,
}

const ReviewCard: React.FC<ReviewCardProps> = ({ data, lang }) => {
  const detailKorTexts = data.review.split(' <br> ').map((text) => (
    <DetailText>{text}</DetailText>
  ));
  const detailVnTexts = data.vn_review.split(' <br> ').map((text) => (
    <DetailText>{text}</DetailText>
  ));

  return (
    <ReviewCardContainer>
      <ReviewDetailBox>
        <PaddingBox>
          <NameText>{data.reviewer}</NameText>
          {lang === 'ko' ? detailKorTexts : detailVnTexts}
        </PaddingBox>
      </ReviewDetailBox>
      <UniversityBox>
        <PaddingBox>
          <UniversityFlexBox>
            <UniverSityImg src={data.logo} />
            <UniversityDetailBox>
              <UniversityNameText>{data.kor_name}</UniversityNameText>
              <UniversityEnglishNameText>{data.eng_name}</UniversityEnglishNameText>
            </UniversityDetailBox>
          </UniversityFlexBox>
        </PaddingBox>
      </UniversityBox>
    </ReviewCardContainer>
  );
};

export default ReviewCard;
