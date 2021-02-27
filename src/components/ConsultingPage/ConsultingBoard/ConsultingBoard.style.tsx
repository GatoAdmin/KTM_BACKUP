import styled from 'styled-components';
import { mainColor } from '@util/style/color';
import LeftArrowSVG from '@assets/svg/arrow_left_icon.svg';
import RightArrowSVG from '@assets/svg/arrow_right_icon.svg';

interface BoardThProps {
  width: string;
}

interface ArrowProps {
  disable: boolean;
}

export const ConsultingBoardContainer = styled.section`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 1000px;
  padding: 20px;
  user-select: none;
  margin-bottom: 50px;
`;

export const SubTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const WriteButton = styled.button`
  width: 86px;
  height: 39px;
  background: ${mainColor};
  border: 1px solid ${mainColor};
  box-sizing: border-box;
  border-radius: 100px;
  color: white;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  outline: none;
  cursor: pointer;
`;

export const BoardTable = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
`;

export const BoardTr = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: ${mainColor};
    color: white;
  }
`;

export const BoardTh = styled.th<BoardThProps>`
  padding: 18px 10px;
  width: ${(props) => props.width};
  text-align: left;
  font-size: 16px;
  border-bottom: 2px solid #C4C4C4;
`;

export const BoardEmptyTr = styled.tr`
  height: 50px;
`;

export const BoardEmptyMessage = styled.td`
  text-align: center;
  color: #9E9E9E;
  border-bottom: 2px solid #C4C4C4;
  font-weight: bold;
`;

export const BoardTd = styled.td`
  padding-left: 10px;
  text-align: left;
  height: 50px;
  border-bottom: 1px solid #C4C4C4;
`;

export const TitleWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const CompleteLabel = styled.div`
  background: ${mainColor};
  border-radius: 100px;
  color: white;
  padding: 5px 10px;
  text-align: center;
  font-size: 12px;
  margin-left: 10px;
`;

export const PaginationContainer = styled.div`
  display:flex;
  justify-content: flex-end;
  align-items: center;
`;

export const PageText = styled.h5`
  margin-right: 33px;
`;

export const LeftArrow = styled(LeftArrowSVG)<ArrowProps>`
  height: 12px;
  path {
    stroke: ${(props) => (props.disable ? 'lightgrey' : 'black')};
    stroke-width: 3px;
  }
  margin-right: 30px;
  ${(props) => (props.disable ? null : 'cursor: pointer')};
`;

export const RightArrow = styled(RightArrowSVG)<ArrowProps>`
  height: 12px;
  path {
    stroke: ${(props) => (props.disable ? 'lightgrey' : 'black')};
    stroke-width: 3px;
  }
  ${(props) => (props.disable ? null : 'cursor: pointer')};
`;
