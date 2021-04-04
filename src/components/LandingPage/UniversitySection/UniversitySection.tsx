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
  lang: string;
}

interface UniversityInfo {
  catch_phrase: string;
  eng_name: string;
  kor_name: string;
  photo: string;
  univ_code: string;
  vn_catch_phrase: string;
}

const UniversitySection: React.FC<UniversitySectionProps> = ({ t, lang }) => {
  const [universitys, setUniversity] = useState<Array<UniversityInfo>>([]);

  useEffect(() => {
    const getUniversityList = async () => {
      const universityList = await API.getUniversityList();
      setUniversity(universityList);
    };
    getUniversityList();
  }, []);

  const cb = (university: UniversityInfo) => <UniversityCard data={university} lang={lang} />;
  const drawUniversity = universitys.map(cb);

  return (
    <UniversitySectionContainer>
      <Title>{t('landing-university-section-title')}</Title>
      <UniversityCardContainer>
        {drawUniversity}
      </UniversityCardContainer>
    </UniversitySectionContainer>
  );
};

export default UniversitySection;
