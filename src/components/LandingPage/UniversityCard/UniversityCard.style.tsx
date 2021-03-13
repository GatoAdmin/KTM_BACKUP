import { fontColor, mainColor } from '@util/style/color';
import styled from 'styled-components';
import Smile from '@assets/svg/smile_icon.svg';

export const UniversityCardContainer = styled.div`
  display: flex;
  width: 490px;
  height: 280px;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid #C4C4C4;
  box-sizing: border-box;
`;

export const Img = styled.img`
  width: 230px;
  height: 280px;
  object-fit: cover;
`;

export const CardInfo = styled.div`
  padding: 25px;
  width: 100%;
`;

export const CardInfoTitle = styled.p`
  margin: 0 0 4px 0;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  color: ${fontColor};
`;

export const CardInfoSubTitle = styled.p`
  margin: 0;
  height: 40px;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  color: #9E9E9E;
`;

export const CardInfoLine = styled.hr`
  border: 0.25px solid #C4C4C4; 
`;

export const CardInfoCommentWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 5px 0;
`;

export const CardInfoComment = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  color: ${mainColor};
`;

export const SmileIcon = styled(Smile)`
  width: 17px;
  height: 17px;
  margin-right: 5px;
`;

export const CardInfoDetail = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  color: ${fontColor};
`;

export const DetailTextWrap = styled.div`
  width: 210px;
  height: 81px;
`;
