import React from 'react';
import Button from '@components/Shared/Button/Button';
import { useRouter } from 'next/router';
import {
  ConsultBannerContainer,
  BackgroundImg,
  Box,
  ConsultBannerText,
} from './ConsultBanner.style';

interface ConsultBannerProps {
  t: (s: string) => string;
}

const ConsultBanner: React.FC<ConsultBannerProps> = ({ t }) => {
  const router = useRouter();

  return (
    <ConsultBannerContainer>
      <BackgroundImg />
      <Box>
        <ConsultBannerText>
          {t('landing-consult-banner-title-1')}
          <br />
          {t('landing-consult-banner-title-2')}
        </ConsultBannerText>
        <Button onClick={() => router.replace('/consult')}>{t('landing-consult-banner-button-text')}</Button>
      </Box>
    </ConsultBannerContainer>
  );
};

export default ConsultBanner;
