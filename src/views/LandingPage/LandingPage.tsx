import * as React from 'react';

import {
  Content,
  ClickImage,
  ConsultImage,
  UnivImage,
  EmphasisText
} from "./LandingPage.style";
import Header from "@components/LandingPage/Header/Header";
import IntroductionSection from "@components/LandingPage/IntroductionSection/IntroductionSection";
import NumberSection from "@components/LandingPage/NumberSection/NumberSection";


const LandingPage: React.FC = () => {
  return (
    <>
      <Header />
      <Content>
        <IntroductionSection />
        <NumberSection
          buttonName="대학 소개&추천 바로가기"
          buttonHref="/search-univ"
          number={1}
          Image={UnivImage}
          titleFirst="유학의 첫걸음,"
          titleSecond="나만의 대학을 검색하세요">
          한국 대학교에 입학하기 위한 정보,
          <br/>
          <EmphasisText>카툼</EmphasisText>이 추천하는 나를 위한 대학을 확인하세요.
        </NumberSection>
        <NumberSection
          buttonName="입학 상담 바로가기"
          buttonHref="/admission-consult"
          number={2}
          Image={ConsultImage}
          titleFirst="유학의 지름길,"
          titleSecond="유학 전문가와 상담하세요">
          <EmphasisText>카툼</EmphasisText>이 제공하는 입학 가이드라인,
          <br/>
          유학 전문가와의 상담을 통해 유학을 준비하세요.
        </NumberSection>
        <NumberSection
          buttonName="원클릭입학솔루션 바로가기"
          buttonHref="/search-univ"
          number={3}
          Image={ClickImage}
          titleFirst="빠르고 저렴한 유학 신청"
          titleSecond="원클릭입학솔루션">
          유학에 필요한 서류를 등록하고
          <br/>
          원하는 대학에 <EmphasisText>클릭 한 번</EmphasisText>으로 입학하세요.
        </NumberSection>
      </Content>
    </>
  );
};

export default LandingPage;
