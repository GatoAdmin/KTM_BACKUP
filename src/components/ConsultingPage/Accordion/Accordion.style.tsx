import styled from 'styled-components';
import { mainColor } from '@util/style/color';
import DownArrowSVG from '@assets/svg/arrow_down_icon.svg';

interface AccordionProps {
  bopen: number;
}

export const AccordionContainer = styled.div<AccordionProps>`
  display: flex;
  flex-direction: column;
  background: ${(props) => (props.bopen ? '#FF7263' : '#FFFFFF')};
  border: 0.8px solid #C4C4C4;
  box-sizing: border-box;
  border-radius: 12px;
  padding: 10px 40px 10px 40px;
  transition: background ease 0.3s, height ease 2s;
  user-select: none;
  margin-bottom: 10px;
`;

export const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DownArrow = styled(DownArrowSVG)<AccordionProps>`
  height: 12px;
  path {
    stroke: ${(props) => (props.bopen ? 'white' : '#232323')};
    stroke-width: 3px;
  }
  transition: transform ease 0.3s;
  transform: ${(props) => (props.bopen ? 'rotate(-180deg)' : null)};
`;

export const Question = styled.p<AccordionProps>`
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  color: ${(props) => (props.bopen ? 'white' : 'black')};
`;

export const AnswerWrap = styled.div`
  margin: 10px 0px;
`;

export const Answer = styled.p`
  color: white;
  font-weight: 100;
  font-size: 14px;
  margin-bottom: 5px;
`;
