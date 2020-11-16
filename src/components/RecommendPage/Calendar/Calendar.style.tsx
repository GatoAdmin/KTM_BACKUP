import styled, { css } from 'styled-components';
import { fontColor, mainColor } from '@util/style/color';

export const CalendarContainer = styled.div`
  width: 100%;
`;

export const CalendarController = styled.div`
  display: flex;
  justify-content: space-around;
  width: 250px;
  margin: auto;
  font: normal bold 26px/30px NEXON Lv1 Gothic;
  color: ${fontColor};
`;

export const CalendarPrevButton = styled.button``;

export const CalendarNextButton = styled.button``;

export const CalendarHeadRow = styled.div`
  display: flex;
  justify-content: space-around;
  height: 50px;
  margin-top: 57px;
  padding: 0 30px;
  border-bottom: 1px solid #70707042;
`;

export const CalendarWeekName = styled.div`
  font: normal 24px/28px NEXON Lv1 Gothic;
  text-align: center;
`;

export const CalendarDateTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const CalendarDateContainer = styled.tbody``;

export const CalendarDateRow = styled.tr`
  border-bottom: 1px solid #70707042;

  ::before {
    display: table-cell;
    width: 30px;
    height: 100%;
    content: '';
  }

  ::after {
    display: table-cell;
    width: 30px;
    height: 100%;
    content: '';
  }
`;

interface CalendarDateProps {
  disabled: boolean;
  isStartDate: boolean;
  isEndDate: boolean;
  isInRange: boolean;
}

export const CalendarDate = styled.td<CalendarDateProps>`
  position: relative;
  height: 92px;
  font: 24px/92px NEXON Lv1 Gothic;
  text-align: center;

  ${(props) =>
    (props.isStartDate || props.isEndDate) &&
    css`
      color: white;

      ::before {
        position: absolute;
        top: calc(50% - 24px);
        left: calc(50% - 24px);
        width: 46px;
        height: 46px;
        border-radius: 23px;
        background-color: ${mainColor};
        z-index: -1;
        content: '';
      }
    `};

  ${(props) =>
    props.isInRange &&
    css`
      ::after {
        position: absolute;
        top: calc(50% - 24px);
        left: ${props.isStartDate ? 'unset' : 0};
        right: ${props.isStartDate ? 0 : 'unset'};
        width: ${props.isStartDate || props.isEndDate ? '50%' : '100%'};
        height: 46px;
        background-color: #ffebeb;
        z-index: -2;
        content: '';
      }

      &:first-child::after {
        left: unset;
        right: 0;
        width: calc(50% + 20px);
        border-radius: 20px 0 0 20px;
        content: ${props.isEndDate ? 'unset' : "''"};
      }

      &:last-child::after {
        width: calc(50% + 20px);
        border-radius: 0 20px 20px 0;
        content: ${props.isStartDate ? 'unset' : "''"};
      }
    `};
`;

export const CalendarDescription = styled.div`
  display: flex;

  margin-top: 42px;
  font: normal bold 20px/44px NEXON Lv1 Gothic;
  letter-spacing: 1px;

  ::before {
    display: block;
    width: 150px;
    height: 44px;
    margin-right: 19px;
    border-radius: 20px;
    background: #ffebeb;
    content: '';
  }
`;
