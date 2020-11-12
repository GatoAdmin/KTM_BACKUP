import * as React from 'react';
import { NextPage } from 'next';

import Header from '@components/Shared/Header/Header';
import Calendar from '@components/RecommendPage/Calendar/Calendar';
import {
  DetailContent,
  DetailContentContainer,
  ImageSection,
  Main,
  SectionContainer,
  SideNav,
} from '@views/RecommendPage/RecommendDetailPage/RecommendDetailPage.style';

const RecommendDetailPage: NextPage = () => {
  return (
    <>
      <Header background="light" position="relative" />
      <Main>
        <SectionContainer>
          <ImageSection>

          </ImageSection>
          <DetailContentContainer>
            <DetailContent>
              <Calendar startDate="2020-10-15" endDate="2020-10-27" />
            </DetailContent>
            <SideNav></SideNav>
          </DetailContentContainer>
        </SectionContainer>
      </Main>
    </>
  );
};

export default RecommendDetailPage;
