import styled from 'styled-components';
import ScholarshipSVG from '@assets/svg/scholarship_icon.svg';
import { defaultFont } from '@util/style/font';
import { fontColor } from '@util/style/color';

export const ScholarshipFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const ScholarshipIcon = styled(ScholarshipSVG)`
  margin: 11px auto 0;
`;

export const ScholarshipFilterTitle = styled.h2`
  margin: 12px auto 0;
  font: normal bold 14px/19px ${defaultFont};
  color: ${fontColor};
  text-align: center;
`;

export const ScholarshipCheckboxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 140px;
  margin: 34px auto 0;
`;
