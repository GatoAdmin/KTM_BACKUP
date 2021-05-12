import styled from 'styled-components';
import { borderColor } from '@util/style/color';

export const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 180px;
  background-color: ${borderColor};
`;

export const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 1018px;
  padding: 26px 0;
`;

export const MainInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 24px;

  margin-bottom: 25px;
`;

export const MainInfo = styled.span`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;

  color: #212121;

  cursor: pointer;
`;

export const MainInfoDelimiter = styled.span`
  width: 1px;
  height: 13px;
  background-color: black;
  margin: 10px;
`;

export const SubInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 24px;
`;

export const SubInfo = styled(MainInfo)`
  font-weight: normal;
  cursor: default;
`;

export const SubInfoDelimiter = styled(MainInfoDelimiter)`
  background-color: #212121;
`;

export const Copyright = styled.span`
  margin-top: 15px;
  font-family: Noto Sans;
  font-size: 12px;
  line-height: 16px;

  color: #212121;
`;
