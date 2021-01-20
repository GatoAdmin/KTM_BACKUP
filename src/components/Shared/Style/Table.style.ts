import styled from "styled-components";
import {fontColor, lightGreyColor, mainBackgroundColor} from "@util/style/color";
import {defaultFont} from "@util/style/font";

export const TableTitle = styled.h3`
  margin: 0 0 40px;
  font: normal bold 22px/30px ${defaultFont};
  color: ${fontColor};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

interface IHeadCol {
  width?: string;
}

export const TableHeadCol = styled.th<IHeadCol>`
  width: ${props => props.width ?? 'auto'};
  padding: 20px 17px;
  font: normal bold 16px/22px ${defaultFont};
  color: ${fontColor};
  text-align: left;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${lightGreyColor};
`;

export const TableCol = styled.td`
  padding: 20px 17px;
  font: normal normal 16px/22px ${defaultFont};
  color: ${fontColor};
  text-align: left;
  overflow-wrap: break-word;
`;