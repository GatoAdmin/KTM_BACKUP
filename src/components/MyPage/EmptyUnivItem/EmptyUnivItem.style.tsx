import { fontColor } from '@util/style/color';
import { defaultFont } from '@util/style/font';
import styled from 'styled-components';
import UnFilledHeart from '@assets/svg/unfilled_heart.svg';

export const EmptyUnivItemContainer = styled.div`
  display: flex;
  position: relative;
  width: 490px;
  height: 280px;
  margin: 0 20px 20px 0px;
  border-radius: 12px;
  background: white;
  box-shadow: 1px 1px 7px #00000029;
`;

export const LeftContainer = styled.div`
  position: relative;
  width: 230px;
  background-color: #F5F5F5;
`;

export const RightContainer = styled.div`
  width: 260px;
  height: 280px;
`;

export const PaddingContiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 25px;
  width: 214px;
  height: 100%;
`;

export const Title = styled.p`
  margin: 0;
  font: normal normal bold 18px/25px ${defaultFont};
`;

export const SubTitle = styled.p`
  margin: 0;
  color: #9E9E9E;
  font-size: 14px;
`;

export const SubTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const EmptyHeart = styled(UnFilledHeart)`
  margin-right: 5px;
  > path {
    stroke: #9E9E9E;
  }
`;

export const Diagonal1 = styled.div`
  position: absolute;
  top: 140px;
  left: -67px;
  width: 364px;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.15);
  transform: rotate(51deg);
`;

export const Diagonal2 = styled.div`
  position: absolute;
  top: 140px;
  left: -67px;
  width: 364px;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.15);
  transform: rotate(129deg);
`;
