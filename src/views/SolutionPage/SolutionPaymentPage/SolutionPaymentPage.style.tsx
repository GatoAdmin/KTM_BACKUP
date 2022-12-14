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

export const PriceInfoTableColumn = styled.div`
  width: 150px;
  margin: auto;
  text-align: center;
  padding: 20px 40px 20px 40px;
  :first-child {
    width: 270px;
    text-align: left;
    padding: 17px 0px 17px 50px;
  }
  :nth-child(2) {
    border-right: 1px solid rgba(0, 0, 0, 0.05);
  }
  :nth-child(3) {
    border-right: 1px solid rgba(0, 0, 0, 0.05);
  }
`;

export const PriceInfoHeaderRow = styled.div`
  display: flex;
  border-radius: 14px;
  width: 1010px;
  margin: 0px auto 0px auto;
  padding-top: 30px;
`;

export const PriceInfoHeaderColumn = styled.div`
  display: flex;
  justify-content: center;
  width: 230px;
  margin: auto;
  text-align: center;
  :first-child {
    justify-content: start;
    width: 320px;
    text-align: left;
  }
`;
export const PriceInfoTableHeaderRow = styled.div`
  display: flex;
  background-color: ${whiteColor};
  border-radius: 14px;
  width: 1010px;
  margin: 0 auto 12px auto;
  :first-child {
    height: 130px;
  }
`;
