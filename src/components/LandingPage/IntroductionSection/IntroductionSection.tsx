import * as React from 'react';
import {
  CompanyName,
  EmphasisTitle,
  Introduction,
  IntroductionContent,
  IntroductionSectionContainer,
  SubTitle,
  Title,
  RouteIntroductionButton
} from "./IntroductionSection.style";
import Link from "next/link";

interface IntroductionSectionProps { }

const IntroductionSection : React.FC<IntroductionSectionProps> = () => {
  return (
    <IntroductionSectionContainer backgroundImage="/images/main_image.jpg">
      <Introduction>
        <IntroductionContent>
          <CompanyName>
            katumm
          </CompanyName>
          <Title>
            한국 유학의 모든 정보를 담다
          </Title>
          <SubTitle>
            유학 준비부터 입학신청까지,
            <br/>
            <EmphasisTitle>카툼</EmphasisTitle>과 성공적인 유학을 함께하세요
          </SubTitle>
          <Link
            href="/introduction"
            passHref>
            <RouteIntroductionButton>
              회사 소개 바로가기
            </RouteIntroductionButton>
          </Link>
        </IntroductionContent>
      </Introduction>
    </IntroductionSectionContainer>
  )
}

export default IntroductionSection;
