/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
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
  CalendarSection,
  SideNavImage,
  NotifyDescription,
  DocumentGrid,
  Icon,
  Item,
  Content,
  ExclamationIcon,
  Info,
} from '@views/RecommendPage/RecommendDetailPage/RecommendDetailPage.style';

import i18nResource from '@assets/i18n/consultPage.json';
import UnivScholarshipTable, { ScholarshipType } from '@components/RecommendPage/UnivScholarshipTable/UnivTuitionTable';
import FamilyIcon from '@assets/svg/family_icon.svg';
import EducationIcon from '@assets/svg/language_education_icon.svg';
import CertificateIcon from '@assets/svg/education_qualification_icon.svg';
import WritePictogram from '@assets/svg/write_pictogram.svg';
import SearchPictogram from '@assets/svg/search_pictogram.svg';
import StudyPictogram from '@assets/svg/study_pictogram.svg';
import FamilyPictogram from '@assets/svg/family_pictogram.svg';
import MoneyPictogram from '@assets/svg/money_pictogram.svg';
import UnFilledHeart from '@assets/svg/unfilled_heart.svg';
import FilledHeart from '@assets/svg/filled_heart.svg';
import Exclamation from '@assets/svg/exclamation.svg';
import useTranslate from '@util/hooks/useTranslate';

import API from '@util/api';

const qualificationIcons = [
  { type: '국적요건', icon: FamilyIcon },
  { type: '어학요건', icon: CertificateIcon },
  { type: '학력요건', icon: EducationIcon },
] as const;

const documentPictogram = {
  write: WritePictogram,
  check: SearchPictogram,
  study: StudyPictogram,
  family: FamilyPictogram,
  money: MoneyPictogram,
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

const fetchUnivDetailInfo = (univCode: string, lang?: string) =>
  axios
    .get(`${process.env.API_PATH}api/?action=detail_univ&params=${JSON.stringify({ univ_code: univCode, lang })}`)
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
          vnName: string;
        }>;
        university: Array<{
          kor_name: string;
          eng_name: string;
          category: string;
          kor_full_address: string;
          homepage_link: string;
        }>;
        tuition: Array<{
          SubjectName: string;
          VnSubjectName: string;
          SubjectTitle: SubjectType;
          Tuition: number;
        }>;
        scholarship: Array<{
          scholarshiptype: ScholarshipType;
          Target: string;
          Statement: string;
          VnTarget: string;
          VnStatement: string;
        }>;
        supportcondition: Array<{
          Qualification: ConditionType;
          QualificationName: string;
          VnQualification: string;
          VnQualificationName: string;
        }>;
        supportdocument: Array<{
          DocumentType: string;
          Pictogram: Pictogram;
          Document: string;
          VnDocument: string;
          AdditionalInfo: string;
          VnAdditionalInfo: string;
        }>;
        calendar: Array<{
          CalendarType: string;
          CalendarName: string;
          VnCalendarName?: string;
          StartTime: string;
          EndTime?: string;
        }>;
        photo: Array<{
          photo_category: string;
          file: string;
        }>;
      } = res.data;

      const mainPhoto = photo.find((photo) => photo.photo_category === 'main_photo');
      const normalPhotos = photo.filter((photo) => photo.photo_category === 'normal_photo');
      const logoPhoto = photo.find((photo) => photo.photo_category === 'logo');

      return {
        images: [mainPhoto ? mainPhoto.file : '', ...normalPhotos.map((value) => value.file)],
        logo: logoPhoto?.file,
        university: {
          name: university[0].kor_name,
          nameEng: university[0].eng_name,
          category: university[0].category,
          address: university[0].kor_full_address,
          homepage: university[0].homepage_link,
        },
        tuition: tuition.map((tuitionInfo) => ({
          name: tuitionInfo.SubjectName,
          vnName: tuitionInfo.VnSubjectName,
          type: tuitionInfo.SubjectTitle,
          tuition: formatKRW.format(tuitionInfo.Tuition),
        })),
        condition: supportcondition,
        document: supportdocument.map((documentInfo) => ({
          type: documentInfo.DocumentType,
          pictogram: documentInfo.Pictogram,
          name: documentInfo.Document,
          vnName: documentInfo.VnDocument,
          info: documentInfo.AdditionalInfo,
          vnInfo: documentInfo.VnAdditionalInfo,
        })),
        scholarship,
        badge: univbadge,
        calendar: calendar
          .map((dateInfo) => ({
            type: dateInfo.CalendarType,
            name: dateInfo.CalendarName,
            vncalendarname: dateInfo?.VnCalendarName,
            start: dateInfo.StartTime,
            end: dateInfo?.EndTime,
          }))
          .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()),
      };
    });

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

type RecommendDetailPageProps = ThenArg<ReturnType<typeof fetchUnivDetailInfo>>;

export const getServerSideProps: GetServerSideProps<RecommendDetailPageProps, { id: string }> = async ({ params }) => {
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
}) => {
  const { t, lang, changeLang } = useTranslate(i18nResource);
  const [liked, setLiked] = useState(false);

  const onPushHeart = () => {
    const currentUniv = window.location.pathname.split('/')[2];

    API.pushLikeButton(currentUniv).then(() => setLiked((prev) => !prev));
  };

  useEffect(() => {
    const currentUniv = window.location.pathname.split('/')[2];

    API.getUserInfo().then((res) => {
      if (res.liked_univ.includes(currentUniv)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    });
  }, []);

  return (
    <DefaultLayout>
      <Header background="dark" t={t} lang={lang} changeLang={changeLang} />
      <Main>
        <SectionContainer>
          <ImageCarousel image={images} />
          <InfoSection>
            <LogoImage src={logo} />
            <InfoTextContainer>
              <TitleRow>
                <Title>{university.name}</Title>
                <UnivTypeLink active>{t('univ-type1')}</UnivTypeLink>
                {/* <UnivTypeLink active={false}>어학원</UnivTypeLink> */}
              </TitleRow>
              <UnivAddressRow>
                {university.nameEng}
                <br />
                {university.address}
              </UnivAddressRow>
              <UnivLinkRow>
                <HomePageLink href={university.homepage}>{t('homepage')}</HomePageLink>
                <LikeButton aria-pressed={false} pressed={liked} onClick={() => onPushHeart()}>
                  Like
                  {liked ? <FilledHeart /> : <UnFilledHeart />}
                </LikeButton>
              </UnivLinkRow>
            </InfoTextContainer>
            <InfoCardContainer>
              {badge.map((value) => (
                <InfoCard key={value.name}>
                  <InfoCardImageContainer>
                    <InfoCardImage src={value.pictogram} />
                  </InfoCardImageContainer>
                  {lang === 'ko' &&
                    value.name
                      .split('<br>')
                      .map((text) => <InfoCardDescription key={text}>{text}</InfoCardDescription>)}
                  {lang === 'vn' &&
                    value.vnName
                      .split('<br>')
                      .map((text) => <InfoCardDescription key={text}>{text}</InfoCardDescription>)}
                </InfoCard>
              ))}
            </InfoCardContainer>
          </InfoSection>
          {t('notify')
            .split('<br>')
            .map((text) => (
              <NotifyDescription key={text}>{text}</NotifyDescription>
            ))}
          <DetailContentContainer>
            <DetailContent>
              <UnivTuitionTable t={t} tableData={tuition} />
              <UnivScholarshipTable t={t} lang={lang} tableData={scholarship} />
              <PrepareSection>
                <ContentSectionTitle>{t('content-section-requirement')}</ContentSectionTitle>
                <PrepareStepItemContainer>
                  {condition.map((value) => {
                    const QualificationIcon = qualificationIcons[getQualificationIndex(value.Qualification)].icon;
                    return (
                      <PrepareStepItem key={value.Qualification} size="lg">
                        <QualificationTitle>
                          {lang === 'ko' ? value.Qualification : value.VnQualification}
                        </QualificationTitle>
                        <QualificationImage>
                          <QualificationIcon />
                        </QualificationImage>
                        <QualificationDescription>
                          {lang === 'ko' &&
                            value.QualificationName.split('<br>').map((text) => <span key={text}>{text}</span>)}
                          {lang === 'vn' &&
                            value.VnQualificationName.split('<br>').map((text) => <span key={text}>{text}</span>)}
                        </QualificationDescription>
                      </PrepareStepItem>
                    );
                  })}
                </PrepareStepItemContainer>
              </PrepareSection>
              <PrepareSection>
                <ContentSectionTitle>{t('content-section-document')}</ContentSectionTitle>
                <DocumentGrid>
                  {document.map((value, index) => {
                    const Pictogram = documentPictogram[value.pictogram];
                    return (
                      <Item key={index}>
                        <Icon>
                          <Pictogram />
                        </Icon>
                        <Content>{lang === 'ko' ? value.name : value.vnName}</Content>

                        <ExclamationIcon>
                          {value.info !== 'None' && (
                            <>
                              <Info>
                                <span>{lang === 'ko' ? value.info : value.vnInfo}</span>
                              </Info>
                              <Exclamation />
                            </>
                          )}
                        </ExclamationIcon>
                      </Item>
                    );
                  })}
                </DocumentGrid>
              </PrepareSection>
              <CalendarSection>
                <ContentSectionTitle style={{ width: '100%' }}>{t('content-section-calendar')}</ContentSectionTitle>
                <Calendar t={t} lang={lang} data={calendar} />
              </CalendarSection>
            </DetailContent>
          </DetailContentContainer>
          <SideNav>
            <SideNavItem background="main">
              <SideNavDescription>
                {t('side-nav-label1')
                  .split('<br/>')
                  .map((text) => (
                    <span key={text}>{text}</span>
                  ))}
              </SideNavDescription>
              <SideNavLink>
                {t('side-nav-label2')
                  .split('<br/>')
                  .map((text) => (
                    <span key={text}>{text}</span>
                  ))}
              </SideNavLink>
            </SideNavItem>
            <SideNavItem background="light">
              <SideNavDescription>
                {t('side-nav-label3')
                  .split('<br/>')
                  .map((text) => (
                    <span key={text}>{text}</span>
                  ))}
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
};

export default RecommendDetailPage;
