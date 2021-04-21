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

const HeartSection = ({ isLiked, onPushHeart, id }) => {
  return <HeartContainer onClick={() => onPushHeart(id)}>{isLiked ? <RedHeart /> : <EmptyHeart />}</HeartContainer>;
};

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
  isLiked,
  onPushHeart,
  t,
  lang,
}) => {
  const categoryName = univCategoryInfo.find((univCategory) => univCategory.value == category)?.name;

  return (
    <UnivItemContainer>
      <HeartSection isLiked={isLiked} onPushHeart={onPushHeart} id={id} />
      {thumbnail ? <UnivItemImage src={thumbnail} alt={id} /> : <UnivItemNoImage />}
      <UnivItemDescriptionContainer>
        <UnivItemTitle>{name}</UnivItemTitle>
        <UnivItemSubTitle>{nameEng}</UnivItemSubTitle>
        <UnivItemInformation>
          <UnivItemDescription>
            <UnivItemDescriptionIcon>
              <TuitionIcon />
            </UnivItemDescriptionIcon>
            <UnivItemLabel>
              {lang === 'ko' && `평균 ${tuition} 만원`}
              {lang === 'vn' && `Khoảng ${(tuition / 100).toFixed(1)} Triệu KRW`}
            </UnivItemLabel>
          </UnivItemDescription>
          <UnivItemDescription>
            <UnivItemDescriptionIcon>
              <AbilityIcon />
            </UnivItemDescriptionIcon>
            <UnivItemLabel>
              {lang === 'ko' && topik !== '7' && topik !== '8' && `토픽 ${topik}급`}
              {lang === 'ko' && topik === '7' && '토픽 급수제한 없음'}
              {lang === 'ko' && topik === '8' && '토픽 필요 없음'}
              {lang === 'vn' && topik !== '7' && topik !== '8' && `TOPIK Cấp ${topik}`}
              {lang === 'vn' && topik === '7' && 'Không giới hạn cấp độ'}
              {lang === 'vn' && topik === '8' && 'Không yêu cầu TOPIK'}

              <br />
              {hasOwnExam === true && lang === 'ko' && '학교 자체 시험'}
              {hasOwnExam === true && lang === 'vn' && 'Bài thi của trường'}
            </UnivItemLabel>
          </UnivItemDescription>
          <UnivItemDescription>
            <UnivItemDescriptionIcon>
              <CategoryIcon />
            </UnivItemDescriptionIcon>
            <UnivItemLabel>{t(categoryName)}</UnivItemLabel>
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
            <UnivItemLink>{t('detail_button')}</UnivItemLink>
          </Link>
        </UnivItemLinkContainer>
      </UnivItemDescriptionContainer>
    </UnivItemContainer>
  );
};

export default UnivItem;
