import styled from 'styled-components';
import { fontColor, borderColor, whiteColor, mainColor600 } from '@util/style/color';
import { defaultFont } from '@util/style/font';

export const PriceInfoContainer = styled.div`
  display: block;
  background-color: ${borderColor};
`;

export const PriceInfoTableRow = styled.div`
  display: flex;
  background-color: ${whiteColor};
  border-radius: 14px;
  width: 1010px;
  margin: 0 auto 12px auto;
  :first-child {
    height: 130px;
  }
`;

export const CauseReturnContainer = styled.div`
  width: 100%;
  background: rgba(255, 114, 99, 0.08);
  padding: 11px 12px 8px 12px;
  box-sizing: border-box;
  border-radius: 8px;
  font-size: 16px;
  line-height: 22px;
`;
