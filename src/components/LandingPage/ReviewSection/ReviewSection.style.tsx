import { fontColor } from '@util/style/color';
import styled from 'styled-components';

interface ScrollAreaProps {
  length : number;
}

export const ReviewSectionContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 50px;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
`;

export const Title = styled.p`
  margin: 0 0 50px 0;
  font-weight: bold;
  font-size: 32px;
  line-height: 46px;
  color: ${fontColor}
`;

export const ScrollArea = styled.div<ScrollAreaProps>`
  display: grid;
  overflow-x: scroll;
  grid-template-columns: repeat(${(props) => props.length}, 280px);
  grid-column-gap: 20px;
  cursor: pointer;
  -ms-overflow-style: none;
  ::-webkit-scrollbar{ display:none; }
`;
