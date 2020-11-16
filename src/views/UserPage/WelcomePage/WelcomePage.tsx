import * as React from 'react';
import { NextPage } from 'next';
import {
  Logo,
  LogoSpan,
  LogoText,
  MoreInformationLink,
  WelcomePageBackground,
  WelcomePageContainer,
  WelcomeSubTitle,
  WelcomeTitle,
} from '@views/UserPage/WelcomePage/WelcomePage.style';

const WelcomePage: NextPage = () => {
  return (
    <WelcomePageBackground>
      <WelcomePageContainer>
        <Logo />
        <LogoText>katumm</LogoText>
        <WelcomeTitle>한국유학의 모든 정보를 담다.</WelcomeTitle>
        <WelcomeSubTitle>
          <LogoSpan>katumm</LogoSpan>에 오신 것을 환영합니다.
        </WelcomeSubTitle>
        <MoreInformationLink>메일 인증</MoreInformationLink>
      </WelcomePageContainer>
    </WelcomePageBackground>
  );
};

export default WelcomePage;
