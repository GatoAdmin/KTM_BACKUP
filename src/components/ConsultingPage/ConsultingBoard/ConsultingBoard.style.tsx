import styled, { css } from 'styled-components';
import { fontColor, mainColor } from '@util/style/color';

interface BoardThProps {
  width: string;
}

export const ConsultingBoardContainer = styled.article`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 1000px;
  padding: 20px;
  user-select: none;
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
`;

export const BoardTr = styled.tr``;

export const BoardTh = styled.th<BoardThProps>`
  padding: 18px 10px 5px 10px;
  width: ${(props) => props.width};
  text-align: left;
  font-size: 16px;
`;

export const BoardTd = styled.td`
  text-align: center;
  color: #9E9E9E;
`;
