/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import { NextPage } from 'next';
import Router from 'next/router';

import UserLayout from '@components/UserPage/UserPageLayout/UserLayout';
import { FontProvider } from '@views/LandingPage/LandingPage.style';
import {
  TermContainer,
  Title,
  Notification,
  AgreeSection,
  AgreeCheckBox,
  AgreeLine,
  Button,
  Delimiter,
  ButtonSection,
  Bold,
  Underline,
} from '@views/UserPage/TermPage/TermPage.style';
import useTranslate from '@util/hooks/useTranslate';

import i18nLoginResource from '../../../assets/i18n/loginPage.json';

const TermPage: NextPage = () => {
  const { t, lang } = useTranslate(i18nLoginResource);
  const [checkboxStatus, setCheckboxStatus] = React.useState({
    all: false,
    service: false,
    personal: false,
  });
  const [buttonStatus, setButtonStatus] = React.useState({
    cancel: 'activate',
    next: 'nonactivate',
  });

  const pushCheckbox = (type: string) => {
    if (type === 'all') {
      if (!checkboxStatus.all) {
        setCheckboxStatus({
          all: true,
          service: true,
          personal: true,
        });
      } else {
        setCheckboxStatus({
          all: false,
          service: false,
          personal: false,
        });
      }
    } else setCheckboxStatus((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const pushLoginScreen = () => {
    Router.push('/login');
  };

  const pushSignupScreen = () => {
    if (checkboxStatus.all) Router.push('/signup/infos');
  };

  React.useEffect(() => {
    if (checkboxStatus.all) setButtonStatus((prev) => ({ ...prev, next: 'activate' }));
    else setButtonStatus((prev) => ({ ...prev, next: 'nonactivate' }));
  }, [checkboxStatus.all]);

  React.useEffect(() => {
    if (checkboxStatus.service && checkboxStatus.personal && !checkboxStatus.all) {
      setCheckboxStatus((prev) => ({ ...prev, all: true }));
    }

    if ((checkboxStatus.all && !checkboxStatus.service) || (checkboxStatus.all && !checkboxStatus.personal)) {
      setCheckboxStatus((prev) => ({ ...prev, all: false }));
    }
  }, [checkboxStatus]);

  return (
    <FontProvider lang={lang}>
      <UserLayout width={704} height={742}>
        <TermContainer>
          <Title>약관 동의</Title>
          <Notification>
            하단의 서비스 이용약관 및 개인정보 수집 및 이용약관에 대한 안내를 읽고 동의에 체크해 주세요.
          </Notification>

          <AgreeSection>
            <AgreeLine>
              <AgreeCheckBox checked={checkboxStatus.all} onClick={() => pushCheckbox('all')} />
              <Bold>전체 동의</Bold>
            </AgreeLine>
            <Delimiter />
            <AgreeLine>
              <AgreeCheckBox checked={checkboxStatus.service} onClick={() => pushCheckbox('service')} />
              <Underline>
                <Bold>서비스 이용약관</Bold>
              </Underline>
              에 동의합니다.
            </AgreeLine>
            <AgreeLine>
              <AgreeCheckBox checked={checkboxStatus.personal} onClick={() => pushCheckbox('personal')} />
              <Underline>
                <Bold>개인정보 수집 및 이용약관</Bold>
              </Underline>
              에 동의합니다.
            </AgreeLine>
            <Delimiter />
          </AgreeSection>
          <ButtonSection>
            <Button
              value="취소"
              style={{ marginRight: '17px' }}
              status={buttonStatus.cancel}
              onClick={() => pushLoginScreen()}
            />
            <Button value="다음" status={buttonStatus.next} onClick={() => pushSignupScreen()} />
          </ButtonSection>
        </TermContainer>
      </UserLayout>
    </FontProvider>
  );
};

export default TermPage;
