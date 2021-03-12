/* eslint-disable camelcase */
import React from 'react';
import { useRouter } from 'next/router';
import Button from '@components/Shared/Button/Button';
import {
  SolutionSectionContainer,
  SolutionSectionInnerBox,
  Box,
  BackSolutionImg,
  FrontSolutionImg,
  Title,
  Detail,
  TextWrap,
} from './SolutionSection.style';

interface SolutionSectionProps {
  t: (s: string) => string;
}

const SolutionSection: React.FC<SolutionSectionProps> = ({ t }) => {
  const router = useRouter();

  return (
    <SolutionSectionContainer>
      <SolutionSectionInnerBox>
        <Box>
          <BackSolutionImg />
          <FrontSolutionImg />
        </Box>
        <Box>
          <TextWrap>
            <Title>빠르고 저렴한 대학교 입학 신청</Title>
            <Detail>
              온라인으로 대학교 선택, 서류 준비, 원서접수까지
              <br />
              입학에 필요한 모든 과정을 한번에 진행하세요.
            </Detail>
            <Button onClick={() => { router.replace('/'); }}>입학 솔루션 바로가기</Button>
          </TextWrap>
        </Box>
      </SolutionSectionInnerBox>
    </SolutionSectionContainer>
  );
};

export default SolutionSection;
