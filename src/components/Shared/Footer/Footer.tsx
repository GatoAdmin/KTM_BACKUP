import React from 'react';
import { LogoContainer } from '@components/LandingPage/Header/Header.style';
import useTranslate from '@util/hooks/useTranslate';
import i18nResource from '../../../assets/i18n/landingPage.json';
import {
  Copyright,
  FooterContainer,
  FooterContent,
  MainInfo,
  MainInfoDelimiter,
  MainInfoWrapper, //
  SponsorContainer,
  SponsorImage,
  SubInfo,
  SubInfoDelimiter,
  SubInfoWrapper,
} from './Footer.style';

const COPYRIGHT_LABEL = 'COPYRIGHT(C)  KSTUMM.  ALL RIGHTS RESERVED';

const Footer: React.FC = ({ t, lang }) => {
  const MainInfoArr = [
    { label: t('footer-main-label-1'), path: '/' },
    { label: t('footer-main-label-2'), path: '/' },
    { label: t('footer-main-label-3'), path: '/' },
    { label: t('footer-main-label-4'), path: '/' },
  ];

  const SubInfoArr = [
    { pre: t('footer-company-name'), val: t('footer-company-name-val') },
    { pre: t('footer-ceo'), val: t('footer-ceo-val') },
    { pre: t('footer-phone-no'), val: t('footer-phone-no-val') },
    { pre: t('footer-fax'), val: t('footer-fax-val') },
    { pre: t('footer-address'), val: t('footer-address-val') },
    { pre: t('footer-company-no'), val: t('footer-company-no-val') },
    { pre: t('footer-selling-no'), val: t('footer-selling-no-val') },
  ];

  return (
    <FooterContainer>
      <FooterContent>
        <MainInfoWrapper>
          {MainInfoArr.map(({ label, path }, idx) => (
            <>
              <MainInfo key={label}>{`${label}`}</MainInfo>
              {idx !== 3 && <MainInfoDelimiter />}
            </>
          ))}
        </MainInfoWrapper>
        <SubInfoWrapper>
          {SubInfoArr.slice(0, 4).map(({ pre, val }) => (
            <>
              <SubInfo key={val}>{pre === '' ? `${val}` : `${pre} : ${val}`}</SubInfo>
              <SubInfoDelimiter />
            </>
          ))}
        </SubInfoWrapper>
        <SubInfoWrapper>
          {SubInfoArr.slice(4).map(({ pre, val }) => (
            <>
              <SubInfo key={val}>{pre === '' ? `${val}` : `${pre} : ${val}`}</SubInfo>
              <SubInfoDelimiter />
            </>
          ))}
        </SubInfoWrapper>
        <Copyright>{COPYRIGHT_LABEL}</Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
