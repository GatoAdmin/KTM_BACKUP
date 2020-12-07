import * as React from 'react';
import Link from 'next/link';
import {
  UnivItemAddress,
  UnivItemContainer,
  UnivItemDescription,
  UnivItemDescriptionContainer,
  UnivItemImage,
  UnivItemLink,
  UnivItemLinkContainer,
  UnivItemLogo,
  UnivItemNoImage,
  UnivItemPreferButton,
  UnivItemTitle,
} from '@components/RecommendPage/UnivItem/UnivItem.style';
import { KoreaLocation } from '@components/RecommendPage/LocationFilter/LocationFilter';

export interface UnivInfo {
  univ_code: string;
  kor_name: string;
  category: 'UN' | 'CG' | 'IT';
  location: KoreaLocation;
  kor_address: string;
  tuition: number;
  has_scholarship: boolean;
  topik: string;
  has_own_exam: boolean;
  homepage_link: string;
  phone: string;
  thumbnail?: string;
  logo?: string;
}

interface UnivItemProps {
  to: string;
  name: string;
  address: string;
  topik: number;
  tuitionFee: number;
  grant: boolean;
  type: string;
  thumbnail?: string;
  logo?: string;
}

const UnivItem: React.VFC<UnivInfo> = ({
  univ_code,
  kor_name,
  category,
  kor_address,
  tuition,
  has_scholarship,
  topik,
  thumbnail,
  logo,
}) => (
  <UnivItemContainer>
    {thumbnail ? <UnivItemImage src={thumbnail} alt={kor_name} /> : <UnivItemNoImage />}
    {logo ? <UnivItemLogo src={logo} alt={`${name} logo`} /> : null}
    <UnivItemDescriptionContainer>
      <UnivItemTitle>{kor_name}</UnivItemTitle>
      <UnivItemAddress>
        주소 :
        {kor_address}
      </UnivItemAddress>
      <UnivItemDescription>
        TOPIK:
        {topik !== '0' ? `${topik}급` : '상관없음'}
      </UnivItemDescription>
      <UnivItemDescription>
        외국인 장학금:
        {has_scholarship ? 'O' : 'X'}
      </UnivItemDescription>
      <br />
      <UnivItemDescription>
        등록금:
        {tuition}
        만원
      </UnivItemDescription>
      <UnivItemDescription>
        대학 종류:
        {category}
      </UnivItemDescription>
    </UnivItemDescriptionContainer>
    <UnivItemLinkContainer>
      <Link href={`/recommend/${univ_code}`} passHref><UnivItemLink>대학 상세보기</UnivItemLink></Link>
      <UnivItemPreferButton>선호대학 추가</UnivItemPreferButton>
    </UnivItemLinkContainer>
  </UnivItemContainer>
);

export default UnivItem;
