import React from 'react';
import Link from 'next/link';
import {
  EmptyHeart,
  HeartContainer,
  RedHeart,
  UnivItemContainer,
  UnivItemDescription,
  UnivItemDescriptionContainer,
  UnivItemDescriptionIcon,
  UnivItemImage,
  UnivItemInformation,
  UnivItemLabel,
  UnivItemLink,
  UnivItemLinkContainer,
  UnivItemNoImage,
  UnivItemSubTitle,
  UnivItemTitle,
} from '@components/RecommendPage/UnivItem/UnivItem.style';
import { UnivCategory, univCategoryInfo } from '@components/RecommendPage/CategoryFilter/CategoryFilter';

import TuitionIcon from '@assets/svg/item_tuition_icon.svg';
import AbilityIcon from '@assets/svg/item_abilty_icon.svg';

import CategoryIcon from '@assets/svg/item_category_icon.svg';
import LocationIcon from '@assets/svg/item_location_icon.svg';

export interface UnivInfo {
  id: string;
  name: string;
  nameEng: string;
  category: UnivCategory;
  city: string;
  tuition: number;
  topik: string;
  thumbnail?: string;
  hasOwnExam: boolean;
}

const UnivItem: React.VFC<UnivInfo> = ({
  id,
  name,
  nameEng,
  category,
  city,
  tuition,
  topik,
  thumbnail,
  hasOwnExam,
}) => {
  const categoryName = univCategoryInfo.find((univCategory) => univCategory.value == category)?.name;

  return (
    <UnivItemContainer>
      <HeartContainer>
        <EmptyHeart />
        {/* <RedHeart /> */}
      </HeartContainer>
      {thumbnail ? <UnivItemImage src={thumbnail} alt={id} /> : <UnivItemNoImage />}
      <UnivItemDescriptionContainer>
        <UnivItemTitle>{name}</UnivItemTitle>
        <UnivItemSubTitle>{nameEng}</UnivItemSubTitle>
        <UnivItemInformation>
          <UnivItemDescription>
            <UnivItemDescriptionIcon>
              <TuitionIcon />
            </UnivItemDescriptionIcon>
            <UnivItemLabel>{`평균 ${tuition} 만원`}</UnivItemLabel>
          </UnivItemDescription>
          <UnivItemDescription>
            <UnivItemDescriptionIcon>
              <AbilityIcon />
            </UnivItemDescriptionIcon>
            <UnivItemLabel>
              토픽
              {topik !== '0' ? ` ${topik}급` : ' 상관없음'}
              <br />
              {hasOwnExam === true && '학교 자체 시험'}
            </UnivItemLabel>
          </UnivItemDescription>
          <UnivItemDescription>
            <UnivItemDescriptionIcon>
              <CategoryIcon />
            </UnivItemDescriptionIcon>
            <UnivItemLabel>{categoryName}</UnivItemLabel>
          </UnivItemDescription>
          <UnivItemDescription disabled>
            <UnivItemDescriptionIcon>
              <LocationIcon />
            </UnivItemDescriptionIcon>
            <UnivItemLabel>{city}</UnivItemLabel>
          </UnivItemDescription>
        </UnivItemInformation>
        <UnivItemLinkContainer>
          <Link href={`/recommend/${id}`} passHref>
            <UnivItemLink>상세보기</UnivItemLink>
          </Link>
        </UnivItemLinkContainer>
      </UnivItemDescriptionContainer>
    </UnivItemContainer>
  );
};

export default UnivItem;
