/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import API from '@util/api';
import { ReviewCard } from '@components/LandingPage';
import {
  ReviewSectionContainer,
  Title,
  Box,
  ScrollArea,
} from './ReviewSection.style';

interface ReviewSectionProps {
  t: (s: string) => string;
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

const ReviewSection: React.FC<ReviewSectionProps> = ({ t }) => {
  const [reviewList, setReviewList] = useState<Array<ReviewInfo>>([]);

  useEffect(() => {
    const getReviews = async () => {
      const reviews = await API.getReviewList();
      setReviewList(reviews);
    };
    getReviews();
  }, []);

  const drawReview = reviewList.map((review) => <ReviewCard data={review} />);

  return (
    <ReviewSectionContainer>
      <Box>
        <Title>여러분도 카툼과 함께 도전하세요.</Title>
        <ScrollArea length={reviewList.length}>
          {drawReview}
        </ScrollArea>
      </Box>
    </ReviewSectionContainer>
  );
};

export default ReviewSection;
