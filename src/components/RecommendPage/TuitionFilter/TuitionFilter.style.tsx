import styled from 'styled-components';
import { fontColor, greyColor } from '@util/style/color';
import { defaultFont } from '@util/style/font';
import Tuition from '@assets/svg/tuition_icon.svg';

export const TuitionFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const TuitionIcon = styled(Tuition)`
  margin: 6px auto 0;
`;

export const TuitionFilterTitle = styled.h3`
  margin: 12px auto 0;
  font: normal bold 14px/19px ${defaultFont};
  color: ${fontColor};
`;

export const TuitionCheckboxList = styled.div`
  margin-top: 15px;
`;

export const TuitionDescription = styled.h4`
  margin: 0 0 8px;
  font: normal bold 12px/16px ${defaultFont};
  color: ${greyColor};
`;

export const TuitionCheckbox = styled.div`
  width: 140px;
  margin: 0 auto 11px;
`;
