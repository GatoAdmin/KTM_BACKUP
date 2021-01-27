import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import axios from 'axios';
import { useRouter } from 'next/router';

import UnivTuitionTable, { SubjectType } from '@components/RecommendPage/UnivTutionTable/UnivScholarshipTable';
import Header from '@components/Shared/Header/Header';
import Calendar from '@components/RecommendPage/Calendar/Calendar';
import DefaultLayout from '@components/Shared/DefaultLayout/DefaultLayout';
import ImageCarousel from '@components/RecommendPage/ImageCarousel/ImageCarousel';
import {
  ContentSectionTitle,
  DetailContent,
  DetailContentContainer,
  HomePageLink,
  LogoImage,
  Main,
  PrepareSection,
  PrepareStepItem,
  PrepareStepItemContainer,
  SectionContainer,
  SideNav,
  SideNavDescription,
  SideNavImageLink,
  SideNavItem,
  SideNavLink,
  Title,
  InfoSection,
  InfoTextContainer,
  TitleRow,
  UnivTypeLink,
  InfoCardContainer,
  UnivAddressRow,
  UnivLinkRow,
  LikeButton,
  InfoCard,
  InfoCardDescription,
  InfoCardImageContainer,
  InfoCardImage,
  QualificationTitle,
  QualificationImage,
  QualificationDescription,
  DocumentIconContainer,
  DocumentIcon,
  DocumentTypeIconContainer,
  DocumentDescription,
  DocumentEssentialDesc,
  DocumentEssential,
  CalendarSection, SideNavImage,
} from '@views/RecommendPage/RecommendDetailPage/RecommendDetailPage.style';
import UnivScholarshipTable, { ScholarshipType } from '@components/RecommendPage/UnivScholarshipTable/UnivTuitionTable';
import FamilyIcon from '@assets/svg/family_icon.svg';
import EducationIcon from '@assets/svg/language_education_icon.svg';
import CertificateIcon from '@assets/svg/education_qualification_icon.svg';
import WritePictogram from '@assets/svg/write_pictogram.svg';
import SearchPictogram from '@assets/svg/search_pictogram.svg';
import StudyPictogram from '@assets/svg/study_pictogram.svg';
import FamilyPictogram from '@assets/svg/family_pictogram.svg';
import BalancePictogram from '@assets/svg/balance_pictogram.svg';

const qualificationIcons = [
  { type: '국적요건', icon: FamilyIcon },
  { type: '어학요건', icon: EducationIcon },
  { type: '학력요건', icon: CertificateIcon },
] as const;

const documentPictogram = {
  write: WritePictogram,
  check: SearchPictogram,
  study: StudyPictogram,
  family: FamilyPictogram,
  balance: BalancePictogram,
} as const;

type ConditionType = typeof qualificationIcons[number]['type'];
type Pictogram = keyof typeof documentPictogram;

const getQualificationIndex = (type: ConditionType): number => {
  if (type === '국적요건') return 0;
  if (type === '어학요건') return 1;
  if (type === '학력요건') return 2;
  return 0;
};

const formatKRW = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' });

const fetchUnivDetailInfo = (univCode: string, lang ?: string) => axios.get(`${process.env.API_PATH}api/?action=detail_univ&params=${JSON.stringify({ univ_code: univCode, lang })}`)
  .then((res) => {
    const {
      univbadge,
      university,
      tuition,
      scholarship,
      supportcondition,
      supportdocument,
      additionalinfo,
      calendar,
      photo,
    }: {
        univbadge: Array<{
          pictogram: string;
          name: string;
        }>,
        university: Array<{
          kor_name: string;
          eng_name: string;
          category: string;
          kor_full_address: string;
          homepage_link: string;
        }>,
        tuition: Array<{
          subjecttitle: SubjectType;
          subjectname: string;
          tuition: number;
        }>,
        scholarship: Array<{
          scholarshiptype: ScholarshipType;
          target: string;
          statement: string;
        }>,
        supportcondition: Array<{
          qualification: ConditionType;
          qualificationname: string;
        }>,
        supportdocument: Array<{
          document: string;
          documenttype: string;
          pictogram: Pictogram;
          additionalinfo: string | null;
        }>,
        additionalinfo: Array<{

        }>,
        calendar: Array<{
          calendartype: string;
          calendarname: string;
          starttime: string;
          endtime?: string;
        }>,
        photo: Array<{
          photo_category: string;
          file: string;
        }>
      } = res.data;

    const mainPhoto = photo.find((photo) => photo.photo_category === 'main_photo');
    const normalPhotos = photo.filter((photo) => photo.photo_category === 'normal_photo');
    const logoPhoto = photo.find((photo) => photo.photo_category === 'logo');

    return {
      images: [
        mainPhoto ? mainPhoto.file : '',
        ...normalPhotos.map((value) => value.file)],
      logo: logoPhoto?.file,
      university: {
        name: university[0].kor_name,
        nameEng: university[0].eng_name,
        category: university[0].category,
        address: university[0].kor_full_address,
        homepage: university[0].homepage_link,
      },
      tuition: tuition.map((tuitionInfo) => ({
        name: tuitionInfo.subjectname,
        type: tuitionInfo.subjecttitle,
        tuition: formatKRW.format(tuitionInfo.tuition),
      })),
      condition: supportcondition,
      document: supportdocument.map((documentInfo) => ({
        name: documentInfo.document,
        type: documentInfo.documenttype,
        pictogram: documentInfo.pictogram,
        info: documentInfo.additionalinfo,
      })),
      scholarship,
      badge: univbadge,
      calendar: calendar.map((dateInfo) => ({
        type: dateInfo.calendartype,
        name: dateInfo.calendarname,
        start: dateInfo.starttime,
        end: dateInfo?.endtime,
      })).sort((a, b) => ((new Date(a.start)).getTime() - (new Date(b.start)).getTime())),
    };
  });

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

type RecommendDetailPageProps = ThenArg<ReturnType<typeof fetchUnivDetailInfo>>

export const getServerSideProps: GetServerSideProps<RecommendDetailPageProps, {id: string;}> = async ({ params }) => {
  const univInfo = await fetchUnivDetailInfo(params ? params.id : '');
  return {
    props: {
      ...univInfo,
    },
  };
};

const RecommendDetailPage: NextPage<RecommendDetailPageProps> = ({
  university,
  badge,
  images,
  tuition,
  scholarship,
  condition,
  document,
  logo,
  calendar,
}) => (
  <DefaultLayout>
    <Header background="light" position="relative" />
    <Main>
      <SectionContainer>
        <ImageCarousel image={images} />
        <InfoSection>
          <LogoImage src={logo} />
          <InfoTextContainer>
            <TitleRow>
              <Title>{university.name}</Title>
              <UnivTypeLink active>전문대학교</UnivTypeLink>
              <UnivTypeLink active={false}>어학원</UnivTypeLink>
            </TitleRow>
            <UnivAddressRow>
              {university.nameEng}
              <br />
              {university.address}
            </UnivAddressRow>
            <UnivLinkRow>
              <HomePageLink>
                홈페이지 바로가기
              </HomePageLink>
              <LikeButton aria-pressed={false} pressed={false}>
                Like
              </LikeButton>
            </UnivLinkRow>

          </InfoTextContainer>
          <InfoCardContainer>
            {badge.map((value) => (
              <InfoCard key={value.name}>
                <InfoCardImageContainer>
                  <InfoCardImage src={value.pictogram} />
                </InfoCardImageContainer>
                <InfoCardDescription>
                  {value.name}
                </InfoCardDescription>
              </InfoCard>
            ))}
          </InfoCardContainer>
        </InfoSection>
        <DetailContentContainer>
          <DetailContent>
            <UnivTuitionTable
              tableData={tuition}
              additionalInfo="."
            />
            <UnivScholarshipTable
              tableData={scholarship}
              additionalInfo="."
            />
            <PrepareSection>
              <ContentSectionTitle>입학지원 자격요건</ContentSectionTitle>
              <PrepareStepItemContainer>
                {condition.map((value) => {
                  const QualificationIcon = qualificationIcons[getQualificationIndex(value.qualification)].icon;
                  return (
                      <PrepareStepItem
                        key={value.qualification}
                        size="lg"
                      >
                        <QualificationTitle>
                          {value.qualification}
                        </QualificationTitle>
                        <QualificationImage>
                          <QualificationIcon />
                        </QualificationImage>
                        <QualificationDescription>
                          {value.qualificationname}
                        </QualificationDescription>
                      </PrepareStepItem>
                  );
                })}
              </PrepareStepItemContainer>
            </PrepareSection>
            <PrepareSection>
              <ContentSectionTitle>지원준비</ContentSectionTitle>
              <PrepareStepItemContainer>
                {document.map((value, index) => {
                  const Pictogram = documentPictogram[value.pictogram];
                  return (
                      <PrepareStepItem
                        size="sm"
                        key={value.name}
                      >
                        <DocumentIconContainer>
                          <DocumentIcon />
                          <DocumentTypeIconContainer>
                            <Pictogram />
                          </DocumentTypeIconContainer>
                        </DocumentIconContainer>
                        <DocumentDescription>
                          {value.info ? (
                            <DocumentEssential>
                              <DocumentEssentialDesc>
                                {value.info}
                              </DocumentEssentialDesc>
                            </DocumentEssential>
                          ) : null}
                          {value.name}
                        </DocumentDescription>
                      </PrepareStepItem>
                  );
                })}
              </PrepareStepItemContainer>
            </PrepareSection>
            <CalendarSection>
              <Calendar data={calendar} />
            </CalendarSection>
          </DetailContent>
        </DetailContentContainer>
        <SideNav>
          <SideNavItem background="main">
            <SideNavDescription>
              해당 대학의
              <br />
              입학을
              <br />
              준비하세요!
              <br />
            </SideNavDescription>
            <SideNavLink>
              입학솔루션
              <br />
              바로가기
            </SideNavLink>
          </SideNavItem>
          <SideNavItem background="light">
            <SideNavDescription>
              입학 상담이
              <br />
              필요하신가요?
              <br />
            </SideNavDescription>
            <SideNavImageLink>
              <SideNavImage src="/images/consult_button_icon.png" />
            </SideNavImageLink>
          </SideNavItem>
        </SideNav>
      </SectionContainer>
    </Main>
  </DefaultLayout>
);

export default RecommendDetailPage;
