import styled, { css } from 'styled-components';
import { fontColor } from '@util/style/color';
import { defaultFont } from '@util/style/font';
import CertificationIcon from '@assets/svg/certification_icon.svg';

export const ExamFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const ExamFilterIcon = styled(CertificationIcon)`
  margin: 11px auto 0;
`;

export const ExamFilterTitle = styled.h2`
  margin: 12px auto 0;
  font: normal bold 14px/19px ${defaultFont};
  color: ${fontColor};
  text-align: center;
`;

export const ExamFilterShortContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 22px;
  padding: 0 20px;
`;

const ExamFilterStyle = css`
  margin: 0 0 11px;
  cursor: pointer;
`;

export const ExamFilterCheckboxShort = styled.div`
  width: 50%;
  ${ExamFilterStyle};
`;

export const ExamFilterCheckbox = styled.div`
  ${ExamFilterStyle};
`;
