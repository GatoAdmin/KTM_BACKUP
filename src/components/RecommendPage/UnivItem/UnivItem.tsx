import * as React from 'react';
import Link from 'next/link';
import {
  UnivItemContainer,
  UnivItemDescription,
  UnivItemDescriptionContainer,
  UnivItemDescriptionIcon,
  UnivItemImage,
  UnivItemInformation,
  UnivItemLink,
  UnivItemLinkContainer,
  UnivItemNoImage,
  UnivItemSubTitle,
  UnivItemTitle,
} from '@components/RecommendPage/UnivItem/UnivItem.style';
import {UnivCategory, univCategoryInfo} from "@components/RecommendPage/CategoryFilter/CategoryFilter";

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
}) => {
  let categoryName = univCategoryInfo.find(univCategory => univCategory.value == category)?.name;

  return (
    <UnivItemContainer>
      {thumbnail ? <UnivItemImage src={thumbnail} alt={id}/> : <UnivItemNoImage/>}
      <UnivItemDescriptionContainer>
        <UnivItemTitle>{name}</UnivItemTitle>
        <UnivItemSubTitle>{nameEng}</UnivItemSubTitle>
        <UnivItemInformation>
          <UnivItemDescription>
            <UnivItemDescriptionIcon><TuitionIcon/></UnivItemDescriptionIcon>
            등록금:
            {tuition}
            만원
          </UnivItemDescription>
          <UnivItemDescription>
            <UnivItemDescriptionIcon><AbilityIcon/></UnivItemDescriptionIcon>
            TOPIK:
            {topik !== '0' ? `${topik}급` : '상관없음'}
          </UnivItemDescription>
          <UnivItemDescription>
            <UnivItemDescriptionIcon><CategoryIcon/></UnivItemDescriptionIcon>
            대학 종류:
            {categoryName}
          </UnivItemDescription>
          <UnivItemDescription disabled>
            <UnivItemDescriptionIcon><LocationIcon/></UnivItemDescriptionIcon>
            {city}
          </UnivItemDescription>
        </UnivItemInformation>
        <UnivItemLinkContainer>
          <Link href={`/recommend/${id}`} passHref><UnivItemLink>대학 상세보기</UnivItemLink></Link>
        </UnivItemLinkContainer>
      </UnivItemDescriptionContainer>
    </UnivItemContainer>
  );
};

export default UnivItem;
