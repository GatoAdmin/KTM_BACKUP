import React from 'react';
import Button from '@components/Shared/Button/Button';
import {
  EmptyUnivItemContainer,
  LeftContainer,
  RightContainer,
  PaddingContiner,
  SubTitleContainer,
  Title,
  SubTitle,
  EmptyHeart,
  Diagonal1,
  Diagonal2,
} from './EmptyUnivItem.style';

interface EmptyUnivItemProps {
  t: (s:string) => string;
}

const EmptyUnivItem: React.FC<EmptyUnivItemProps> = ({ t }) => (
  <EmptyUnivItemContainer>
    <LeftContainer>
      <Diagonal1 />
      <Diagonal2 />
    </LeftContainer>
    <RightContainer>
      <PaddingContiner>
        <Title>{t('add_university_error_message')}</Title>
        <SubTitleContainer>
          <SubTitle>
            <EmptyHeart />
            {t('add_university_text')}
          </SubTitle>
        </SubTitleContainer>
        <Button onClick={() => { window.location.replace('/recommend'); }}>
          {t('redirect_search_button')}
          →
        </Button>
      </PaddingContiner>
    </RightContainer>
  </EmptyUnivItemContainer>
);

export default EmptyUnivItem;
