import React, { useState } from 'react';
import Link from 'next/link';
import {
  EmptyHeart,
  HeartContainer,
  RedHeart,
  UnivItemContainer,
  UnivItemDescription,
  UnivItemDescriptionContainer,
  UnivItemDescriptionIcon,
  UnivItemDetailLink,
  UnivItemImage,
  UnivItemInformation,
  UnivItemLabel,
  UnivItemLink,
  UnivItemLinkContainer,
  UnivItemNoImage,
  UnivItemSubTitle,
  UnivItemTitle,
} from '@components/Mypage/UnivItem/UnivItem.style';
import { UnivCategory, univCategoryInfo } from '@components/RecommendPage/CategoryFilter/CategoryFilter';

import TuitionIcon from '@assets/svg/item_tuition_icon.svg';
import AbilityIcon from '@assets/svg/item_abilty_icon.svg';

import CategoryIcon from '@assets/svg/item_category_icon.svg';
import LocationIcon from '@assets/svg/item_location_icon.svg';

import API from '@util/api';

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
  t: (s:string) => string;
  lang: string;
}

const HeartSection = ({ isLiked, onPushHeart, id }) => (
  <HeartContainer onClick={() => onPushHeart(id)}>
    {isLiked ? <RedHeart /> : <EmptyHeart />}
  </HeartContainer>
);

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
  t,
  lang,
}) => {
  const [isLiked, setLiked] = useState(true);

  const onPushHeart = async () => {
    await API.pushLikeButton(id);
    setLiked(!isLiked);
  };

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
              {lang === 'ko' && `?????? ${tuition} ??????`}
              {lang === 'vn' && `Kho???ng ${(tuition / 100).toFixed(1)} Tri???u KRW`}
            </UnivItemLabel>
          </UnivItemDescription>
          <UnivItemDescription>
            <UnivItemDescriptionIcon>
              <AbilityIcon />
            </UnivItemDescriptionIcon>
            <UnivItemLabel>
              {lang === 'ko' && topik !== '7' && topik !== '8' && `?????? ${topik}???`}
              {lang === 'ko' && topik === '7' && '?????? ???????????? ??????'}
              {lang === 'ko' && topik === '8' && '?????? ?????? ??????'}
              {lang === 'vn' && topik !== '7' && topik !== '8' && `TOPIK C???p ${topik}`}
              {lang === 'vn' && topik === '7' && 'Kh??ng gi???i h???n c???p ?????'}
              {lang === 'vn' && topik === '8' && 'Kh??ng y??u c???u TOPIK'}

              <br />
              {hasOwnExam === true && lang === 'ko' && '?????? ?????? ??????'}
              {hasOwnExam === true && lang === 'vn' && 'B??i thi c???a tr?????ng'}
            </UnivItemLabel>
          </UnivItemDescription>
          <UnivItemDescription>
            <UnivItemDescriptionIcon>
              <CategoryIcon />
            </UnivItemDescriptionIcon>
            <UnivItemLabel>{t(category)}</UnivItemLabel>
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
            <UnivItemDetailLink>{t('detail_button_text')}</UnivItemDetailLink>
          </Link>
          <Link href={`/solution?univ=${id}`} passHref>
            <UnivItemLink>{t('solution_button_text')}</UnivItemLink>
          </Link>
        </UnivItemLinkContainer>
      </UnivItemDescriptionContainer>
    </UnivItemContainer>
  );
};

export default UnivItem;
