import { fontColor, mainColor } from '@util/style/color';
import styled from 'styled-components';
import Button from '@components/Shared/Button/Button';

export const MyInfomationContainer = styled.div`
  padding: 50px;
`;

export const ChangeInfomationArea = styled.form`
  width: 1000px;
  border-top: 2px solid #C4C4C4;
  margin-bottom: 22px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  height: 58px;
  border-bottom: 2px solid #C4C4C4;
`;

export const Col = styled.div`
  width: 20%;
`;

export const EmailColumn = styled(Col)`
  color: #9E9E9E;
  padding: 5px;
`;

export const ColHeader = styled(Col)`
  font-weight: bold;
  padding-left: 14px;
`;

export const InputColumn = styled.input`
  width: 100%;
  padding: 5px;
  border: 0;
`;

export const ComboColumn = styled.select`
  width: 430px;
  outline: none;
  border: 0;
  padding: 1px;
`;

export const Option = styled.option`
`;

export const EmptyArea = styled.div`
  height: 60px;
`;

export const PasswordColumn = styled(InputColumn)`
  width: 550px;
`;

export const ButtonWrap = styled.div`
  margin-top: 19px;
`;
