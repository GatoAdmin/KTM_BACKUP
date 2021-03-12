/* eslint-disable camelcase */
import React, { useEffect, useRef, useState } from 'react';
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
  const [bMouseDown, setMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollAreaEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getReviews = async () => {
      const reviews = await API.getReviewList();
      setReviewList(reviews);
    };
    getReviews();
  }, []);

  const handlingMouseDown = (e: React.MouseEvent) => {
    setMouseDown(true);
    setStartX(e.pageX - scrollAreaEl.current.offsetLeft);
    setScrollLeft(scrollAreaEl.current.scrollLeft);
  };

  const handlingMouseLeave = () => {
    setMouseDown(false);
  };

  const handlingMouseUp = () => {
    setMouseDown(false);
  };

  const handlingMove = (e: React.MouseEvent) => {
    if (!bMouseDown) return;
    e.preventDefault();
    const x = e.pageX - scrollAreaEl.current.offsetLeft;
    const walk = (x - startX) * 1;
    scrollAreaEl.current.scrollLeft = scrollLeft - walk;
  };

  const drawReview = reviewList.map((review) => <ReviewCard data={review} />);

  return (
    <ReviewSectionContainer>
      <Box>
        <Title>여러분도 카툼과 함께 도전하세요.</Title>
        <ScrollArea
          length={reviewList.length}
          onMouseDown={handlingMouseDown}
          onMouseLeave={handlingMouseLeave}
          onMouseUp={handlingMouseUp}
          onMouseMove={handlingMove}
          ref={scrollAreaEl}
        >
          {drawReview}
        </ScrollArea>
      </Box>
    </ReviewSectionContainer>
  );
};

export default ReviewSection;
