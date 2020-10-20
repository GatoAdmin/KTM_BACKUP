import * as React from "react";
import {
  UnivItemAddress,
  UnivItemContainer, UnivItemDescription,
  UnivItemDescriptionContainer, UnivItemImage, UnivItemLink, UnivItemLinkContainer, UnivItemLogo,
  UnivItemNoImage, UnivItemPreferButton,
  UnivItemTitle
} from "@components/RecommendPage/UnivItem/UnivItem.style";

interface UnivItemProps {
  name: string;
  address: string;
  topik: number;
  tuitionFee: number;
  grant: boolean;
  type: string;
  thumbnail?: string;
  logo?: string;
}

const UnivItem: React.VFC<UnivItemProps> = ({
  name,
  address,
  topik,
  tuitionFee,
  grant,
  type,
  thumbnail,
  logo
}) => {
  return (
    <UnivItemContainer>
      {thumbnail ?
        <UnivItemImage src={thumbnail} alt={name} /> :
        <UnivItemNoImage/>
      }
      {logo ?
        <UnivItemLogo src={logo} alt={`${name} logo`} /> :
        null
      }
      <UnivItemDescriptionContainer>
        <UnivItemTitle>{ name }</UnivItemTitle>
        <UnivItemAddress>주소 : { address }</UnivItemAddress>
        <UnivItemDescription>TOPIK: { topik }급</UnivItemDescription>
        <UnivItemDescription>외국인 장학금: { grant ? "O" : "X" }</UnivItemDescription>
        <br/>
        <UnivItemDescription>등록금: { tuitionFee }만원</UnivItemDescription>
        <UnivItemDescription>대학 종류: { type }</UnivItemDescription>
      </UnivItemDescriptionContainer>
      <UnivItemLinkContainer>
        <UnivItemLink>대학 상세보기</UnivItemLink>
        <UnivItemPreferButton>대학 상세보기</UnivItemPreferButton>
      </UnivItemLinkContainer>
    </UnivItemContainer>
  )
}

export default UnivItem;
