import * as React from 'react';
import { NextPage } from 'next';

import Header from '@components/Shared/Header/Header';
import Calendar from '@components/RecommendPage/Calendar/Calendar';
import {
  CertificateIcon,
  ContentSectionTitle,
  ContentTypeRadio,
  ContentTypeRadioLabel,
  DetailContent,
  DetailContentContainer, ExamIcon, FamilyIcon,
  HomePageLink,
  ImageSection,
  LargeImage,
  LogoImage,
  Main,
  PrepareSection,
  PrepareStep,
  PrepareStepContainer, PrepareStepItem, PrepareStepItemContainer, PrepareStepTitle,
  PriceSection,
  PriceTable,
  PriceTableCol,
  PriceTableHeadCol,
  PriceTableRow,
  SectionContainer,
  SideNav,
  SideNavButton,
  SideNavContainer,
  SideNavItem,
  SideNavItemContainer,
  SideNavLink,
  SideNavTitle,
  SmallImage,
  TableTitle,
  Title,
  TitleSection,
} from '@views/RecommendPage/RecommendDetailPage/RecommendDetailPage.style';
import HomePageLogo from "../../../assets/house.svg";

const TempContentType = ['4년제 대학교', '어학연수']
const TempTableContent: Array<{target: string, content: string}> = [
  {target: "단과대학별 면접 성적 최상위자", content: "첫 학기 수업료 100%"},
  {target: "서류제출 마감일까지 TOPIK6급 서류 제출자", content: "첫 학기 수업료 100%"},
  {target: "서류제출 마감일까지 TOPIK5급 서류 제출자", content: "첫 학기 수업료 50%"},
  {target: "국제교육원 또는 언어교육원 수료자 중 추천기준에 따라 원장이 추천한 자", content: "첫 학기 수업료 100%"},
]

const ConditionIconList: {[iconName: string]: typeof FamilyIcon} = {
  family: FamilyIcon,
  certificate: CertificateIcon,
  exam: ExamIcon
}

const TempCondition: Array<{icon: string, content: string}> = [
  {icon: 'family', content: "본인과 부모가 외국인"},
  {icon: 'certificate', content: "TOPIK 5급이상"},
  {icon: 'exam', content: "교내 한국어 시험 3급이상"},
]

const RecommendDetailPage: NextPage = () => {
  const [contentType, setContentType] = React.useState<string>(TempContentType[1]);

  return (
    <>
      <Header background="light" position="relative" />
      <Main>
        <SectionContainer>
          <ImageSection>
            <SmallImage src="/images/aboard.jpg" />
            <SmallImage src="/images/aboard.jpg" />
            <LargeImage src="/images/aboard.jpg" />
            <SmallImage src="/images/aboard.jpg" />
            <SmallImage src="/images/aboard.jpg" />
          </ImageSection>
          <DetailContentContainer>
            <DetailContent>
              <TitleSection>
                <LogoImage src="/images/aboard_logo.svg" />
                <Title>{"한국기술교육대학교"}</Title>
                <HomePageLink>
                  <HomePageLogo />
                </HomePageLink>
                {TempContentType.map((value, index) => (
                  <React.Fragment key={value}>
                    <ContentTypeRadio
                      id={`content-type-${index}`}
                      name="content-type"
                      checked={contentType === value}
                      onChange={() => setContentType(value)} />
                    <ContentTypeRadioLabel htmlFor={`content-type-${index}`}>
                      {value}
                    </ContentTypeRadioLabel>
                  </React.Fragment>
                ))}
              </TitleSection>
              <PriceSection>
                <ContentSectionTitle>등록금</ContentSectionTitle>
                <TableTitle>수원캠퍼스</TableTitle>
                <PriceTable>
                  <thead>
                  <tr>
                    <PriceTableHeadCol>수혜대상</PriceTableHeadCol>
                    <PriceTableHeadCol>장학내용</PriceTableHeadCol>
                  </tr>
                  </thead>
                  <tbody>
                  {TempTableContent.map(value => (
                    <PriceTableRow key={value.target}>
                      <PriceTableCol>{value.target}</PriceTableCol>
                      <PriceTableCol>{value.content}</PriceTableCol>
                    </PriceTableRow>
                  ))}
                  </tbody>
                </PriceTable>
              </PriceSection>
              <PriceSection>
                <ContentSectionTitle>외국인 장학</ContentSectionTitle>
                <TableTitle>입학 장학</TableTitle>
                <PriceTable>
                  <thead>
                  <tr>
                    <PriceTableHeadCol>수혜대상</PriceTableHeadCol>
                    <PriceTableHeadCol>장학내용</PriceTableHeadCol>
                  </tr>
                  </thead>
                  <tbody>
                  {TempTableContent.map(value => (
                    <PriceTableRow key={value.target}>
                      <PriceTableCol>{value.target}</PriceTableCol>
                      <PriceTableCol>{value.content}</PriceTableCol>
                    </PriceTableRow>
                  ))}
                  </tbody>
                </PriceTable>
               <TableTitle>재학 장학</TableTitle>
                <PriceTable>
                  <thead>
                  <tr>
                    <PriceTableHeadCol>수혜대상</PriceTableHeadCol>
                    <PriceTableHeadCol>장학내용</PriceTableHeadCol>
                  </tr>
                  </thead>
                  <tbody>
                  {TempTableContent.map(value => (
                    <PriceTableRow key={value.target}>
                      <PriceTableCol>{value.target}</PriceTableCol>
                      <PriceTableCol>{value.content}</PriceTableCol>
                    </PriceTableRow>
                  ))}
                  </tbody>
                </PriceTable>
              </PriceSection>
              <PrepareSection>
                <ContentSectionTitle>지원준비</ContentSectionTitle>
                <PrepareStepContainer>
                  <PrepareStep>
                    <PrepareStepTitle>
                      1. 자격조건
                    </PrepareStepTitle>
                    <PrepareStepItemContainer>
                      {TempCondition.map((value) => {
                        const ConditionIcon = ConditionIconList[value.icon];
                        return (
                          <PrepareStepItem key={value.content}>
                            <ConditionIcon />
                            {value.content}
                          </PrepareStepItem>
                        )
                      })}
                    </PrepareStepItemContainer>
                  </PrepareStep>
                  <PrepareStep>
                    <PrepareStepTitle>
                      2. 제출서류
                    </PrepareStepTitle>
                    <PrepareStepItemContainer>
                      {TempCondition.map((value) => {
                        const ConditionIcon = ConditionIconList[value.icon];
                        return (
                          <PrepareStepItem key={value.content}>
                            <ConditionIcon />
                            {value.content}
                          </PrepareStepItem>
                        )
                      })}
                    </PrepareStepItemContainer>
                  </PrepareStep>
                </PrepareStepContainer>
              </PrepareSection>
              <Calendar startDate="2020-10-15" endDate="2020-10-27" />
            </DetailContent>
            <SideNav>
              <SideNavTitle>입학 도우미</SideNavTitle>
              <SideNavItemContainer>
                <SideNavItem>
                  대학이 마음에 드시나요?
                  <SideNavButton>
                    선호대학 추가
                  </SideNavButton>
                </SideNavItem>
                <SideNavItem>
                  카툼에 입학신청을 준비하세요.
                  <SideNavLink>
                    원클릭 입학솔루션
                  </SideNavLink>
                </SideNavItem>
                <SideNavItem>
                  입학을 위한 상담이 필요한가요?
                  <SideNavLink>
                    입학상담 신청하기
                  </SideNavLink>
                </SideNavItem>
              </SideNavItemContainer>
            </SideNav>
          </DetailContentContainer>
        </SectionContainer>
      </Main>
    </>
  );
};

export default RecommendDetailPage;
