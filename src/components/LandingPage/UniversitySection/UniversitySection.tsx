/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import API from '@util/api';
import { UniversityCard } from '@components/LandingPage';
import {
  UniversitySectionContainer,
  Title,
  UniversityCardContainer,
} from './UniversitySection.style';

interface UniversitySectionProps {
  t: (s: string) => string;
}

interface UniversityInfo {
  catch_phrase: string;
  eng_name: string;
  kor_name: string;
  photo: string;
  univ_code: string;
  vn_catch_phrase: string;
}

const UniversitySection: React.FC<UniversitySectionProps> = ({ t }) => {
  const [universitys, setUniversity] = useState<Array<UniversityInfo>>([]);

  useEffect(() => {
    const getUniversityList = async () => {
      const universityList = await API.getUniversityList();
      setUniversity(universityList);
    };
    getUniversityList();
  }, []);

  const drawUniversity = universitys.map((university: UniversityInfo) => <UniversityCard data={university} />);

  return (
    <UniversitySectionContainer>
      <Title> 한국의 대학교에서 새로운 도전을 시작하세요. </Title>
      <UniversityCardContainer>
        {drawUniversity}
      </UniversityCardContainer>
    </UniversitySectionContainer>
  );
};

export default UniversitySection;
