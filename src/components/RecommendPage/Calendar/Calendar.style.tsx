import styled, { css } from 'styled-components';
import { fontColor, greyColor, mainColor, whiteColor } from '@util/style/color';
import { defaultFont } from '@util/style/font';
import LeftArrowSVG from '@assets/svg/arrow_left_icon.svg';
import RightArrowSVG from '@assets/svg/arrow_right_icon.svg';

export const CalendarContainer = styled.div`
  display: inline-block;
  width: 483px;
`;

export const CalendarController = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 250px;
  margin: 50px auto 0;
  font: normal bold 22px/30px ${defaultFont};
  color: ${mainColor};
`;

export const CalendarControlButton = styled.button`
  display: flex;
  width: 12px;
  height: 12px;
  padding: 0;
  border: 0;
  background: transparent;

  :first-child {
    margin-right: 5px;
  }

  :last-child {
    margin-left: 5px;
  }
`;

export const LeftArrow = styled(LeftArrowSVG)`
  width: auto;
  height: 12px;
  margin: auto;
  path {
    stroke: ${mainColor};
    stroke-width: 5px;
  }
`;

export const RightArrow = styled(RightArrowSVG)`
  height: 12px;
  margin: auto;
  path {
    stroke: ${mainColor};
    stroke-width: 5px;
  }
`;

export const CalendarHeadRow = styled.div`
  display: flex;
  justify-content: space-around;
  height: 50px;
  margin-top: 50px;
  border-bottom: 1px solid ${greyColor};
`;

export const CalendarWeekName = styled.div`
  width: 69px;
  font: normal bold 18px/28px ${defaultFont};
  color: ${greyColor};
  text-align: center;
`;

export const CalendarDateTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const CalendarDateContainer = styled.tbody`
  display: table;
  width: 100%;
`;

export const CalendarDateRow = styled.tr``;

interface CalendarDateProps {
  disabled: boolean;
  isStartDate: boolean;
  isEndDate: boolean;
  isInRange: number;
}

const getCalendarColor = [
  (opacity: number) => `rgba(255, 114, 99, ${opacity})`, // #FF7263
  (opacity: number) => `rgba(119, 255, 132, ${opacity})`, // #77FF84
  (opacity: number) => `rgba(99, 208, 255, ${opacity})`, // #63D0FF
  (opacity: number) => `rgba(255, 239, 99, ${opacity})`, // #FFEF63
  (opacity: number) => `rgba(233, 99, 255, ${opacity})`, // #E963FF
  (opacity: number) => `rgba(255, 99, 183, ${opacity})`, // #FF63B7
] as const;

export const CalendarCol = styled.td<CalendarDateProps>`
  position: relative;
  width: 69px;
  height: 70px;
  padding: 0;
  color: ${greyColor};

  ${(props) =>
    (props.isStartDate || props.isEndDate) &&
    !props.disabled &&
    css`
      color: ${whiteColor};
      ::before {
        position: absolute;
        top: calc(50% - 24px);
        left: calc(50% - 24px);
        width: 48px;
        height: 48px;
        border-radius: 23px;
        background-color: ${getCalendarColor[props.isInRange](1)};
        z-index: 3;
        content: '';
      }
    `};

  ${(props) =>
    props.isInRange !== -1 &&
    !(props.isStartDate && props.isEndDate) &&
    !props.disabled &&
    css`
      color: ${whiteColor};

      ::after {
        position: absolute;
        top: calc(50% - 24px);
        left: ${props.isStartDate ? 'unset' : 0};
        right: ${props.isStartDate ? 0 : 'unset'};
        width: ${props.isStartDate || props.isEndDate ? '50%' : '100%'};
        height: 48px;
        background-color: ${getCalendarColor[props.isInRange](0.5)};
        z-index: 2;
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

export const CalendarDate = styled.div`
  position: relative;
  font: 18px/70px ${defaultFont};
  color: inherit;
  text-align: center;
  z-index: 4;
`;

export const CalendarDescriptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 50px;
  margin-left: 15px;
`;

interface ICalendarDescriptionProps {
  index: number;
}

export const CalendarDescription = styled.div<ICalendarDescriptionProps>`
  display: flex;
  align-items: center;
  width: fit-content;
  margin-right: 20px;
  font: normal 500 18px/27px ${defaultFont};

  ::before {
    display: block;
    width: 14px;
    height: 14px;
    margin-right: 7px;
    border-radius: 7px;
    background: ${(props) => getCalendarColor[props.index](1)};
    content: '';
  }
`;
