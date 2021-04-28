import styled, { css } from 'styled-components';
import {
  greyColor, lightGreyColor, mainColor, whiteColor,
} from '@util/style/color';
import { defaultFont } from '@util/style/font';
import UnFilledHeart from '@assets/svg/unfilled_heart.svg';
import FilledHeart from '@assets/svg/filled_heart.svg';

export const UnivItemContainer = styled.div`
  display: inline-flex;
  position: relative;
  width: 430px;
  height: 280px;
  margin: 0 20px 20px 0px;
  border-radius: 12px;
  background: white;
  box-shadow: 1px 1px 7px #00000029;

`;

export const HeartContainer = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  cursor: pointer;

  svg {
    transform: scale(1.3);
  }
`;

export const RedHeart = styled(FilledHeart)`
  > path {
    fill: ${mainColor};
  }
`;

export const EmptyHeart = styled(UnFilledHeart)`
  > path {
    stroke: #fff;
  }
`;

export const UnivItemLinkContainer = styled.div`
  display: flex;
  width: 190px;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 12px;
`;

export const UnivItemLink = styled.a`
  display: block;
  padding: 8px 18px;
  border-radius: 16px;
  font: normal normal bold 12px/16px ${defaultFont};
  color: ${whiteColor};
  background: ${mainColor};
  text-decoration: none;
  text-align: center;
  cursor: pointer;
`;

export const UnivItemDetailLink = styled(UnivItemLink)`
  width: 48px;
`;

const ItemImageStyle = css`
  flex: 0 0 auto;
  width: 210px;
  height: 280px;
  border-radius: 12px 0 0 12px;
`;

export const UnivItemImage = styled.img`
  ${ItemImageStyle};
  object-fit: cover;
`;

export const UnivItemNoImage = styled.div`
  ${ItemImageStyle};
  background: gray;
`;

export const UnivItemLogo = styled.img`
  position: absolute;
  top: calc(50% - 80px);
  left: calc(50% - 80px);
  width: 160px;
  height: 160px;
  opacity: 0.3;
  object-fit: contain;
`;

export const UnivItemDescriptionContainer = styled.div`
  width: 100%;
  padding: 25px 20px 0;
`;

export const UnivItemTitle = styled.h2`
  margin: 0;
  font: normal normal bold 18px/25px ${defaultFont};
`;

export const UnivItemSubTitle = styled.h3`
  margin: 5px 0 30px;
  color: ${greyColor};
  font: normal normal bold 14px/19px ${defaultFont};
`;

export const UnivItemInformation = styled.div`
  padding-top: 5px;
  width: 100%;

  :before {
    display: block;
    border-top: 1px solid ${lightGreyColor};
    opacity: 0.5;
    content: '';
  }
`;

export const UnivItemDescriptionIcon = styled.div`
  position: absolute;
  top: 1px;
  width: 16px;
  height: 16px;
  margin-right: 7px;

  > svg {
    fill: none;
  }
`;

interface DescriptionProps {
  disabled?: boolean;
}

export const UnivItemDescription = styled.div<DescriptionProps>`
  position: relative;
  display: flex;
  align-items: center;
  margin: 5px 0;
  color: ${(props) => (props.disabled ? lightGreyColor : mainColor)};
  font: normal normal bold 14px/19px ${defaultFont};
`;

export const UnivItemLabel = styled.div`
  margin-left: 23px;
`;
