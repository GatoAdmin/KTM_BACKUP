import styled from 'styled-components';

export const WriteFormContainer = styled.section`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 1000px;
  padding: 20px;
`;

export const FormWrapper = styled.form`
  border-top: 2px solid #C4C4C4;
  border-bottom: 2px solid #C4C4C4;
`;

export const WriteTable = styled.div`
  display: table;
  width: 100%;
`;

export const Tr = styled.div`
  display: table-row;
`;

export const TableHeader = styled.div`
  display: table-cell;
  vertical-align: top;
  width: 170px;
  padding: 17px;
  border-bottom: 1px solid #C4C4C4;
`;

export const Td = styled.div`
  display: table-cell;
  vertical-align: middle;
  border-bottom: 1px solid #C4C4C4;
`;

export const BoldText = styled.p`
  font-weight: bold;
`;

export const StarText = styled.p`
  color: red;
  margin: 0;
`;

export const RadioWrap = styled.div`
  display: flex;
  align-items: flex-start;
  padding-left: 10px;
`;

export const RadioButton = styled.input`
  appearance: none;
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 100%;
  color: red;
  border: 1.5px solid black;
  outline:none;
  margin-right: 10px;

  &:checked {
    border: 1.5px solid #DF4D3D;
    background-color: #DF4D3D;
  }
`;

export const RadioLabel = styled.label`
  margin-right: 15px;
`;

export const Flexbox = styled.div`
  display: flex;
  align-items: center;
`;

export const TitleInputBox = styled.input`
  width: 90%;
  border: 0;
  padding: 10px;
`;

export const ContentArea = styled.textarea`
  border: none;
  border-radius: 10px;
  background-color: rgba(255, 114, 99, 0.08);
  font-size: 16px;
  line-height: 21.79px;
  min-height: 268px;
  width: -webkit-fill-available;
  margin: 13px 0px;
  padding: 10px;
  resize: vertical;
`;

export const ButtonWrap = styled.div`
  margin-top: 10px;
`;
