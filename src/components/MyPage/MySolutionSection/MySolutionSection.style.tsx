import { fontColor, mainColor } from '@util/style/color';
import styled from 'styled-components';
import ErrorIconSVG from '@assets/svg/error_message_icon.svg';

export const MySolutionSectionContainer = styled.div`
  padding: 50px;
`;

export const FormWrapper = styled.form`
  border-top: 2px solid #C4C4C4;
  border-bottom: 2px solid #C4C4C4;
`;

export const Table = styled.div`
  display: table;
  width: 100%;
`;

export const Tr = styled.div`
  display: table-row;
  height: 62px;
`;

export const TableHeader = styled.div`
  display: table-cell;
  vertical-align: middle;
  border-bottom: 2px solid #C4C4C4;
  font-weight: bold;
  padding-left: 14px;
`;

export const Td = styled.div`
  display: table-cell;
  vertical-align: middle;
  border-bottom: 1px solid #C4C4C4;
  padding: 0 14px;
`;

export const ButtonTd = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 14px;
`;

export const Title = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 30px;
  
  color: ${fontColor};
`;

export const AlertIcon = styled(ErrorIconSVG)`
  margin-right: 10px;
`;

export const EmptyMessageBox = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 0px;

  font-family: Noto Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  color: #9E9E9E;
  border-bottom: 1px solid #C4C4C4;
`;

export const EmptyMessageBoxButtonContainer = styled.div`
  position: absolute;
  right: 25px;
`;

export const EmptyArea = styled.div`
  height: 110px;
`;
