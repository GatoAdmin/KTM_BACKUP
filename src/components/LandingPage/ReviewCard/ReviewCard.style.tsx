import { fontColor, mainColor } from '@util/style/color';
import styled from 'styled-components';

export const ReviewCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 380px;
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
  box-sizing: border-box;
  border-radius: 24px;
  user-select: none;
`;

export const ReviewDetailBox = styled.div`
  position: relative;
  height: 230px;

  &:after {
    content: ' ';
    display: block;
    background-color: white;
    height: 20px;
    width: 100%;
    position: absolute;
    bottom: -1px;
    border-bottom: 1px solid #E5E5E5;
  }
`;

export const PaddingBox = styled.div`
  padding: 30px;
`;

export const UniversityBox = styled.div`
  height: 150px;
`;

export const NameText = styled.div`
  font-weight: bold;
  font-size: 16px;
  height: 41px;
  line-height: 22px;
  color: ${mainColor};
  margin: 0 0 10px 0;
`;

export const DetailText = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 16px;
  line-height: 26px;
  color: ${fontColor};
  word-break: break-all;
  overflow:hidden;
`;

export const UniverSityImg = styled.img`
  background: #D5CABD;
  border: 0.8px solid rgba(196, 196, 196, 0.6);
  box-sizing: border-box;
  width: 38px;
  height: 38px;
  border-radius: 36px;
`;

export const UniversityFlexBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const UniversityDetailBox = styled.div`
  width: 157px;
`;

export const UniversityNameText = styled.p`
  margin: 0 0 6px 0;
  font-weight: bold;
  font-size: 16px;
  line-height: 23px;
  color: ${fontColor};
`;

export const UniversityEnglishNameText = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.4px;
  color: #9E9E9E;
`;
