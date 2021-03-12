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
          한국 유학의 지름길,
          <br />
          전문 유학 매니저에게 무엇이든 물어보세요.
        </ConsultBannerText>
        <Button onClick={() => router.replace('/consult')}>입학 상담 바로가기 </Button>
      </Box>
    </ConsultBannerContainer>
  );
};

export default ConsultBanner;
