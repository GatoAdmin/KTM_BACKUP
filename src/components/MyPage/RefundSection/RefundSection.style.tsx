import { fontColor, mainColor } from '@util/style/color';
import styled from 'styled-components';

interface ColumnProps {
  isKorean: boolean;
}

export const RefundSectionContainer = styled.div`
  padding: 50px;
`;

export const Table = styled.div`
  border-top: 1px solid #C4C4C4;
`;

export const Tr = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #C4C4C4;
`;

export const Column = styled.div<ColumnProps>`
  width: ${({ isKorean }) => (isKorean ? '180px' : '390px')};
  font-family: Noto Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  padding: 18px;
`;

export const ColumnInfo = styled.div`
  width: -webkit-fill-available;
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: ${fontColor};
  padding: 18px 0;
`;

export const ColumnInput = styled.input`
  width: -webkit-fill-available;
  border: 0;
  outline: none;
`;

export const ButtonArea = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

export const RefundPolicyText = styled.p`
  margin: 0;

  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 25px;

  color: #DF4D3D;
  cursor: pointer;
`;

export const ButtonWrap = styled.div`
  position: absolute;
  right: 0;
`;
