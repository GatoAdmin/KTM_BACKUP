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
  TermTitle,
  NotificationWrapper,
} from '@views/UserPage/TermPage/TermPage.style';
import useTranslate from '@util/hooks/useTranslate';

import i18nTermResource from '../../../assets/i18n/termPage.json';
import TermModal from './TermModal';

const TermPage: NextPage = () => {
  const { t, lang } = useTranslate(i18nTermResource);
  const [checkboxStatus, setCheckboxStatus] = React.useState({
    all: false,
    service: false,
    personal: false,
  });
  const [buttonStatus, setButtonStatus] = React.useState({
    cancel: 'activate',
    next: 'nonactivate',
  });
  const [termVisibleStatus, setTermVisibleStatus] = React.useState({
    service: false,
    personal: false,
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

  // React.useEffect(() => {
  //   console.log(termVisibleStatus);
  // }, [termVisibleStatus]);

  return (
    <>
      <FontProvider lang={lang}>
        <UserLayout width={704} height={742}>
          <TermContainer>
            <Title>{t('title')}</Title>
            <NotificationWrapper>
              <Notification>{t('notification-first-line')}</Notification>
              <Notification>{t('notification-second-line')}</Notification>
            </NotificationWrapper>

            <AgreeSection>
              <AgreeLine>
                <AgreeCheckBox checked={checkboxStatus.all} onChange={() => pushCheckbox('all')} />
                <Bold>{t('all-agree')}</Bold>
              </AgreeLine>
              <Delimiter />
              <AgreeLine>
                <AgreeCheckBox checked={checkboxStatus.service} onChange={() => pushCheckbox('service')} />

                {lang === 'ko' && (
                  <>
                    <Underline //
                      onClick={() => setTermVisibleStatus((prev) => ({ ...prev, service: true }))}
                    >
                      <Bold>{t('service')}</Bold>
                    </Underline>
                    {t('service-rest')}
                  </>
                )}
                {lang === 'vn' && (
                  <>
                    {t('service-rest')}
                    <Underline
                      style={{ marginLeft: '6px' }}
                      onClick={() => setTermVisibleStatus((prev) => ({ ...prev, service: true }))}
                    >
                      <Bold>{t('service')}</Bold>
                    </Underline>
                  </>
                )}
              </AgreeLine>
              <AgreeLine>
                <AgreeCheckBox checked={checkboxStatus.personal} onChange={() => pushCheckbox('personal')} />

                {lang === 'ko' && (
                  <>
                    <Underline //
                      onClick={() => setTermVisibleStatus((prev) => ({ ...prev, personal: true }))}
                    >
                      <Bold>{t('personal')}</Bold>
                    </Underline>
                    {t('personal-rest')}
                  </>
                )}
                {lang === 'vn' && (
                  <>
                    {t('personal-rest')}
                    <Underline
                      style={{ marginLeft: '6px' }}
                      onClick={() => setTermVisibleStatus((prev) => ({ ...prev, personal: true }))}
                    >
                      <Bold>{t('personal')}</Bold>
                    </Underline>
                  </>
                )}
              </AgreeLine>
              <Delimiter />
            </AgreeSection>
            <ButtonSection>
              <Button
                value={t('cancel')}
                style={{ marginRight: '17px' }}
                status={buttonStatus.cancel}
                onClick={() => pushLoginScreen()}
              />
              <Button value={t('next')} status={buttonStatus.next} onClick={() => pushSignupScreen()} />
            </ButtonSection>
          </TermContainer>
        </UserLayout>
        <TermModal
          type="personal"
          isVisible={termVisibleStatus.personal}
          setTermVisibleStatus={setTermVisibleStatus}
          lang={lang}
        />
        <TermModal
          type="service"
          isVisible={termVisibleStatus.service}
          setTermVisibleStatus={setTermVisibleStatus}
          lang={lang}
        />
      </FontProvider>
    </>
  );
};

export default TermPage;
